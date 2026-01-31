import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Loader2, ArrowLeft } from 'lucide-react';
import api from '../services/api';

interface Service {
    _id: string;
    title: string;
    price: string;
    description: string;
    recommended: boolean;
}

const AdminServicesPage: React.FC = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const { data } = await api.get('/services');
            setServices(data);
        } catch (err) {
            setError('Failed to load services');
        } finally {
            setLoading(false);
        }
    };

    const deleteService = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this service?')) {
            try {
                const user = JSON.parse(localStorage.getItem('user') || '{}');
                const config = {
                    headers: { Authorization: `Bearer ${user.token}` },
                };
                await api.delete(`/services/${id}`, config);
                fetchServices();
            } catch (err) {
                alert('Failed to delete service');
            }
        }
    };

    const createServiceHandler = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            const config = {
                headers: { Authorization: `Bearer ${user.token}` },
            };
            const { data } = await api.post(
                '/services',
                {
                    title: 'New Service',
                    description: 'Service description',
                    price: '₹10,000',
                    features: ['Feature 1', 'Feature 2'],
                    icon: 'Cpu',
                },
                config
            );
            navigate(`/admin/services/${data._id}/edit`);
        } catch (err) {
            alert('Failed to create service');
        }
    };

    if (loading) return <div className="p-10 flex justify-center"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-6xl mx-auto">
                <Link to="/admin/dashboard" className="flex items-center text-gray-500 hover:text-indigo-600 mb-6">
                    <ArrowLeft size={20} className="mr-2" /> Back to Dashboard
                </Link>

                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Services</h1>
                    <button
                        onClick={createServiceHandler}
                        className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                        <Plus size={20} className="mr-2" /> Create Service
                    </button>
                </div>

                {error && <div className="bg-red-100 text-red-700 p-4 rounded mb-6">{error}</div>}

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-semibold">
                            <tr>
                                <th className="px-6 py-4">Title</th>
                                <th className="px-6 py-4">Price</th>
                                <th className="px-6 py-4">Recommended</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {services.map((service) => (
                                <tr key={service._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">{service.title}</td>
                                    <td className="px-6 py-4 text-gray-500">{service.price}</td>
                                    <td className="px-6 py-4 text-gray-500">
                                        {service.recommended ? <span className="text-green-600 font-bold">Yes</span> : 'No'}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Link
                                            to={`/admin/services/${service._id}/edit`}
                                            className="inline-block p-2 text-blue-600 hover:bg-blue-50 rounded-full mr-2"
                                        >
                                            <Edit size={18} />
                                        </Link>
                                        <button
                                            onClick={() => deleteService(service._id)}
                                            className="inline-block p-2 text-red-600 hover:bg-red-50 rounded-full"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminServicesPage;
