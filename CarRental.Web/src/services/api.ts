const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://car-rental-system-krpq.onrender.com/api';

export interface RegisterRequest {
    email: string;
    password?: string;
    fullName: string;
    phoneNumber?: string;
}

export interface UserInfo {
    id: string;
    email: string;
    fullName: string;
    role: string;
}

export interface LoginRequest {
    email: string;
    password?: string;
}
export interface LoginResponse {
    token: string;
    expiresAt: string;
    user: UserInfo;
}

// 2. Viết hàm fetchOptions ở ĐÂY (ngay bên dưới các interface)
const fetchOptions = (method: string, body?: any) => {
    const options: RequestInit = {
        method,
        headers: {
            'Content-Type': 'application/json', // báo cho be bt dữ liệu gủi lên là JSON
        },
        credentials: 'include',  // BẮT BUỘC: Cho phép nhận và gửi Cookie (Refresh Token)
    };
    const token = localStorage.getItem('token');
    if (token && options.headers) {
        (options.headers as any)['Authorization'] = `Bearer ${token}`;
    }

    if (body) {
        options.body = JSON.stringify(body);

    }
    return options;
};


// 3. Viết đối tượng thực thi API (authApi) ở cuối cùng
export const authApi = {
    register: async (data: RegisterRequest) => {
        const response = await fetch(`${API_BASE_URL}/auth/register`, fetchOptions('POST', data));
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Đăng ký thất bại');
        }
        return response.json();
    },

    login: async (data: LoginRequest): Promise<LoginResponse> => {
        const response = await fetch(`${API_BASE_URL}/auth/login`, fetchOptions('POST', data));
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Email hoặc mật khẩu không chính xác');
        }
        return response.json();
    },
    logout: async () => {
        const response = await fetch(`${API_BASE_URL}/auth/logout`, fetchOptions('POST'));
        if (!response.ok) {
            throw new Error('Đăng xuất thất bại');
        }
        return response.json();
    },
    refreshToken: async (): Promise<{ token: string; expiresAt: string }> => {
        const response = await fetch(`${API_BASE_URL}/auth/refresh`, fetchOptions('POST'));
        if (!response.ok) {
            throw new Error('Không thể làm mới token');
        }
        return response.json()
    }

};

export const fetchWithAuth = async (url: string, options: RequestInit = {}): Promise<any> => {
    // 1. Chuẩn bị các cấu hình gửi đi (đính kèm header Authorization: Bearer và cookie credentials)
    const requestOptions = fetchOptions(options.method || 'GET', options.body ? JSON.parse(options.body as string) : undefined);
    // 2. Gửi request lên Backend lần đầu tiên
    let response = await fetch(url, requestOptions);

    // 3. NẾU BACKEND TRẢ VỀ LỖI 401 (Access Token đã hết hạn)
    if (response.status === 401) {
        console.warn('Access Token đã bị hết han!, Tiến hành tự động refesh token ...');
        try {
            const refreshResponse = await authApi.refreshToken();

            localStorage.setItem('token', refreshResponse.token);

            const retryOptions = fetchOptions(options.method || 'GET', options.body ? JSON.parse(options.body as string) : undefined);

            response = await fetch(url, retryOptions);
            console.log('Gia hạn token và thủ lại request thành công!');


        } catch (refreshError) {
            console.error('Phiên đăng nhập đã hết hạn hoàn toàn , hãy đăng nhập lại ');
            localStorage.removeItem('token');
            localStorage.removeItem('user');

            window.location.href = '/auth';
            throw new Error('Phiên đăng nhập hết hạn, hãy đăng nhập lại');
        }
    }
    // 4. Nếu là lỗi 403 (Không có quyền), chúng ta cũng xử lý tương tự
    if (response.status === 403) {
        console.warn('Bạn không có quyền truy cập tính năng này.');
        window.location.href = '/forbidden'; // Chuyển sang trang 403
        throw new Error('Không có quyền truy cập tài nguyên này.');
    }

    // 5. Xử lý các lỗi 4xx, 5xx khác không do 401/403
    if (!response.ok) {
        try {
            const errorData = await response.json();
            throw new Error(errorData.message || `Lỗi ${response.status}`);
        } catch {
            throw new Error(`Lỗi HTTP: ${response.status}`);
        }
    }

    // 6. Trả về kết quả thành công
    return response.json();


};

