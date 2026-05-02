using CarRental.Application.DTOs;
using CarRental.Application.Interfaces;
using CarRental.Domain.Entities;
using CarRental.Domain.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using CarRental.Application.Exceptions;

namespace CarRental.Application.Services
{
    public class UserService : IUserService
    {
        private readonly IApplicationDbContext _context;
        private readonly IConfiguration _configuration;

        public UserService(IApplicationDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public async Task<string> RegisterAsync(RegisterRequest request)
        {
            var emailExits = await _context.Users.AnyAsync(
                u => u.Email == request.Email
                );

            if (emailExits)
            {
                throw new ConflictException("Email đã tồn tại");
            }

            string hashedPassword = BCrypt.Net.BCrypt.HashPassword(request.Password);

            var newUser = new User
            {
                Email = request.Email,
                PasswordHash = hashedPassword,
                FullName = request.FullName,
                PhoneNumber = request.PhoneNumber,
                Role = UserRole.Customer.ToString(),
                CreatedAt = DateTime.UtcNow
            };
            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            return "Đăng ký thành công";
        }

        public async Task<LoginResponse> LoginAsync(LoginRequest request)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
            if (user == null)
            {
                throw new UnauthorizedException("Email hoặc mật khẩu không đúng");
            }

            var isValidPassword = BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash);
            if (!isValidPassword)
            {
                throw new UnauthorizedException("Email hoặc mật khẩu không đúng");
            }

            var activeTokens = await _context.RefreshTokens
            .Where(t => t.UserId == user.Id && t.RevokedAt == null && t.ExpiresAt > DateTime.UtcNow)
            .ToListAsync();

            foreach (var token in activeTokens)
            {
                token.RevokedAt = DateTime.UtcNow;
                token.ReasonRevoked = "New login";
            }

            var (accessToken, accessExpiresAt) = GenerateAccessToken(user);

            var refreshDays = GetRefreshTokenExpiresDays();

            var rawRefreshToken = GenerateRefeshToken();

            var refreshToken = CreateRefreshToken(user.Id, rawRefreshToken, refreshDays);
            _context.RefreshTokens.Add(refreshToken);
            await _context.SaveChangesAsync();

            return new LoginResponse
            {
                Token = accessToken,
                ExpiresAt = accessExpiresAt,
                RefreshToken = rawRefreshToken,
                User = BuildUserInfo(user)
            };
        }

        public async Task<LoginResponse> RefreshAsync(RefreshTokenRequest request, string ipAddress)
        {
            if (_context is not DbContext dbContext)
            {
                throw new InternalServerException("DbContext không hợp lệ");
            }
            await using var tx = await dbContext.Database.BeginTransactionAsync();

            var tokenHash = ComputeSha256Hash(request.RefreshToken);

            var existingToken = await _context.RefreshTokens
                .Include(t => t.User)
                .FirstOrDefaultAsync(t => t.TokenHash == tokenHash);

            if (existingToken == null)
            {
                throw new UnauthorizedException("Refresh token khong hop le");
            }

            if (existingToken.RevokedAt != null)
            {
                throw new UnauthorizedException("Refresh token bi thu hoi");
            }

            if (existingToken.ExpiresAt <= DateTime.UtcNow)
            {
                throw new UnauthorizedException("Refresh token da het han");
            }

            var refreshDays = GetRefreshTokenExpiresDays();

            var newRawRefreshToken = GenerateRefeshToken();
            var newRefreshTokenHash = ComputeSha256Hash(newRawRefreshToken);

            existingToken.RevokedAt = DateTime.UtcNow;
            existingToken.RevokedByIp = ipAddress;
            existingToken.ReasonRevoked = "Rotated";
            existingToken.ReplacedByTokenHash = newRefreshTokenHash;

            var newRefreshToken = CreateRefreshToken(
                existingToken.UserId,
                newRawRefreshToken,
                refreshDays,
                ipAddress
            );

            _context.RefreshTokens.Add(newRefreshToken);

            var (newAccessToken, newAccessExpiresAt) = GenerateAccessToken(existingToken.User);

            try
            {
                await _context.SaveChangesAsync();
                await tx.CommitAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                await tx.RollbackAsync();
                throw new UnauthorizedException("Refresh token đã được sử dụng, vui lòng đăng nhập lại");
            }

            return new LoginResponse
            {
                Token = newAccessToken,
                ExpiresAt = newAccessExpiresAt,
                RefreshToken = newRawRefreshToken,
                User = BuildUserInfo(existingToken.User)
            };
        }

        public async Task LogoutAsync(LogoutRequest request, string ipAddress)
        {
            var tokenHash = ComputeSha256Hash(request.RefreshToken);
            var token = await _context.RefreshTokens.FirstOrDefaultAsync(t => t.TokenHash == tokenHash);

            if (token == null || token.RevokedAt != null)
                return;

            token.RevokedAt = DateTime.UtcNow;
            token.RevokedByIp = ipAddress;
            token.ReasonRevoked = "Logout";
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return;
            }
        }

        private string GenerateRefeshToken()
        {
            var bytes = RandomNumberGenerator.GetBytes(64);
            return Convert.ToBase64String(bytes);
        }

        private string ComputeSha256Hash(string raw)
        {
            var bytes = SHA256.HashData(Encoding.UTF8.GetBytes(raw));
            return Convert.ToHexString(bytes);
        }

        private (string token, DateTime expiresAt) GenerateAccessToken(User user)
        {
            var jwtKey = _configuration["Jwt:Key"] ?? throw new InternalServerException("Thiếu Jwt:Key");
            var jwtIssuer = _configuration["Jwt:Issuer"];
            var jwtAudience = _configuration["Jwt:Audience"];

            var expiresMinutesText = _configuration["Jwt:AccessTokenExpiresMinutes"];
            if (!int.TryParse(expiresMinutesText, out var expiresMinutes) || expiresMinutes <= 0)
            {
                throw new InternalServerException("jwt:AccessTokenExpiresMinutes không hợp lệ");
            }

            var expiresAt = DateTime.UtcNow.AddMinutes(expiresMinutes);
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.Role)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var jwt = new JwtSecurityToken(
                issuer: jwtIssuer,
                audience: jwtAudience,
                claims: claims,
                expires: expiresAt,
                signingCredentials: creds);

            return (new JwtSecurityTokenHandler().WriteToken(jwt), expiresAt);
        }

        private int GetRefreshTokenExpiresDays()
        {
            var refreshDaysText = _configuration["Jwt:RefreshTokenExpiresDays"];
            if (!int.TryParse(refreshDaysText, out var refreshDays) || refreshDays <= 0)
            {
                throw new InternalServerException("Cấu hình refresh token không hợp lệ");
            }
            return refreshDays;
        }

        private UserInfoDto BuildUserInfo(User user)
        {
            return new UserInfoDto
            {
                Id = user.Id,
                Email = user.Email,
                FullName = user.FullName,
                Role = user.Role
            };
        }

        private RefreshToken CreateRefreshToken(int userId, string rawRefreshToken, int refreshDays, string? ipAddress = null)
        {
            return new RefreshToken
            {
                UserId = userId,
                TokenHash = ComputeSha256Hash(rawRefreshToken),
                CreatedAt = DateTime.UtcNow,
                ExpiresAt = DateTime.UtcNow.AddDays(refreshDays),
                CreatedByIp = ipAddress
            };
        }
    }
}