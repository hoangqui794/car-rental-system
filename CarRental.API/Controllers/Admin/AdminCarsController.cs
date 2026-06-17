using CarRental.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CarRental.API.Controllers.Admin
{
    [Route("api/admin/cars")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class AdminCarsController : ControllerBase
    {
        private readonly ICarService _carService;

        public AdminCarsController(ICarService carService)
        {
            _carService = carService;
        }

        /// <summary>
        /// API phê duyệt xe chờ duyệt
        /// PUT /api/admin/cars/{id}/approve
        /// </summary>
        [HttpPut("{id}/approve")]
        public async Task<IActionResult> Approve(int id)
        {
            await _carService.ApproveCarAsync(id);
            return Ok(new { message = "Đã phê duyệt xe thành công. Xe hiên đã hiển thị công khai!" });
        }

        /// <summary>
        /// API lấy danh sách toàn bộ xe chờ duyệt (Nếu cần hiển thị danh sách cho Admin duyệt)
        /// GET /api/admin/cars/pending
        /// </summary>
        //[HttpGet("pending")]
        //public Task<IActionResult> GetPendingCars()
        //{
        //    // (Chúng ta có thể phát triển thêm hàm GetPendingCars trong CarService nếu cần)
        //    return Ok();
        //}
    }
}