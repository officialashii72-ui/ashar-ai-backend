import React from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import authService from '../services/authService';
import { BarChart, Users, FileText, Settings, LogOut } from 'lucide-react';

const AdminDashboard: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const user = authService.getCurrentUser();

    const handleLogout = () => {
        authService.logout();
        navigate('/admin/login');
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-indigo-900 text-white">
                <div className="p-6">
                    <h1 className="text-2xl font-bold">Admin Panel</h1>
                    <p className="text-indigo-300 text-sm">Welcome, {user?.name}</p>
                </div>
                <nav className="mt-6">
                    <Link to="/admin/dashboard" className={`flex items-center px-6 py-3 ${location.pathname === '/admin/dashboard' ? 'bg-indigo-800 text-white' : 'text-indigo-300 hover:bg-indigo-800 hover:text-white'} transition-colors`}>
                        <BarChart size={20} className="mr-3" />
                        Dashboard
                    </Link>
                    <Link to="/admin/projects" className={`flex items-center px-6 py-3 ${location.pathname.includes('/admin/projects') ? 'bg-indigo-800 text-white' : 'text-indigo-300 hover:bg-indigo-800 hover:text-white'} transition-colors`}>
                        <FileText size={20} className="mr-3" />
                        Projects
                    </Link>
                    <a href="#" className="flex items-center px-6 py-3 text-indigo-300 hover:bg-indigo-800 hover:text-white transition-colors">
                        <Users size={20} className="mr-3" />
                        Messages
                    </a>
                    <a href="#" className="flex items-center px-6 py-3 text-indigo-300 hover:bg-indigo-800 hover:text-white transition-colors">
                        <Settings size={20} className="mr-3" />
                        Settings
                    </a>
                </nav>
                <div className="absolute bottom-0 w-64 p-6">
                    <button
                        onClick={handleLogout}
                        className="flex items-center text-indigo-300 hover:text-white transition-colors w-full"
                    >
                        <LogOut size={20} className="mr-3" />
                        Logout
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                <header className="bg-white shadow-sm p-6">
                    <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
                </header>

                <main className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                            <h3 className="text-gray-500 text-sm font-medium mb-2">Total Visitors</h3>
                            <p className="text-3xl font-bold text-gray-900">1,234</p>
                            <span className="text-green-500 text-sm font-medium flex items-center mt-2">
                                ↑ 12% from last month
                            </span>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                            <h3 className="text-gray-500 text-sm font-medium mb-2">Active Projects</h3>
                            <p className="text-3xl font-bold text-gray-900">8</p>
                            <span className="text-gray-400 text-sm font-medium flex items-center mt-2">
                                3 in progress
                            </span>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                            <h3 className="text-gray-500 text-sm font-medium mb-2">New Messages</h3>
                            <p className="text-3xl font-bold text-gray-900">12</p>
                            <span className="text-indigo-500 text-sm font-medium flex items-center mt-2">
                                5 unread
                            </span>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                        <h3 className="font-bold text-gray-800 mb-4">Recent Activity</h3>
                        <p className="text-gray-500">No recent activity.</p>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
