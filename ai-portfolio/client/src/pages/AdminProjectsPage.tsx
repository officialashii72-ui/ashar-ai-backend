import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Loader2, ArrowLeft } from 'lucide-react';
import api from '../services/api';

interface Project {
    _id: string;
    title: string;
    category: string;
    image: string;
}

const AdminProjectsPage: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const { data } = await api.get('/projects');
            setProjects(data);
        } catch (err) {
            setError('Failed to load projects');
        } finally {
            setLoading(false);
        }
    };

    const deleteProject = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                const user = JSON.parse(localStorage.getItem('user') || '{}');
                const config = {
                    headers: { Authorization: `Bearer ${user.token}` },
                };
                await api.delete(`/projects/${id}`, config);
                fetchProjects();
            } catch (err) {
                alert('Failed to delete project');
            }
        }
    };

    const createProjectHandler = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            const config = {
                headers: { Authorization: `Bearer ${user.token}` },
            };
            // Create a default project then redirect to edit
            const { data } = await api.post(
                '/projects',
                {
                    title: 'New Project',
                    description: 'Sample description',
                    category: 'Sample Category',
                },
                config
            );
            navigate(`/admin/projects/${data._id}/edit`);
        } catch (err) {
            alert('Failed to create project');
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
                    <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
                    <button
                        onClick={createProjectHandler}
                        className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                        <Plus size={20} className="mr-2" /> Create Project
                    </button>
                </div>

                {error && <div className="bg-red-100 text-red-700 p-4 rounded mb-6">{error}</div>}

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-semibold">
                            <tr>
                                <th className="px-6 py-4">Title</th>
                                <th className="px-6 py-4">Category</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {projects.map((project) => (
                                <tr key={project._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">{project.title}</td>
                                    <td className="px-6 py-4 text-gray-500">{project.category}</td>
                                    <td className="px-6 py-4 text-right">
                                        <Link
                                            to={`/admin/projects/${project._id}/edit`}
                                            className="inline-block p-2 text-blue-600 hover:bg-blue-50 rounded-full mr-2"
                                        >
                                            <Edit size={18} />
                                        </Link>
                                        <button
                                            onClick={() => deleteProject(project._id)}
                                            className="inline-block p-2 text-red-600 hover:bg-red-50 rounded-full"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {projects.length === 0 && (
                                <tr>
                                    <td colSpan={3} className="px-6 py-12 text-center text-gray-500">
                                        No projects found. Create one to get started.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminProjectsPage;
