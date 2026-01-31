import api from './api';

const login = async (email: string, password: string) => {
    const response = await api.post('/admin/login', { email, password });
    if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

const logout = () => {
    localStorage.removeItem('user');
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user') || 'null');
};

const authService = {
    login,
    logout,
    getCurrentUser,
};

export default authService;
