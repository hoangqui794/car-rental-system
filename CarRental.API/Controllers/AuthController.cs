using CarRental.Application.DTOs;
using CarRental.Application.Exceptions;
using CarRental.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CarRental.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly IUserService _userService;

        public AuthController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            var result = await _userService.RegisterAsync(request);
            return Ok(new { message = result });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var result = await _userService.LoginAsync(request);
            SetRefreshTokenCookie(result.RefreshToken);
            result.RefreshToken = string.Empty;
            return Ok(result);
        }

        [HttpPost("refresh")]
        public async Task<IActionResult> Refresh()
        {
            var refreshToken = Request.Cookies["refreshToken"];
            if (string.IsNullOrWhiteSpace(refreshToken))
            {
                throw new UnauthorizedException("Refresh token không hợp lệ");
            }

            var ipAddress = HttpContext.Connection.RemoteIpAddress?.ToString() ?? "Unknown";

            var result = await _userService.RefreshAsync(
                new RefreshTokenRequest { RefreshToken = refreshToken },
                ipAddress
            );

            SetRefreshTokenCookie(result.RefreshToken);
            result.RefreshToken = string.Empty;

            return Ok(result);
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            var refreshToken = Request.Cookies["refreshToken"];
            if (!string.IsNullOrWhiteSpace(refreshToken))
            {
                var ip = HttpContext.Connection.RemoteIpAddress?.ToString() ?? "Unknown";

                await _userService.LogoutAsync(
                    new LogoutRequest { RefreshToken = refreshToken },
                    ip
                );
            }

            Response.Cookies.Delete("refreshToken");

            return Ok(new { message = "Đăng xuất thành công" });
        }

        private void SetRefreshTokenCookie(string refreshToken)
        {
            Response.Cookies.Append("refreshToken", refreshToken, new CookieOptions
            {
                HttpOnly = true,
                //Secure = true,
                Secure = Request.IsHttps,
                SameSite = SameSiteMode.Strict,
                Expires = DateTimeOffset.UtcNow.AddDays(7)
            });
        }
    }
}