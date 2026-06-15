using System;
using System.Collections.Generic;

namespace CarRental.Domain.Entities;

public partial class Booking
{
    public int Id { get; set; }

    public Guid UserId { get; set; }

    public int CarId { get; set; }

    public DateTime StartDate { get; set; }

    public DateTime EndDate { get; set; }

    public decimal TotalPrice { get; set; }

    public string? Status { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual Car Car { get; set; } = null!;

    public virtual Payment? Payment { get; set; }

    public virtual User User { get; set; } = null!;
}