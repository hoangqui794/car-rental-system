# 🚗 SMART CAR RENTAL SYSTEM - TRẠNG THÁI DỰ ÁN (PROJECT STATE)

**Mục đích file:** Lưu trữ toàn bộ ngữ cảnh, tiến độ và cấu trúc dự án để AI đọc và tiếp tục làm việc vào ngày mai mà không cần giải thích lại từ đầu.
**Ngày cập nhật cuối:** (Phiên làm việc Giai đoạn 1 - User Management)

---

## 🏗️ 1. KIẾN TRÚC DỰ ÁN (ARCHITECTURE)
Dự án được xây dựng theo chuẩn **Clean Architecture (4 Layers)**:
1. **`CarRental.Domain` (Core - Không phụ thuộc ai):** Chứa các Entity (User, Car, Booking...) sinh ra từ Database-First và các Enums (`UserRole`).
2. **`CarRental.Application` (Business Logic - Phụ thuộc Domain):** Chứa các DTOs, Interfaces, và Services. Giao tiếp với Database thông qua Interface (Dependency Inversion), KHÔNG gọi trực tiếp thư viện hạ tầng.
3. **`CarRental.Infrastructure` (Data Access - Phụ thuộc Application & Domain):** Chứa `CarRentalDbContext` (cài đặt Npgsql) và thực thi (implement) các Interface của Application.
4. **`CarRental.API` (Presentation - Phụ thuộc Application & Infrastructure):** Chứa Controllers, Swagger, Program.cs (nơi thiết lập cấu hình và Dependency Injection).

---

## ✅ 2. TIẾN ĐỘ ĐÃ HOÀN THÀNH (WHAT'S DONE)

### 👤 Module 1: Auth & User Management (Đang thực hiện)
**Giai đoạn 1: Đăng ký (Register) & Mã hóa mật khẩu (Hashing)**
*   [x] **Thiết kế Database:** ERD chuẩn, có Constraint chặt chẽ, Partial Index cho Booking trùng lịch, Enum roles.
*   [x] **Sửa lỗi Kiến trúc (Circular Dependency):** Đã gỡ bỏ tham chiếu sai từ Application sang Infrastructure.
*   [x] **Domain Layer:** Đã tạo `UserRole` Enum (`Admin`, `Owner`, `Customer`) để dùng cho C#.
*   [x] **Application Layer:** 
    * Cài đặt thành công thư viện `BCrypt.Net-Next` để hash mật khẩu.
    * Tạo `IApplicationDbContext` (đóng vai trò là "Lò nướng" giao tiếp với DB).
    * Tạo `RegisterRequest` DTO (có DataAnnotations kiểm tra Email, Password).
    * Viết xong `UserService` (kế thừa `IUserService`) thực thi logic kiểm tra email trùng, hash mật khẩu bằng BCrypt và lưu xuống Db thông qua Interface.
*   [x] **Infrastructure Layer:** Đã ép `CarRentalDbContext` kế thừa và thực thi `IApplicationDbContext`. Đã xóa lỗi `private partial` method.
*   [x] **API Layer (`Program.cs`):** Đã đăng ký thành công Dependency Injection (DI) cho:
    * `CarRentalDbContext` (kết nối PostgreSQL).
    * `IApplicationDbContext` (Dùng `GetRequiredService` để tránh tạo 2 instance).
    * `IUserService` -> `UserService`.

DỰ ÁN HIỆN ĐANG BUILD THÀNH CÔNG 100% (0 Lỗi).

---

## 🚀 3. CÔNG VIỆC TIẾP THEO (TODO FOR NEXT SESSION)

Ngày mai, khi bắt đầu, hãy yêu cầu AI **đọc file này** và chuyển ngay sang **Giai đoạn 2 của Auth**:

*   **Bước 1:** Tạo `AuthController` trong project API. Mở API Endpoint `POST /api/auth/register` gọi đến `UserService.RegisterAsync`.
*   **Bước 2:** Chạy thử Swagger để Test thực tế việc lưu User vào PostgreSQL.
*   **Bước 3:** Viết hàm `LoginAsync` trong `UserService`.
*   **Bước 4:** Cấu hình JWT (JSON Web Token) trong `Program.cs` và phát hành Token khi người dùng Login thành công.

---
*Ghi chú cho AI vào ngày mai: Tôi đã nắm rất rõ nguyên lý Clean Architecture và Dependency Injection. Hãy hướng dẫn tôi đi thẳng vào việc tạo Controller và JWT Token.*
