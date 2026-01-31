import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../services/api';

interface BlogPost {
    _id: string;
    title: string;
    excerpt: string;
    category: string;
    featuredImage: string;
    author: string;
    createdAt: string;
    slug: string;
}

const BlogPage: React.FC = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const { data } = await api.get('/blog');
                setPosts(data);
            } catch (error) {
                console.error('Failed to fetch blog posts', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    return (
        <div className="container mx-auto px-6 py-12">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold mb-4">Insights & Tutorials</h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Learn how to leverage AI and automation for your business.
                    Technical guides, strategies, and industry updates.
                </p>
            </div>

            {/* Search Bar - Visual only for now */}
            <div className="max-w-xl mx-auto mb-16 relative">
                <input
                    type="text"
                    placeholder="Search articles..."
                    className="w-full px-6 py-4 rounded-full border border-gray-200 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none pl-12"
                />
                <Search className="absolute left-4 top-4 text-gray-400" size={20} />
            </div>

            {loading ? (
                <div className="text-center py-20">
                    <p className="text-gray-500">Loading articles...</p>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post, index) => (
                        <motion.article
                            key={post._id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all group"
                        >
                            <div className="h-48 overflow-hidden">
                                <img
                                    src={post.featuredImage || 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&q=80&w=800'}
                                    alt={post.title}
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-6">
                                <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                                    <span className="px-2 py-1 bg-indigo-50 text-indigo-600 rounded-md font-medium">
                                        {post.category}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Calendar size={14} /> {new Date(post.createdAt).toLocaleDateString()}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold mb-3 group-hover:text-indigo-600 transition-colors">
                                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                                </h3>

                                <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                                    {post.excerpt}
                                </p>

                                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <User size={16} /> {post.author}
                                    </div>
                                    <Link to={`/blog/${post.slug}`} className="text-indigo-600 hover:text-indigo-700">
                                        <ArrowRight size={20} />
                                    </Link>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>
            )}

            {!loading && posts.length === 0 && (
                <div className="text-center py-20 bg-gray-50 rounded-xl">
                    <p className="text-gray-500">No interesting articles found yet. Check back soon!</p>
                </div>
            )}

            {/* Newsletter Signup */}
            <div className="mt-24 bg-indigo-900 rounded-2xl p-12 text-center text-white relative overflow-hidden">
                <div className="relative z-10 max-w-2xl mx-auto">
                    <h2 className="text-3xl font-bold mb-4">Join 5,000+ AI Enthusiasts</h2>
                    <p className="text-indigo-200 mb-8">
                        Get weekly tips on automation, n8n workflows, and AI agents delivered straight to your inbox.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-grow px-6 py-4 rounded-lg text-gray-900 focus:outline-none"
                        />
                        <button className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-500 transition-colors">
                            Subscribe Free
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogPage;
