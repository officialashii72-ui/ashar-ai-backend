import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import authService from '../services/authService';

const AdminRoute: React.FC = () => {
    const user = authService.getCurrentUser();

    // Simple check for admin role, in real app verify token expiry/validity
    if (user && user.role === 'admin') {
        return <Outlet />;
    } else {
        return <Navigate to="/admin/login" />;
    }
};

export default AdminRoute;
