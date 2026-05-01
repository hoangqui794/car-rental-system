using CarRental.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace CarRental.Application.Interfaces
{
    public interface IApplicationDbContext
    {
        // Khai báo các bảng để UserService có thể dùng
        DbSet<User> Users { get; set; }

        DbSet<Car> Cars { get; set; }
        DbSet<Booking> Bookings { get; set; }
        DbSet<Payment> Payments { get; set; }
        DbSet<Review> Reviews { get; set; }
        DbSet<CarImage> CarImages { get; set; }

        // Khai báo hàm lưu dữ liệu
        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
    }
}