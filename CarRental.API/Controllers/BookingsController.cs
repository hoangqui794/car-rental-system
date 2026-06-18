using CarRental.Application.DTOs;
using CarRental.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace CarRental.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class BookingsController : ControllerBase
    {
        private readonly IBookingService _bookingService;

        public BookingsController(IBookingService bookingService)
        {
            _bookingService = bookingService;
        }

        /// <summary>
        /// Lấy lịch sử đặt xe của khách hàng đang đăng nhập
        /// GET /api/bookings
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> GetMyBookings()
        {
            var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!Guid.TryParse(userIdStr, out var userid))
            {
                return Unauthorized(new { message = "Token người dùng không hợp lệ." });
            }

            var result = await _bookingService.GetMyBookingsAsync(userid);
            return Ok(result);
        }

        /// <summary>
        /// Tạo đơn đặt xe mới
        /// POST /api/bookings
        /// </summary>
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateBookingRequest request)
        {
            var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!Guid.TryParse(userIdStr, out var userid))
            {
                return Unauthorized(new { message = "Token người dùng không hợp lệ." });
            }

            var result = await _bookingService.CreateBookingAsync(request, userid);
            return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
        }

        /// <summary>
        /// Lấy chi tiết một đơn đặt xe
        /// GET /api/bookings/{id}
        /// </summary>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!Guid.TryParse(userIdStr, out var userid))
            {
                return Unauthorized(new { message = "Token người dùng không hợp lệ." });
            }
            var result = await _bookingService.GetBookingByIdAsync(id, userid);
            return Ok(result);
        }

        /// <summary>
        /// API lấy danh sách đơn khách đặt xe của TÔI
        /// GET: api/bookings/my-cars
        /// </summary>
        [HttpGet("my-cars")]
        [Authorize(Roles = "Owner")]
        public async Task<IActionResult> GetBookingsForMyCars()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!Guid.TryParse(userId, out var ownerId))
            {
                return Unauthorized(new { message = "Token chủ xe không hợp lệ." });
            }
            var result = await _bookingService.GetBookingsForOwnerAsync(ownerId);
            return Ok(result);
        }

        /// <summary>
        /// API Chủ xe Duyệt đơn
        /// PUT: api/bookings/{id}/approve
        /// </summary>
        [HttpPut("{id}/approve")]
        [Authorize(Roles = "Owner")]
        public async Task<IActionResult> ApproveBooking(int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!Guid.TryParse(userId, out var ownerId))
            {
                return Unauthorized(new { message = "Token chủ xe không hợp lệ." });
            }
            await _bookingService.ApproveBookingAsync(id, ownerId);
            return Ok(new { message = "Đã phê duyệt đơn đặt xe thành công." });
        }

        /// <summary>
        /// API Chủ xe Từ chối đơn
        /// PUT: api/bookings/{id}/reject
        /// </summary>
        [HttpPut("{id}/reject")]
        [Authorize(Roles = "Owner")]
        public async Task<IActionResult> RejectBooking(int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!Guid.TryParse(userId, out var ownerId))
            {
                return Unauthorized(new { message = "Token chủ xe không hợp lệ." });
            }
            await _bookingService.RejectBookingAsync(id, ownerId);
            return Ok(new { message = "Đã từ chối đơn đặt xe thành công." });
        }
    }
}