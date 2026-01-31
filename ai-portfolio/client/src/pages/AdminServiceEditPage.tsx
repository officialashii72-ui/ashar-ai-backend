import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, Loader2 } from 'lucide-react';
import api from '../services/api';

const AdminServiceEditPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [features, setFeatures] = useState('');
    const [icon, setIcon] = useState('Cpu');
    const [recommended, setRecommended] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (id) {
            fetchService();
        }
    }, [id]);

    const fetchService = async () => {
        try {
            const { data } = await api.get(`/services/${id}`);
            setTitle(data.title);
            setDescription(data.description);
            setPrice(data.price);
            setFeatures(data.features.join(', '));
            setIcon(data.icon);
            setRecommended(data.recommended);
        } catch (error) {
            console.error(error);
        }
    };

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            await api.put(
                `/services/${id}`,
                {
                    title,
                    description,
                    price,
                    features: features.split(',').map((f) => f.trim()),
                    icon,
                    recommended
                },
                config
            );
            navigate('/admin/services');
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-3xl mx-auto">
                <Link to="/admin/services" className="flex items-center text-gray-500 hover:text-indigo-600 mb-6">
                    <ArrowLeft size={20} className="mr-2" /> Back to Services
                </Link>

                <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Service</h1>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                    <form onSubmit={submitHandler}>
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                required
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                            <input
                                type="text"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                required
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Validation Icon (Lucide Name)</label>
                            <input
                                type="text"
                                value={icon}
                                onChange={(e) => setIcon(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            />
                            <p className="text-xs text-gray-500 mt-1">e.g., Cpu, Database, Target, etc.</p>
                        </div>

                        <div className="mb-6">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={recommended}
                                    onChange={(e) => setRecommended(e.target.checked)}
                                    className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500 border-gray-300 mr-2"
                                />
                                <span className="text-gray-700 font-medium">Recommended Service</span>
                            </label>
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Features (comma separated)</label>
                            <textarea
                                value={features}
                                onChange={(e) => setFeatures(e.target.value)}
                                rows={3}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            ></textarea>
                        </div>

                        <div className="mb-8">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={4}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                required
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors flex justify-center items-center font-bold"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : <><Save size={20} className="mr-2" /> Save Changes</>}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminServiceEditPage;
