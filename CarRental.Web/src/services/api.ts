const API_BASE_URL = import.meta.env.VITE_API_URL;

export interface RegisterRequest {
    email: string;
    password?: string;
    fullName: string;
    phoneNumber?: string;
}

export interface userInfo {
    id: number;
    email: string;
    fullName: string;
    role: string;
}


export interface LoginResponse {
    email: string;
    password?: string;
}