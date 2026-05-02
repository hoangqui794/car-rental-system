# 🚗 SMART CAR RENTAL SYSTEM - TRẠNG THÁI DỰ ÁN (PROJECT STATE)

**Mục đích file:** Lưu trữ toàn bộ ngữ cảnh, tiến độ và cấu trúc dự án để AI đọc và tiếp tục làm việc vào ngày mai mà không cần giải thích lại từ đầu.
**Ngày cập nhật cuối:** (Phiên làm việc - Đang thực hiện Giai đoạn 2: Login & JWT)

---

## 🏗️ 1. KIẾN TRÚC DỰ ÁN (ARCHITECTURE)
Dự án được xây dựng theo chuẩn **Clean Architecture (4 Layers)**:
1. **`CarRental.Domain` (Core - Không phụ thuộc ai):** Chứa các Entity (User, Car, Booking...) sinh ra từ Database-First và các Enums (`UserRole`).
2. **`CarRental.Application` (Business Logic - Phụ thuộc Domain):** Chứa các DTOs, Interfaces, và Services. Giao tiếp với Database thông qua Interface (Dependency Inversion), KHÔNG gọi trực tiếp thư viện hạ tầng.
3. **`CarRental.Infrastructure` (Data Access - Phụ thuộc Application & Domain):** Chứa `CarRentalDbContext` (cài đặt Npgsql) và thực thi (implement) các Interface của Application.
4. **`CarRental.API` (Presentation - Phụ thuộc Application & Infrastructure):** Chứa Controllers, Swagger, Program.cs (nơi thiết lập cấu hình và Dependency Injection).

---

## ✅ 2. TIẾN ĐỘ ĐÃ HOÀN THÀNH (WHAT'S DONE)

### 👤 Module 1: Auth & User Management
**Giai đoạn 1: Đăng ký (Register) & Database (Đã xong 100%)**
*   [x] **Thiết kế Database:** ERD chuẩn, có Constraint chặt chẽ, Enum roles.
*   [x] **Sửa lỗi Kiến trúc (Circular Dependency):** Đã gỡ bỏ tham chiếu sai từ Application sang Infrastructure.
*   [x] **Domain Layer:** Đã tạo `UserRole` Enum (`Admin`, `Owner`, `Customer`).
*   [x] **Application Layer:** 
    * Cài đặt thành công `BCrypt.Net-Next` để hash mật khẩu.
    * Tạo `IApplicationDbContext`.
    * Tạo `RegisterRequest` DTO (có DataAnnotations kiểm tra Email, Password).
    * Hoàn thiện `UserService.RegisterAsync` (kiểm tra email trùng, hash mật khẩu bằng BCrypt, dùng `DateTime.UtcNow` fix lỗi DbUpdateException).
*   [x] **Infrastructure Layer:** Cấu hình `CarRentalDbContext` kế thừa `IApplicationDbContext`.
*   [x] **API Layer:**
    * Đăng ký DI cho `CarRentalDbContext`, `IApplicationDbContext`, `IUserService`.
    * Tạo thành công `AuthController` với API `POST /api/auth/register`.
    * Cấu hình `LowercaseUrls = true` để chuẩn hóa RESTful URL.
    * Đã test gọi API thành công, chèn dữ liệu User vào PostgreSQL.

DỰ ÁN HIỆN ĐANG BUILD THÀNH CÔNG (0 Lỗi).

---

## 🚀 3. CÔNG VIỆC TIẾP THEO (TODO FOR NEXT SESSION)

**Giai đoạn 2: Đăng nhập (Login) & Cấu hình JWT (Đang thực hiện)**
*   [ ] **Bước 1:** Tạo `LoginRequest` DTO.
*   [ ] **Bước 2:** Cài đặt các Package JWT (`System.IdentityModel.Tokens.Jwt`, `Microsoft.AspNetCore.Authentication.JwtBearer`).
*   [ ] **Bước 3:** Viết hàm `LoginAsync` trong `UserService` (kiểm tra mật khẩu và cấp Token).
*   [ ] **Bước 4:** Bổ sung Endpoint `POST /api/auth/login` vào `AuthController`.
*   [ ] **Bước 5:** Cấu hình Secret Key trong `appsettings.json` và cấu hình Middleware JWT Authentication, Swagger Authorize trong `Program.cs`.

**Giai đoạn 3: Phân quyền (Authorization) & Module Quản lý Xe**
*   [ ] Dùng `[Authorize]` để khóa các API bảo mật.
*   [ ] Phân quyền bằng `[Authorize(Roles="...")]` cho Admin, Owner, Customer.
*   [ ] Chuyển sang Module `Car Management` (Thêm xe, Sửa xe, Upload hình ảnh).

---
*Ghi chú cho AI vào ngày mai: Dự án đang ở nửa sau của Module Auth (Đăng nhập và JWT). Người dùng cần hoàn thành code LoginAsync và cấu hình Program.cs.*
**⚠️ LƯU Ý QUAN TRỌNG DÀNH CHO AI:** 
- Tuyệt đối **KHÔNG SỬ DỤNG AGENT** để tự động sửa file hay chạy lệnh khi chưa được yêu cầu. 
- Hãy đóng vai trò là một **Senior Developer** hướng dẫn **Newbie**. 
- Chỉ cung cấp code, hướng dẫn chi tiết từng bước và phải **giải thích cặn kẽ TẠI SAO** lại làm như vậy để Newbie tự tay gõ code và hiểu sâu bản chất vấn đề.
