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
    }
};
