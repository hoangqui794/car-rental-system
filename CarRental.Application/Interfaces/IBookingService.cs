using CarRental.Application.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRental.Application.Interfaces
{
    public interface IBookingService
    {
        Task<BookingDto> CreateBookingAsync(CreateBookingRequest request, Guid userId);

        Task<IEnumerable<BookingDto>> GetMyBookingsAsync(Guid userId);

        Task<BookingDto> GetBookingByIdAsync(int id, Guid userId);

        Task<IEnumerable<BookingDto>> GetBookingsForOwnerAsync(Guid ownerId);

        Task ApproveBookingAsync(int bookingId, Guid ownerId);

        Task RejectBookingAsync(int bookingId, Guid ownerId);
    }
}