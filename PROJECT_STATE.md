# SMART CAR RENTAL SYSTEM - TRANG THAI DU AN (PROJECT STATE)

**Muc dich file:** Luu ngu canh, cau truc, tien do va cac viec dang mo de tiep tuc nhanh o phien sau.
**Ngay cap nhat cuoi:** 2026-05-02

---

## 1) KIEN TRUC DU AN

Du an dang di theo huong Clean Architecture voi 4 layer chinh:

1. `CarRental.Domain`
   - Chua entity va enum core.
   - Khong phu thuoc API/Infrastructure.
   - File chinh hien co:
     - `Entities/User.cs`
     - `Entities/RefreshToken.cs`
     - `Entities/Car.cs`
     - `Entities/Booking.cs`
     - `Entities/Payment.cs`
     - `Entities/Review.cs`
     - `Entities/CarImage.cs`
     - `Enums/UserRole.cs`

2. `CarRental.Application`
   - Chua DTO, interface va service business logic.
   - File chinh hien co:
     - `DTOs/RegisterRequest.cs`
     - `DTOs/LoginRequest.cs`
     - `DTOs/LoginResponse.cs`
     - `DTOs/RefreshTokenRequest.cs`
     - `DTOs/LogoutRequest.cs`
     - `Interfaces/IUserService.cs`
     - `Interfaces/IApplicationDbContext.cs`
     - `Services/UserService.cs`
     - `Exceptions/AppException.cs`

3. `CarRental.Infrastructure`
   - Chua EF Core DbContext va mapping database.
   - File chinh:
     - `Models/CarRentalDbContext.cs`
   - Dang map bang `refresh_tokens`, bao gom optimistic concurrency bang PostgreSQL `xmin`.

4. `CarRental.API`
   - Chua controller, DI, middleware, JWT authentication, Swagger.
   - File chinh:
     - `Program.cs`
     - `Controllers/AuthController.cs`
     - `Middlewares/ExceptionHandlingMiddleware.cs`
     - `appsettings.json`

---

## 2) TIEN DO AUTH HIEN TAI

### A. Register: DA HOAN THANH

- `POST /api/auth/register` da co.
- `RegisterRequest` co validation.
- `UserService.RegisterAsync`:
  - check email trung.
  - hash password bang BCrypt.
  - tao user voi role mac dinh `Customer`.
  - throw `ConflictException` neu email da ton tai.

### B. Login + JWT: DA HOAN THANH

- `POST /api/auth/login` da co.
- `LoginRequest` hien chi gom:
  - `Email`
  - `Password`
- `LoginAsync`:
  - verify email/password.
  - tao access token JWT.
  - tao refresh token raw.
  - hash refresh token truoc khi luu DB.
  - tra ve access token + user info.
- Policy hien tai: **1 user = 1 refresh session active**.
  - Khi login moi, cac refresh token active cu cua user bi revoke voi reason `New login`.

### C. Refresh Token Flow: DA IMPLEMENT

- `RefreshToken` entity da co:
  - `TokenHash`
  - `ExpiresAt`
  - `CreatedAt`
  - `RevokedAt`
  - `ReplacedByTokenHash`
  - `CreatedByIp`
  - `RevokedByIp`
  - `ReasonRevoked`
  - `Version` map voi PostgreSQL `xmin`.
- `LoginAsync` da luu refresh token dang hash.
- `RefreshAsync` da implement:
  - hash refresh token request.
  - tim token trong DB.
  - check invalid/revoked/expired.
  - rotate token cu sang token moi.
  - set `RevokedAt`, `RevokedByIp`, `ReasonRevoked = "Rotated"`.
  - set `ReplacedByTokenHash`.
  - bat `DbUpdateConcurrencyException` de xu ly double-use refresh token.
- `LogoutAsync` da implement:
  - lay refresh token.
  - hash va tim trong DB.
  - revoke token voi reason `Logout`.
  - bat concurrency exception va return im lang neu logout trung.

### D. Refresh Token Cookie Strategy: DANG LAM

- `AuthController.Login` dang:
  - goi `LoginAsync`.
  - set refresh token vao cookie `refreshToken`.
  - xoa `RefreshToken` khoi response body bang `result.RefreshToken = string.Empty`.
