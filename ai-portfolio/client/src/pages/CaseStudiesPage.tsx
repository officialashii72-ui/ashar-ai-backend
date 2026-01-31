import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../services/api';

interface Project {
    _id: string;
    title: string;
    description: string;
    image: string;
    category: string;
    technologies: string[];
    results?: any;
}

const CaseStudiesPage: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const { data } = await api.get('/projects');
                setProjects(data);
            } catch (error) {
                console.error('Failed to fetch projects', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    if (loading) {
        return (
            <div className="container mx-auto px-6 py-20 text-center">
                <p className="text-gray-500">Loading case studies...</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-6 py-12">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold mb-4">Case Studies</h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Real-world examples of how AI automation transforms businesses.
                    From saving hours to generating revenue.
                </p>
            </div>

            <div className="space-y-20">
                {projects.map((project, index) => (
                    <motion.div
                        key={project._id}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 items-center`}
                    >
                        <div className="md:w-1/2">
                            <div className="relative rounded-xl overflow-hidden shadow-2xl group">
                                <img
                                    src={project.image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800'}
                                    alt={project.title}
                                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                                    <span className="text-white font-medium flex items-center gap-2">
                                        View Live <ExternalLink size={16} />
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="md:w-1/2">
                            <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm font-medium mb-4">
                                {project.category}
                            </span>
                            <h2 className="text-3xl font-bold mb-4">{project.title}</h2>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                {project.description}
                            </p>

                            <div className="mb-6">
                                <h4 className="font-bold text-gray-900 mb-2">Key Results:</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    {project.results && Object.entries(project.results).map(([key, value]) => (
                                        <div key={key} className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                                            <p className="text-xs text-gray-500 uppercase">{key}</p>
                                            <p className="font-bold text-indigo-600">{String(value)}</p>
                                        </div>
                                    ))}
                                    {!project.results && (
                                        <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                                            <p className="text-xs text-gray-500 uppercase">Efficiency</p>
                                            <p className="font-bold text-indigo-600">Increased</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-8">
                                {project.technologies.map((tech) => (
                                    <span key={tech} className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-md border border-gray-200">
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            <Link
                                to="/contact"
                                state={{ project: project.title }}
                                className="inline-flex items-center text-indigo-600 font-bold hover:text-indigo-700 transition-colors"
                            >
                                Request Similar System <ArrowRight size={20} className="ml-2" />
                            </Link>
                        </div>
                    </motion.div>
                ))}

                {projects.length === 0 && (
                    <div className="text-center py-20 bg-gray-50 rounded-xl">
                        <p className="text-gray-500">No case studies added yet.</p>
                    </div>
                )}
            </div>

            <div className="mt-20 text-center">
                <h2 className="text-2xl font-bold mb-6">Ready to automate your business?</h2>
                <Link
                    to="/contact"
                    className="px-8 py-4 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-500/30 inline-flex items-center justify-center gap-2"
                >
                    Start Your Project <ArrowRight size={20} />
                </Link>
            </div>
        </div>
    );
};

export default CaseStudiesPage;
