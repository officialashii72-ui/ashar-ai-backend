import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Code, Cpu, Database, Layout, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
    const [stats, setStats] = useState({ tools: 0, hours: 0, months: 0 });

    useEffect(() => {
        // Simulate counting animation
        const interval = setInterval(() => {
            setStats((prev) => ({
                tools: prev.tools < 15 ? prev.tools + 1 : 15,
                hours: prev.hours < 120 ? prev.hours + 5 : 120,
                months: prev.months < 9 ? prev.months + 1 : 9,
            }));
        }, 50);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="overflow-hidden">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
                {/* Abstract Background Shapes */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                    <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-[100px]" />
                    <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-sky-500/10 blur-[100px]" />
                </div>

                <div className="container mx-auto px-6 z-10 relative">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="md:w-1/2">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <span className="inline-block py-1 px-3 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-medium mb-6">
                                    Available for new projects
                                </span>
                                <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
                                    I Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-sky-500">AI Business Systems</span> That Generate Revenue
                                </h1>
                                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                                    Transforming manual workflows into intelligent, automated engines.
                                    My goal is to reach ₹1 Crore in 9 months by building high-value AI solutions.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4 mb-12">
                                    <a
                                        href="https://calendly.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-8 py-4 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-500/30 flex items-center justify-center gap-2"
                                    >
                                        Book Free AI Audit <ArrowRight size={20} />
                                    </a>
                                    <Link
                                        to="/tools"
                                        className="px-8 py-4 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all flex items-center justify-center"
                                    >
                                        View Interactive Demos
                                    </Link>
                                </div>

                                <div className="flex gap-8 border-t border-gray-100 pt-8">
                                    <div>
                                        <h3 className="text-3xl font-bold text-gray-900">{stats.tools}+</h3>
                                        <p className="text-sm text-gray-500">AI Tools Built</p>
                                    </div>
                                    <div>
                                        <h3 className="text-3xl font-bold text-gray-900">{stats.hours}+</h3>
                                        <p className="text-sm text-gray-500">Hours Saved/Wk</p>
                                    </div>
                                    <div>
                                        <h3 className="text-3xl font-bold text-gray-900">{stats.months}</h3>
                                        <p className="text-sm text-gray-500">Months to Goal</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        <div className="md:w-1/2 relative">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="relative z-10"
                            >
                                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-100 bg-white p-2">
                                    <img
                                        src="https://images.unsplash.com/photo-1555421689-492a83526950?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                        alt="Ashar Iftikhar - AI Developer"
                                        className="rounded-xl w-full object-cover h-[500px]"
                                    />

                                    {/* Floating Tags */}
                                    <motion.div
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.5 }}
                                        className="absolute top-8 left-[-20px] bg-white p-3 rounded-lg shadow-lg flex items-center gap-3 border border-gray-100"
                                    >
                                        <div className="p-2 bg-green-100 rounded-md text-green-600">
                                            <Database size={20} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">Specialized In</p>
                                            <p className="font-bold text-sm text-gray-900">n8n Automation</p>
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        initial={{ x: 20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.7 }}
                                        className="absolute bottom-12 right-[-20px] bg-white p-3 rounded-lg shadow-lg flex items-center gap-3 border border-gray-100"
                                    >
                                        <div className="p-2 bg-blue-100 rounded-md text-blue-600">
                                            <Code size={20} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">Expertise</p>
                                            <p className="font-bold text-sm text-gray-900">API Integration</p>
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Preview */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">How I Can Help You</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            I specialize in building custom AI solutions that solve real business problems.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 mb-6">
                                <Cpu size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">AI Workflow Automation</h3>
                            <p className="text-gray-600 mb-6">
                                Automate repetitive tasks like data entry, email processing, and lead qualification using n8n and customized AI agents.
                            </p>
                            <ul className="space-y-2 mb-6 text-sm text-gray-500">
                                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> Save 20+ hours/week</li>
                                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> Reduce human error</li>
                            </ul>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center text-sky-600 mb-6">
                                <Target size={24} /> {/* Target not imported, check imports */}
                            </div>
                            <h3 className="text-xl font-bold mb-3">Lead Generation Systems</h3>
                            <p className="text-gray-600 mb-6">
                                Build automated prospecting engines that find, qualify, and reach out to your ideal clients on autopilot.
                            </p>
                            <ul className="space-y-2 mb-6 text-sm text-gray-500">
                                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> Consistent lead flow</li>
                                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> Personalized outreach</li>
                            </ul>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600 mb-6">
                                <Layout size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Content Engines</h3>
                            <p className="text-gray-600 mb-6">
                                Turn one piece of content into blog posts, social media updates, and newsletters automatically.
                            </p>
                            <ul className="space-y-2 mb-6 text-sm text-gray-500">
                                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> Scale content output</li>
                                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> Multichannel presence</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
