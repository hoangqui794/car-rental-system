using CarRental.Application.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRental.Application.Interfaces
{
    public interface ICarService
    {
        Task<IEnumerable<CarDto>> GetAllCarAsync(
            string? location, decimal? minPrice, decimal? maxPrice,
            string? brand, string? searchTerm
            );

        Task<CarDto> GetCarByIdAsync(int id);

        Task<CarDto> CreateCarAsync(CreateCarRequest request, Guid ownerId);

        Task DeleteCarAsync(int id, Guid ownerId);

        Task<CarDto> UpdateCarAsync(int id, UpdateCarRequest request, Guid ownerId);

        Task ApproveCarAsync(int id);
    }
}