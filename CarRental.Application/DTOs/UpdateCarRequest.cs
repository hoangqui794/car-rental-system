using System.ComponentModel.DataAnnotations;

namespace CarRental.Application.DTOs
{
    public class UpdateCarRequest
    {
        [Required(ErrorMessage = "Tên xe là bắt buộc")]
        [StringLength(255)]
        public string Name { get; set; } = string.Empty;

        [Required(ErrorMessage = "Hãng xe là bắt buộc")]
        [StringLength(255)]
        public string Brand { get; set; } = string.Empty;

        [Range(0.01, 1000000000, ErrorMessage = "Giá Thuê theo ngày lớn hơn 0")]
        public decimal PricePerDay { get; set; }

        [Required(ErrorMessage = "Địa điểm là bắt buộc")]
        [StringLength(255)]
        public string Location { get; set; } = string.Empty;

        public string? Description { get; set; }

        public string? ImageUrl { get; set; }

        [StringLength(255)]
        public string? Status { get; set; }// Ví dụ: Available, Rented, Maintenance
    }
}