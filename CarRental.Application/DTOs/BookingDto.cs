using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRental.Application.DTOs
{
    public class BookingDto
    {
        public int Id { get; set; }
        public Guid UserId { get; set; }
        public int CarId { get; set; }
        public string carName { get; set; } = string.Empty;
        public string carImageUrl { get; set; } = string.Empty;

        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public decimal TotalPrice { get; set; }
        public string Status { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
    }
}