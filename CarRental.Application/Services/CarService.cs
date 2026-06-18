using CarRental.Application.DTOs;
using CarRental.Application.Exceptions;
using CarRental.Application.Interfaces;
using CarRental.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace CarRental.Application.Services
{
    public class CarService : ICarService
    {
        private readonly IApplicationDbContext _context;

        public CarService(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task ApproveCarAsync(int id)
        {
            var car = await _context.Cars.FindAsync(id);
            if (car == null)
            {
                throw new NotFoundException($"Không tìm thấy xe có ID = {id}");
            }
            if (car.Status != "Pending")
            {
                throw new BadRequestException("Chỉ có thể duyệt những xe đang ở trạng thái Pending");
            }
            car.Status = "Available";// Duyệt xe thành công, hiển thị công khai
            await _context.SaveChangesAsync();
        }

        public async Task<CarDto> CreateCarAsync(CreateCarRequest request, Guid ownerId)
        {
            var owner = await _context.Users.FindAsync(ownerId);
            if (owner == null)
            {
                throw new UnauthorizedException("Không tìm thấy chủ xe với ID: " + ownerId);
            }

            var car = new Car
            {
                OwnerId = ownerId,
                Name = request.Name,
                Brand = request.Brand,
                PricePerDay = request.PricePerDay,
                Location = request.Location,
                Description = request.Description,
                Status = "Pending",// Mặc định khi tạo xe mới sẽ có trạng thái là "Available"
                CreatedAt = DateTime.UtcNow
            };
            _context.Cars.Add(car);
            await _context.SaveChangesAsync();

            if (!string.IsNullOrWhiteSpace(request.ImageUrl))
            {
                var carImage = new CarImage
                {
                    CarId = car.Id,
                    ImageUrl = request.ImageUrl,
                    IsMain = true,
                };
                _context.CarImages.Add(carImage);
                await _context.SaveChangesAsync();

                car.CarImage = carImage; // Gán CarImage cho Car để trả về thông tin đầy đủ
            }
            return MapToCarDto(car);
        }

        public async Task DeleteCarAsync(int id, Guid ownerId)
        {
            var car = await _context.Cars.FindAsync(id);
            if (car == null)
            {
                throw new NotFoundException($"Không tìm thấy xe có ID = {id}");
            }
            if (car.OwnerId != ownerId)
            {
                throw new ForbiddenException("Bạn không có quyền xóa xe của người khác");
            }
            _context.Cars.Remove(car);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<CarDto>> GetAllCarAsync(string? location, decimal? minPrice, decimal? maxPrice, string? brand, string? searchTerm,
            DateTime? startDate = null, DateTime? endDate = null)
        {
            var query = _context.Cars
          .Include(c => c.CarImage)
          .Include(c => c.Owner)
          //.Include(c => c.Bookings)
          .Include(c => c.Reviews)
          .AsQueryable();
            query = query.Where(c => c.Status == "Available"); // Chỉ lấy những xe có trạng thái là "Available"

            if (startDate.HasValue && endDate.HasValue)
            {
                query = query.Where(c => !c.Bookings.Any(b => (b.Status == "Pending" || b.Status == "Confirmed")
                && b.StartDate <= endDate.Value && b.EndDate >= startDate.Value));
            }

            if (!string.IsNullOrEmpty(location))
            {
                query = query.Where(c => c.Location != null && c.Location.ToLower().Contains(location.ToLower()));
            }

            if (!string.IsNullOrWhiteSpace(brand) && !brand.Equals("All", StringComparison.OrdinalIgnoreCase))
            {
                query = query.Where(c => c.Brand != null && c.Brand.ToLower() == brand.ToLower());
            }

            if (minPrice.HasValue)
            {
                query = query.Where(c => c.PricePerDay >= minPrice.Value);
            }

            if (maxPrice.HasValue)
            {
                query = query.Where(c => c.PricePerDay <= maxPrice.Value);
            }

            if (!string.IsNullOrWhiteSpace(searchTerm))
            {
                query = query.Where(c => c.Name.ToLower().Contains(searchTerm.ToLower())
                || (c.Description != null && c.Description.ToLower().Contains(searchTerm.ToLower()))
                );
            }

            var cars = await query.ToListAsync();
            return cars.Select(c => MapToCarDto(c));
        }

        public async Task<CarDto> GetCarByIdAsync(int id)
        {
            var car = await _context.Cars
                .Include(c => c.CarImage)
                .Include(c => c.Owner)
                .Include(c => c.Reviews)
                .FirstOrDefaultAsync(c => c.Id == id);
            if (car == null)
            {
                throw new NotFoundException("Không tìm thấy xe với ID: " + id);
            }

            return MapToCarDto(car);
        }

        public async Task<CarDto> UpdateCarAsync(int id, UpdateCarRequest request, Guid ownerId)
        {
            var car = await _context.Cars.
                Include(c => c.CarImage)
                .FirstOrDefaultAsync(c => c.Id == id);
            if (car == null)
            {
                throw new NotFoundException("Không tìm thấy xe với ID: " + id + " hoặc bạn không có quyền chỉnh sửa xe này");
            }
            // Kiểm tra xem người đang sửa có phải chủ xe không
            if (car.OwnerId != ownerId)
            {
                throw new ForbiddenException("Bạn không có quyền chỉnh sửa xe của người khác");
            }

            car.Name = request.Name;
            car.Brand = request.Brand;
            car.PricePerDay = request.PricePerDay;
            car.Location = request.Location;
            car.Description = request.Description;
            if (!string.IsNullOrWhiteSpace(request.Status))
            {
                var allowedStatusesForOwner = new[] { "Available", "Maintenance" };

                var validatedStatus = allowedStatusesForOwner.FirstOrDefault(s => s.Equals(request.Status, StringComparison.OrdinalIgnoreCase
                    ));

                if (validatedStatus == null)
                {
                    throw new BadRequestException("Trạng thái xe không hợp lệ. Bạn chỉ có thể chuyển đổi giữa 'Available' (Sẵn sàng) hoặc 'Maintenance' (Bảo dưỡng).");
                }

                car.Status = validatedStatus;
            }
            if (!string.IsNullOrWhiteSpace(request.ImageUrl))
            {
                if (car.CarImage != null)
                {
                    car.CarImage.ImageUrl = request.ImageUrl;
                }
                else
                {
                    var newImg = new CarImage
                    {
                        CarId = car.Id,
                        ImageUrl = request.ImageUrl,
                        IsMain = true
                    };
                    _context.CarImages.Add(newImg);
                    car.CarImage = newImg;
                }
            }
            await _context.SaveChangesAsync();

            return await GetCarByIdAsync(car.Id);
        }

        public async Task<IEnumerable<CarDto>> GetPendingCarsAsync()
        {
            // Lọc trực tiếp dưới Database: Chỉ lấy xe có Status = "Pending"
            var query = _context.Cars
                .Include(c => c.CarImage)
                .Include(c => c.Owner)
                .Where(c => c.Status == "Pending");

            var pendingCars = await query.ToListAsync();

            // Map từ Entity sang DTO để trả về cho FE
            return pendingCars.Select(c => MapToCarDto(c));
        }

        // Hàm helper để map Entity sang DTO
        private CarDto MapToCarDto(Car car)
        {
            double avgRating = 0;
            if (car.Reviews != null && car.Reviews.Any())
            {
                avgRating = Math.Round(car.Reviews.Average(r => r.Rating), 1);
            }
            return new CarDto
            {
                Id = car.Id,
                OwnerId = car.OwnerId,
                OwnerName = car.Owner?.FullName ?? "Unknown",
                Name = car.Name,
                Brand = car.Brand,
                PricePerDay = car.PricePerDay,
                Location = car.Location,
                Description = car.Description,
                Status = car.Status,
                ImageUrl = car.CarImage?.ImageUrl,
                AverageRating = avgRating,
                ReviewsCount = car.Reviews?.Count ?? 0
            };
        }
    }
}