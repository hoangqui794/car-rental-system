# SMART CAR RENTAL SYSTEM - TRANG THAI DU AN (PROJECT STATE)

**Muc dich file:** Luu ngu canh, tien do va cac viec dang mo de tiep tuc nhanh o phien sau.
**Ngay cap nhat cuoi:** 2026-05-02 (US local date)

---

## 1) KIEN TRUC DU AN (CLEAN ARCHITECTURE)
Du an gom 4 layer:
1. `CarRental.Domain`: Entity + Enum core.
2. `CarRental.Application`: DTO, Interface, Service (business logic).
3. `CarRental.Infrastructure`: `CarRentalDbContext`, mapping DB, implement data access.
4. `CarRental.API`: Controller, DI, middleware, Swagger.

---

## 2) TIEN DO DA HOAN THANH

### Module Auth - Giai doan 1 (Register): HOAN THANH
- Da co `RegisterRequest` + validation.
- `UserService.RegisterAsync` da check email trung + hash BCrypt + luu user.
- API `POST /api/auth/register` hoat dong.

### Module Auth - Giai doan 2 (Login + JWT): DA HOAN THANH PHAN LOGIN
- Da them package JWT:
  - `Microsoft.AspNetCore.Authentication.JwtBearer` (API)
  - `System.IdentityModel.Tokens.Jwt` (Application)
- Da cau hinh JWT middleware + Swagger Bearer trong `Program.cs`.
- Da them DTO:
  - `LoginRequest`
  - `LoginResponse`
  - `RefreshTokenRequest`
  - `LogoutRequest`
- Da them endpoint `POST /api/auth/login`.
- `LoginAsync` da tra ve:
  - access token
  - expiresAt
  - user info (id, email, fullName, role)
- Da test login thanh cong (HTTP 200, tra JWT).

### Refresh Token groundwork: DA DAT NEN, CHUA XONG FLOW
- Da co entity `RefreshToken`.
- Da bo sung `DbSet<RefreshToken>` trong `IApplicationDbContext` + `CarRentalDbContext`.
- Da map bang `refresh_tokens` trong `OnModelCreating`.
- `IUserService` da khai bao:
  - `RefreshAsync(...)`
  - `LogoutAsync(...)`
- `UserService` chua implement 2 ham nay (dang `NotImplementedException`).

---

## 3) TRANG THAI BUILD/RUN HIEN TAI
- Solution build thanh cong (lan kiem tra gan nhat: 0 error).
- JWT auth middleware dang bat.
- Thu tu middleware hien tai dung: `UseAuthentication()` truoc `UseAuthorization()`.

---

## 4) RUI RO / VAN DE CAN LUU Y
1. **Migrations source khong co trong repo**
   - Kiem tra bang `dotnet ef migrations list` hien tra ve: **"No migrations were found."**
   - Nghia la source migration (`Migrations/*.cs`) hien khong ton tai trong project.
   - DB van co the dang chay duoc, nhung mat lich su migration trong code se gay kho cho deploy ve sau.

2. **Config key nhay cam**
   - `Jwt:Key` dang dat trong `appsettings.json`.
   - Khi deploy that, nen dua qua secret manager / env vars.

3. **Casing key config**
   - Trong `UserService`, dang doc `"jwt:AccessTokenExpiresMinutes"` (chu thuong).
   - ASP.NET config khong phan biet hoa thuong, nen van chay; tuy nhien nen thong nhat thanh `"Jwt:AccessTokenExpiresMinutes"` cho de doc.

---

## 5) TODO UU TIEN CAO (NEXT SESSION)

### A. Hoan tat Refresh Token flow (uu tien 1)
1. Implement `LoginAsync` de tao va luu refresh token (hash).
2. Implement `RefreshAsync`:
   - Verify refresh token
   - Check expired/revoked
   - Rotate token
   - Tra cap access token moi + refresh token moi
3. Implement `LogoutAsync` de revoke refresh token.
4. Them endpoint API:
   - `POST /api/auth/refresh`
   - `POST /api/auth/logout`
5. Test end-to-end:
   - login -> access + refresh
   - access het han -> refresh thanh cong
   - logout -> refresh cu bi tu choi

### B. Chot migration strategy (uu tien 1)
- Tao lai/khai phuc source migrations vao repo de dam bao deploy on dinh.
- Neu tiep tuc code-first, can co migration files duoc commit.

### C. Authorization (uu tien 2)
- Them `[Authorize]` cho API can bao ve.
- Them role-based `[Authorize(Roles = ...)]` cho Admin/Owner/Customer.

---

## 6) CAC FILE CHINH DA CHAM VAO PHIEN NAY
- `CarRental.API/Program.cs`
- `CarRental.API/Controllers/AuthController.cs`
- `CarRental.API/appsettings.json`
- `CarRental.API/CarRental.API.csproj`
- `CarRental.Application/Interfaces/IUserService.cs`
- `CarRental.Application/Interfaces/IApplicationDbContext.cs`
- `CarRental.Application/Services/UserService.cs`
- `CarRental.Application/DTOs/LoginRequest.cs`
- `CarRental.Application/DTOs/LoginResponse.cs`
- `CarRental.Application/DTOs/RefreshTokenRequest.cs`
- `CarRental.Application/DTOs/LogoutRequest.cs`
- `CarRental.Domain/Entities/RefreshToken.cs`
- `CarRental.Infrastructure/Models/CarRentalDbContext.cs`

---

## 7) GHI CHU CHO PHIEN SAU
- Dung tiep luong Senior mentoring: huong dan tung buoc, giai thich "vi sao".
- Muc tieu gan nhat: chot Refresh Token flow chuan production-lite.
