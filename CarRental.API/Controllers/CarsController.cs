using CarRental.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CarRental.API.Controllers
{
    [Route("api/[controller]")]
    public class CarsController : Controller
    {
        private readonly ICarService _carService;

        public CarsController(ICarService carService)
        {
            _carService = carService;
        }

        // 1. GET /api/cars (lấy ds và kèm bộ lọc)

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
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _carService.GetCarByIdAsync(id);
            return Ok(result);
        }

        //public IActionResult Index()
        //{
        //    return View();
        //}
    }
}