- `AuthController.Refresh` dang:
  - lay refresh token tu cookie.
  - tao `RefreshTokenRequest` noi bo de goi service.
  - set cookie moi sau khi rotate token.
  - xoa refresh token khoi response body.
- `AuthController.Logout` dang:
  - lay refresh token tu cookie.
  - goi `LogoutAsync`.
  - delete cookie `refreshToken`.
- Cookie options hien tai:
  - `HttpOnly = true`
  - `Secure = true`
  - `SameSite = Strict`
  - `Expires = DateTimeOffset.UtcNow.AddDays(7)`

Can luu y: `Secure = true` dung cho production HTTPS, nhung local HTTP co the khong luu cookie.

---

## 3) PRODUCTION-HARDENING DA LAM

### A. Global Exception Handling: DA LAM

- Da them `CarRental.Application/Exceptions/AppException.cs`.
- Cac exception hien co:
  - `BadRequestException`
  - `UnauthorizedException`
  - `ConflictException`
  - `InternalServerException`
- Da them `CarRental.API/Middlewares/ExceptionHandlingMiddleware.cs`.
- `Program.cs` da dang ky:
  - `app.UseMiddleware<ExceptionHandlingMiddleware>();`
- `AuthController` da duoc don sach:
  - khong con `try/catch` tung action.
  - controller mong hon, service throw exception, middleware handle response.

### B. Refresh Token Security: DA LAM MOT PHAN

- Refresh token khong luu raw trong DB.
- Refresh token luu bang SHA-256 hash.
- Refresh token da chuyen sang cookie `HttpOnly`.
- Response body khong con tra refresh token raw cho client.

### C. Concurrency: DA LAM MOT PHAN

- `RefreshToken.Version` da them vao domain entity.
- EF mapping:
  - `Version` map vao PostgreSQL system column `xmin`.
  - dung `.IsRowVersion()`.
- `RefreshAsync` bat `DbUpdateConcurrencyException`.
- `LogoutAsync` bat `DbUpdateConcurrencyException`.

---

## 4) TRANG THAI BUILD/RUN HIEN TAI

- `CarRental.Domain` build thanh cong.
- `CarRental.Application` build thanh cong.
- `CarRental.API` va `CarRental.Infrastructure` trong moi truong hien tai dang co hien tuong `Build FAILED` nhung khong in error chi tiet.
  - Chua ket luan chac chan la loi code.
  - Can build lai trong Visual Studio hoac terminal local day du output.
- Da tung gap loi restore/build lien quan NuGet/network/sandbox truoc do.

Lenh build da dung gan day:

```powershell
dotnet build CarRental.Domain\CarRental.Domain.csproj --no-restore
dotnet build CarRental.Application\CarRental.Application.csproj --no-restore
dotnet build CarRental.Infrastructure\CarRental.Infrastructure.csproj --no-restore
dotnet build CarRental.API\CarRental.API.csproj --no-restore
```

---

## 5) VAN DE / RUI RO CON MO

### A. Secret config chua production-ready

- `Jwt:Key` van dang nam trong `CarRental.API/appsettings.json`.
- Connection string cung dang co password DB trong `appsettings.json`.
- Viec can lam:
  - Dev: dung `dotnet user-secrets`.
  - Production: dung environment variables hoac secret manager.
  - Khong commit secret that vao repo.

### B. Cookie expiry dang hard-code

- Cookie `refreshToken` dang set expire `AddDays(7)` trong `AuthController`.
- DB refresh token expire doc tu config `Jwt:RefreshTokenExpiresDays`.
- Viec can lam:
  - Dong bo cookie expiry voi config.
  - Tot hon: tao strongly typed options `JwtOptions`.

### C. Middleware co the expose message loi 500

- `ExceptionHandlingMiddleware` dang tra `ex.Message` cho moi `AppException`.
- Neu `InternalServerException` co message nhay cam, client co the thay.
- Viec can lam:
  - Neu `StatusCode == 500`, tra message chung.
  - Log chi tiet noi bo sau nay.

### D. Clean Architecture chua hoan toan sach o transaction

