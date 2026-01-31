import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send, Loader2, CheckCircle } from 'lucide-react';
import api from '../services/api';

const ContactPage: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await api.post('/contact', formData);
            setSuccess(true);
            setFormData({ name: '', email: '', message: '' });
        } catch (err) {
            setError('Failed to send message. Please try again or email directly.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-6 py-12">
            <div className="grid md:grid-cols-2 gap-16">
                <div>
                    <h1 className="text-4xl font-bold mb-6">Let's Build Something Intelligent</h1>
                    <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                        Ready to automate your workflow or build a custom AI solution?
                        Fill out the form or book a call directly on my calendar.
                    </p>

                    <div className="space-y-6 mb-12">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
                                <Mail size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900">Email Me</h3>
                                <p className="text-gray-600">hello@ashar.ai</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900">Location</h3>
                                <p className="text-gray-600">Pakistan (Remote Worldwide)</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
                                <Phone size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900">Discovery Call</h3>
                                <a href="#" className="text-indigo-600 hover:underline">Schedule 15-min Chat</a>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-8 rounded-xl border border-gray-100">
                        <h3 className="font-bold text-gray-900 mb-4">Typical Response Time</h3>
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                            <div className="bg-green-500 h-2 rounded-full w-[15%]"></div>
                        </div>
                        <p className="text-sm text-gray-500">Usually responds within 2-4 hours</p>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                    <h2 className="text-2xl font-bold mb-6">Send a Message</h2>

                    {success ? (
                        <div className="bg-green-50 text-green-700 p-8 rounded-xl text-center border border-green-100">
                            <CheckCircle size={48} className="mx-auto mb-4 text-green-500" />
                            <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                            <p>Thanks for reaching out. I'll get back to you shortly.</p>
                            <button
                                onClick={() => setSuccess(false)}
                                className="mt-6 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium"
                            >
                                Send Another
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">{error}</div>}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none focus:border-transparent transition-all"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none focus:border-transparent transition-all"
                                    placeholder="john@company.com"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={5}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none focus:border-transparent transition-all"
                                    placeholder="Tell me about your project..."
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? <Loader2 className="animate-spin mr-2" /> : <Send size={20} className="mr-2" />}
                                Send Message
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
