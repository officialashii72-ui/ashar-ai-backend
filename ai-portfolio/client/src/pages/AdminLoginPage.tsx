import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail } from 'lucide-react';
import authService from '../services/authService';

const AdminLoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await authService.login(email, password);
            navigate('/admin/dashboard');
        } catch (err: any) {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Admin Login</h2>
                {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                        <div className="relative">
                            <span className="absolute left-3 top-3 text-gray-400">
                                <Mail size={18} />
                            </span>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="pl-10 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                                placeholder="admin@example.com"
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                        <div className="relative">
                            <span className="absolute left-3 top-3 text-gray-400">
                                <Lock size={18} />
                            </span>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="pl-10 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                                placeholder="********"
                                required
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded hover:bg-indigo-700 transition-colors"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLoginPage;
