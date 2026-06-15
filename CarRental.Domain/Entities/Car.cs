using System;
using System.Collections.Generic;

namespace CarRental.Domain.Entities;

public partial class Car
{
    public int Id { get; set; }

    public Guid OwnerId { get; set; }

    public string Name { get; set; } = null!;

    public string? Brand { get; set; }

    public decimal PricePerDay { get; set; }

    public string? Location { get; set; }

    public string? Description { get; set; }

    public string? Status { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual ICollection<Booking> Bookings { get; set; } = new List<Booking>();

    public virtual CarImage? CarImage { get; set; }

    public virtual User Owner { get; set; } = null!;

    public virtual ICollection<Review> Reviews { get; set; } = new List<Review>();
}