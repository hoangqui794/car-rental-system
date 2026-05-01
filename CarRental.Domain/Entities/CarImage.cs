using System;
using System.Collections.Generic;

namespace CarRental.Domain.Entities;

public partial class CarImage
{
    public int Id { get; set; }

    public int CarId { get; set; }

    public string ImageUrl { get; set; } = null!;

    public bool? IsMain { get; set; }

    public virtual Car Car { get; set; } = null!;
}