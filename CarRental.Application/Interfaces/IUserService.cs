using CarRental.Application.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRental.Application.Interfaces
{
    public interface IUserService
    {
        Task<string> RegisterAsync(RegisterRequest request);

        Task<LoginResponse> LoginAsync(LoginRequest request);

        Task<LoginResponse> RefreshAsync(RefreshTokenRequest request, string ipAddress);

        Task LogoutAsync(LogoutRequest request, string ipAddress);
    }
}