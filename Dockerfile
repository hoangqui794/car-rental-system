FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["CarRental.API/CarRental.API.csproj", "CarRental.API/"]
COPY ["CarRental.Application/CarRental.Application.csproj", "CarRental.Application/"]
COPY ["CarRental.Domain/CarRental.Domain.csproj", "CarRental.Domain/"]
COPY ["CarRental.Infrastructure/CarRental.Infrastructure.csproj", "CarRental.Infrastructure/"]
RUN dotnet restore "CarRental.API/CarRental.API.csproj"
COPY . .
WORKDIR "/src/CarRental.API"
RUN dotnet build "CarRental.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "CarRental.API.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "CarRental.API.dll"]
