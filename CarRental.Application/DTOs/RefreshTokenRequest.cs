using System.ComponentModel.DataAnnotations;

namespace CarRental.Application.DTOs
{
    public class RefreshTokenRequest
    {
        [Required]
        public string RefreshToken { get; set; } = string.Empty;
    }
}