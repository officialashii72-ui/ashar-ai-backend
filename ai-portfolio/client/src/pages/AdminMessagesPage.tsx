import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Loader2, Trash2, Mail, CheckCircle } from 'lucide-react';
import api from '../services/api';

interface ContactMessage {
    _id: string;
    name: string;
    email: string;
    message: string;
    isRead: boolean;
    createdAt: string;
}

const AdminMessagesPage: React.FC = () => {
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            const config = {
                headers: { Authorization: `Bearer ${user.token}` },
            };
            const { data } = await api.get('/contact', config);
            setMessages(data);
        } catch (err) {
            setError('Failed to load messages');
        } finally {
            setLoading(false);
        }
    };

    const deleteMessage = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this message?')) {
            try {
                const user = JSON.parse(localStorage.getItem('user') || '{}');
                const config = {
                    headers: { Authorization: `Bearer ${user.token}` },
                };
                await api.delete(`/contact/${id}`, config);
                fetchMessages();
            } catch (err) {
                alert('Failed to delete message');
            }
        }
    };

    const markAsRead = async (id: string) => {
        try {
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            const config = {
                headers: { Authorization: `Bearer ${user.token}` },
            };
            await api.put(`/contact/${id}/read`, {}, config);
            fetchMessages();
        } catch (err) {
            alert('Failed to update message');
        }
    };

    if (loading) return <div className="p-10 flex justify-center"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto">
                <Link to="/admin/dashboard" className="flex items-center text-gray-500 hover:text-indigo-600 mb-6">
                    <ArrowLeft size={20} className="mr-2" /> Back to Dashboard
                </Link>

                <h1 className="text-3xl font-bold text-gray-900 mb-8">Messages</h1>

                {error && <div className="bg-red-100 text-red-700 p-4 rounded mb-6">{error}</div>}

                <div className="space-y-4">
                    {messages.map((msg) => (
                        <div
                            key={msg._id}
                            className={`bg-white p-6 rounded-xl shadow-sm border ${msg.isRead ? 'border-gray-200' : 'border-indigo-200 bg-indigo-50'} transition-colors`}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-full ${msg.isRead ? 'bg-gray-100 text-gray-500' : 'bg-indigo-100 text-indigo-600'}`}>
                                        <Mail size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">{msg.name}</h3>
                                        <p className="text-sm text-gray-500">{msg.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-gray-400 mr-2">
                                        {new Date(msg.createdAt).toLocaleString()}
                                    </span>
                                    {!msg.isRead && (
                                        <button
                                            onClick={() => markAsRead(msg._id)}
                                            title="Mark as Read"
                                            className="p-2 text-indigo-600 hover:bg-indigo-100 rounded-full"
                                        >
                                            <CheckCircle size={18} />
                                        </button>
                                    )}
                                    <button
                                        onClick={() => deleteMessage(msg._id)}
                                        title="Delete"
                                        className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                            <p className="text-gray-700 whitespace-pre-wrap">{msg.message}</p>
                        </div>
                    ))}

                    {messages.length === 0 && (
                        <div className="bg-white p-12 text-center rounded-xl border border-gray-200 text-gray-500">
                            No messages found.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminMessagesPage;