- `UserService.RefreshAsync` dang cast `_context` sang EF `DbContext` de mo transaction.
- Dung duoc cho du an hien tai, nhung Clean Architecture nghiem tuc nen co abstraction transaction/unit of work.
- Viec can lam sau:
  - Them interface transaction vao Application, implement o Infrastructure.

### E. Migration strategy chua chot

- Truoc do `dotnet ef migrations list` tung bao khong co migrations.
- Source migration chua thay trong repo.
- Viec can lam:
  - Chot code-first hay database-first.
  - Neu code-first, tao migration source va commit.
  - Neu database-first, can quy trinh scaffold ro rang.

### F. Message con chua dong nhat

- Mot so message trong `UserService` van thieu dau:
  - `"Refresh token khong hop le"`
  - `"Refresh token bi thu hoi"`
  - `"Refresh token da het han"`
- Nen chuan hoa tieng Viet co dau.

---

## 6) TODO UU TIEN TIEP THEO

### Uu tien 1: Chot chuyen secret ra ngoai config

1. Xoa secret that khoi `appsettings.json`.
2. Cau hinh `dotnet user-secrets` cho local:

```powershell
dotnet user-secrets init --project CarRental.API
dotnet user-secrets set "Jwt:Key" "your-local-dev-secret-min-32-chars" --project CarRental.API
dotnet user-secrets set "ConnectionStrings:MyCnn" "Host=localhost;Port=5432;Database=car_rental_db;Username=postgres;Password=..." --project CarRental.API
```

3. Khi deploy, dung env vars:

```powershell
$env:Jwt__Key="real-production-secret"
$env:ConnectionStrings__MyCnn="real-production-connection-string"
```

### Uu tien 2: Dong bo cookie expiry voi config

- Inject `IConfiguration` vao `AuthController` hoac tao options class.
- `SetRefreshTokenCookie` dung `Jwt:RefreshTokenExpiresDays` thay vi hard-code `7`.

### Uu tien 3: Chinh middleware loi 500

- Neu `AppException.StatusCode == 500`, tra message chung:
  - `"Da xay ra loi tren server."`
- Sau nay them logging.

### Uu tien 4: Test end-to-end Auth

Can test bang Swagger/Postman/browser:

1. `register` thanh cong.
2. `login` thanh cong:
   - response co access token.
   - response body khong tra refresh token raw.
   - cookie `refreshToken` duoc set.
3. `refresh` khong body:
   - doc cookie.
   - rotate refresh token.
   - set cookie moi.
4. Dung refresh token cu phai fail.
5. `logout`:
   - revoke token.
   - delete cookie.
6. `refresh` sau logout phai fail.

### Uu tien 5: Authorization

- Them `[Authorize]` cho API can bao ve.
- Them role-based authorization:
  - Admin
  - Owner
  - Customer

---

## 7) CAC FILE CHINH DA THAY DOI

- `CarRental.API/Program.cs`
- `CarRental.API/Controllers/AuthController.cs`
- `CarRental.API/Middlewares/ExceptionHandlingMiddleware.cs`
- `CarRental.API/appsettings.json`
- `CarRental.Application/Exceptions/AppException.cs`
- `CarRental.Application/Services/UserService.cs`
- `CarRental.Application/Interfaces/IUserService.cs`
- `CarRental.Application/DTOs/LoginRequest.cs`
- `CarRental.Application/DTOs/LoginResponse.cs`
- `CarRental.Application/DTOs/RefreshTokenRequest.cs`
- `CarRental.Application/DTOs/LogoutRequest.cs`
- `CarRental.Domain/Entities/RefreshToken.cs`
- `CarRental.Infrastructure/Models/CarRentalDbContext.cs`

---

## 8) GHI CHU CHO PHIEN SAU

- Tiep tuc phong cach mentoring tung buoc, giai thich vi sao, khong sua qua nhieu khi user muon tu code.
- Can can than hon voi moi buoc production-hardening:
  - noi ro local vs production khac nhau the nao.
  - build/test sau moi chang.
  - neu thay loi nho, sua gon va note ro.
- Muc tieu gan nhat:
  1. Dua secret ra khoi `appsettings.json`.
  2. Dong bo refresh cookie expiry voi config.
  3. Chinh middleware khong expose message loi 500.
  4. Test end-to-end auth flow.
