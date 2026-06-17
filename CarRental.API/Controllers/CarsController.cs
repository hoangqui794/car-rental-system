using CarRental.Application.DTOs;
using CarRental.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace CarRental.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarsController : ControllerBase
    {
        private readonly ICarService _carService;

        public CarsController(ICarService carService)
        {
            _carService = carService;
        }

        // 1. GET /api/cars (lấy ds và kèm bộ lọc)

        /// <summary>
        /// Lấy danh sách xe đang có trên hệ thống kèm bộ lọc tìm kiếm
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> GetAll(
            [FromQuery] string? location,
            [FromQuery] decimal? minPrice,
            [FromQuery] decimal? maxPrice,
            [FromQuery] string? brand,
            [FromQuery] string? searchTerm
            )
        {
            var result = await _carService.GetAllCarAsync(location, minPrice, maxPrice, brand, searchTerm);
            return Ok(result);
        }

        // 2. GET /api/cars/{id} (Lấy chi tiết một chiếc xe)
        /// <summary>
        /// Lấy chi tiết một chiếc xe
        /// </summary>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _carService.GetCarByIdAsync(id);
            return Ok(result);
        }

        // 3. POST /api/cars (Chủ xe đăng ký xe mới - Yêu cầu đăng nhập)
        /// <summary>
        ///  (Chủ xe đăng ký xe mới - Yêu cầu đăng nhập)
        /// </summary>
        [HttpPost]
        [Authorize(Roles = "Owner")]
        public async Task<IActionResult> Create([FromBody] CreateCarRequest request)
        {
            //Lấy userId từ token
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!Guid.TryParse(userId, out var ownerId))
            {
                return Unauthorized(new { message = "Token không chứa ID người dùng không hợp lệ" });
            }
            var result = await _carService.CreateCarAsync(request, ownerId);
            return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
        }

        // 4. PUT /api/cars/{id} (Cập nhật thông tin xe - Yêu cầu đăng nhập)
        /// <summary>
        /// (Cập nhật thông tin xe - Yêu cầu đăng nhập)
        /// </summary>

        [HttpPut("{id}")]
        [Authorize(Roles = "Owner")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateCarRequest request)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!Guid.TryParse(userId, out var ownerId))
            {
                return Unauthorized(new { message = "Token không chứa ID người dùng không hợp lệ" });
            }

            var result = await _carService.UpdateCarAsync(id, request, ownerId);
            return Ok(result);
        }

        // 5. DELETE /api/cars/{id} (Xóa xe - Yêu cầu đăng nhập)
        /// <summary>
        /// (Xóa xe - Yêu cầu đăng nhập)
        /// </summary>
        [HttpDelete("{id}")]
        [Authorize(Roles = "Owner")]
        public async Task<IActionResult> Delete(int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!Guid.TryParse(userId, out var ownerId))
            {
                return Unauthorized(new { message = "Token không chứa ID người dùng không hợp lệ" });
            }
            await _carService.DeleteCarAsync(id, ownerId);
            return Ok(new { message = "Xóa xe thành công" });
        }
    }
}