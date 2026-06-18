using CarRental.Application.DTOs;
using CarRental.Application.Exceptions;
using CarRental.Application.Interfaces;
using CarRental.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace CarRental.Application.Services
{
    public class BookingService : IBookingService
    {
        private readonly IApplicationDbContext _context;

        public BookingService(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<BookingDto> CreateBookingAsync(CreateBookingRequest request, Guid userId)
        {
            if (request.StartDate.Date < DateTime.UtcNow.Date)
            {
                throw new BadRequestException("Ngày bắt đầu phải là ngày hôm nay hoặc ngày trong tương lai");
            }
            if (request.EndDate.Date < request.StartDate.Date)
            {
                throw new BadRequestException("Ngày kết thúc phải lớn hơn hoặc bằng ngày bắt đầu.");
            }
            // 2. Tìm xe và kiểm tra tính sẵn sàng của xe
            var car = await _context.Cars
                .Include(c => c.CarImage)
                .FirstOrDefaultAsync(c => c.Id == request.CarId);

            if (car == null)
            {
                throw new NotFoundException("Không tìm thấy xe với ID: " + request.CarId);
            }
            if (car.Status != "Available")
            {
                throw new BadRequestException("Xe hiện tại đang không sẵn sàng cho thuê (Đang bận hoặc bảo dưỡng).");
            }
            // 3. Kiểm tra trùng lịch đặt xe (Double Booking)
            bool isOverLapping = await _context.Bookings
                .AnyAsync(b => b.CarId == request.CarId && (b.Status == "Pending" || b.Status == "Confirmed")
                && b.StartDate.Date <= request.EndDate.Date
                && b.EndDate.Date >= request.StartDate.Date);

            if (isOverLapping)
            {
                throw new BadRequestException("Xe đã bị đặt trùng lịch trong khoản thời gian này.");
            }

            // 4. Tính số ngày thuê (Nếu start và end trùng ngày thì tính là 1 ngày)
            int totalDays = (request.EndDate.Date - request.StartDate.Date).Days;
            if (totalDays <= 0)
            {
                totalDays = 1;
            }
            decimal totalPrice = car.PricePerDay * totalDays;

            var booking = new Booking
            {
                UserId = userId,
                CarId = request.CarId,
                StartDate = request.StartDate.Date,
                EndDate = request.EndDate.Date,
                TotalPrice = totalPrice,
                Status = "Pending",// Trạng thái mặc định ban đầu là chờ chủ xe duyệt
                CreatedAt = DateTime.UtcNow
            };
            _context.Bookings.Add(booking);
            await _context.SaveChangesAsync();
            // Gán thông tin xe để mapper hoạt động đầy đủ
            booking.Car = car;
            return MapToBookingDto(booking);
        }

        public async Task<BookingDto> GetBookingByIdAsync(int id, Guid userId)
        {
            var booking = await _context.Bookings
                .Include(b => b.Car)
                .ThenInclude(c => c.CarImage)
                .FirstOrDefaultAsync(b => b.Id == id);
            if (booking == null)
            {
                throw new NotFoundException("Bạn không có quyền truy cập thông tin đơn đặt xe này.");
            }
            if (booking.UserId != userId)
            {
                throw new ForbiddenException("Bạn không có quyền truy cập thông tin đơn đặt xe này.");
            }
            return MapToBookingDto(booking);
        }

        public async Task<IEnumerable<BookingDto>> GetMyBookingsAsync(Guid userId)
        {
            var bookings = await _context.Bookings
               .Include(b => b.Car)
               .ThenInclude(c => c.CarImage)
               .Where(b => b.UserId == userId)
               .OrderByDescending(b => b.CreatedAt)
               .ToListAsync();
            return bookings.Select(MapToBookingDto);
        }

        private BookingDto MapToBookingDto(Booking booking)
        {
            return new BookingDto
            {
                Id = booking.Id,
                UserId = booking.UserId,
                CarId = booking.CarId,
                carName = booking.Car?.Name ?? "Unknown",
                carImageUrl = booking.Car?.CarImage?.ImageUrl ?? string.Empty,
                StartDate = booking.StartDate,
                EndDate = booking.EndDate,
                TotalPrice = booking.TotalPrice,
                Status = booking.Status ?? "Pending",
                CreatedAt = booking.CreatedAt ?? DateTime.UtcNow
            };
        }
    }
}