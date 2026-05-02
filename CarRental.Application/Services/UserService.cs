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
                throw new Exception("Email đã tồn tại");
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
                throw new Exception("Email hoặc mật khẩu không đúng");
            }

            var isValidPassword = BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash);
            if (!isValidPassword)
            {
                throw new Exception("Email hoặc mật khẩu không đúng");
            }

            var jwtKey = _configuration["Jwt:Key"] ?? throw new Exception("Thiếu Jwt:Key");
            var jwtIssuer = _configuration["Jwt:Issuer"];
            var JwtAudience = _configuration["Jwt:Audience"];

            var expiresMinutesText = _configuration["jwt:AccessTokenExpiresMinutes"];
            if (!int.TryParse(expiresMinutesText, out var expiresMinutes) || expiresMinutes <= 0)
            {
                throw new Exception("Jwt:AccessTokenExpiresMinutes không hợp lệ");
            }
            var expiresAt = DateTime.UtcNow.AddMinutes(expiresMinutes);

            var claim = new List<Claim>
            {
                new Claim (ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.Role)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: jwtIssuer,
                audience: JwtAudience,
                claims: claim,
                expires: expiresAt,
                signingCredentials: creds
            );

            return new LoginResponse
            {
                Token = new JwtSecurityTokenHandler().WriteToken(token),
                ExpiresAt = expiresAt,
                User = new UserInfoDto
                {
                    Id = user.Id,
                    Email = user.Email,
                    FullName = user.FullName,
                    Role = user.Role
                }
            };
        }

        public Task<LoginResponse> RefreshAsync(RefreshTokenRequest request, string ipAddress)
        {
            throw new NotImplementedException();
        }

        public Task LogoutAsync(LogoutRequest request, string ipAddress)
        {
            throw new NotImplementedException();
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
    }
}