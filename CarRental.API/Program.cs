using CarRental.Application.Interfaces;
using CarRental.Application.Services;
using CarRental.Infrastructure.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

var connectionStr = builder.Configuration.GetConnectionString("MyCnn");
builder.Services.AddDbContext<CarRentalDbContext>(options =>
    options.UseNpgsql(connectionStr));

builder.Services.AddScoped<IApplicationDbContext>(provider =>
    provider.GetRequiredService<CarRentalDbContext>());

builder.Services.AddScoped<IUserService, UserService>();

// url  sẽ được chuyển thành chữ thường, ví dụ: /api/auth/register thay vì /api/Auth/Register
builder.Services.AddRouting(options => options.LowercaseUrls = true);
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();