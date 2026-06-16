import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
    const UserSession = localStorage.getItem('user');

    if (!UserSession) {
        alert('Bạn cần phải đăng nhập');
        return <Navigate to='/auth' replace />
    }
    const user = JSON.parse(UserSession);
    if (allowedRoles && !allowedRoles.includes(user.role)) {
        alert('Bạn không có quyền truy cập');
        return <Navigate to='/' replace />
    }
    return <>{children}</>;

};
export default ProtectedRoute;