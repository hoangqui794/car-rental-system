using System;
using System.Collections.Generic;

namespace CarRental.Domain.Entities;

public partial class Review
{
    public int Id { get; set; }

    public Guid UserId { get; set; }

    public int CarId { get; set; }

    public int Rating { get; set; }

    public string? Comment { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual Car Car { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}