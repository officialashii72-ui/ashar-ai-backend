import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, Loader2, Upload } from 'lucide-react';
import api from '../services/api';

const AdminProjectEditPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [technologies, setTechnologies] = useState('');
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (id) {
            fetchProject();
        }
    }, [id]);

    const fetchProject = async () => {
        try {
            const { data } = await api.get(`/projects/${id}`);
            setTitle(data.title);
            setDescription(data.description);
            setImage(data.image);
            setCategory(data.category);
            setTechnologies(data.technologies.join(', '));
        } catch (error) {
            console.error(error);
        }
    };

    const uploadFileHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);
        setUploading(true);

        try {
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await api.post('/upload', formData, config);
            setImage(data);
            setUploading(false);
        } catch (error) {
            console.error(error);
            setUploading(false);
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
                `/projects/${id}`,
                {
                    title,
                    description,
                    image,
                    category,
                    technologies: technologies.split(',').map((t) => t.trim()),
                },
                config
            );
            navigate('/admin/projects');
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-3xl mx-auto">
                <Link to="/admin/projects" className="flex items-center text-gray-500 hover:text-indigo-600 mb-6">
                    <ArrowLeft size={20} className="mr-2" /> Back to Projects
                </Link>

                <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Project</h1>

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
                            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                            <input
                                type="text"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                required
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
                            <div className="flex items-center space-x-4">
                                <input
                                    type="text"
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                    className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                />
                                <label className="cursor-pointer bg-gray-50 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors flex items-center">
                                    <Upload size={18} className="mr-2" /> Upload
                                    <input type="file" className="hidden" onChange={uploadFileHandler} />
                                </label>
                            </div>
                            {uploading && <p className="text-sm text-indigo-600 mt-2">Uploading...</p>}
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Technologies (comma separated)</label>
                            <input
                                type="text"
                                value={technologies}
                                onChange={(e) => setTechnologies(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            />
                        </div>

                        <div className="mb-8">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={6}
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

export default AdminProjectEditPage;
