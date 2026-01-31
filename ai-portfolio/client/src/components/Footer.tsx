import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter, Mail, MapPin, ChevronRight } from 'lucide-react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-50 pt-16 pb-8 border-t border-gray-100">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-1">
                        <Link to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-sky-500 mb-4 block">
                            Ashar.AI
                        </Link>
                        <p className="text-gray-500 text-sm leading-relaxed mb-6">
                            Building intelligent business systems that save time and generate revenue. Helping businesses scale with AI automation.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="p-2 bg-white rounded-full text-gray-500 hover:text-indigo-600 shadow-sm hover:shadow-md transition-all">
                                <Github size={18} />
                            </a>
                            <a href="#" className="p-2 bg-white rounded-full text-gray-500 hover:text-indigo-600 shadow-sm hover:shadow-md transition-all">
                                <Linkedin size={18} />
                            </a>
                            <a href="#" className="p-2 bg-white rounded-full text-gray-500 hover:text-indigo-600 shadow-sm hover:shadow-md transition-all">
                                <Twitter size={18} />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-gray-900 mb-6">Services</h4>
                        <ul className="space-y-3 text-sm text-gray-500">
                            <li><Link to="/services" className="hover:text-indigo-600 transition-colors">AI Workflow Automation</Link></li>
                            <li><Link to="/services" className="hover:text-indigo-600 transition-colors">Lead Generation Systems</Link></li>
                            <li><Link to="/services" className="hover:text-indigo-600 transition-colors">Content Repurposing Engines</Link></li>
                            <li><Link to="/services" className="hover:text-indigo-600 transition-colors">Chatbot Development</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-gray-900 mb-6">Company</h4>
                        <ul className="space-y-3 text-sm text-gray-500">
                            <li><Link to="/about" className="hover:text-indigo-600 transition-colors">About Me</Link></li>
                            <li><Link to="/case-studies" className="hover:text-indigo-600 transition-colors">Case Studies</Link></li>
                            <li><Link to="/blog" className="hover:text-indigo-600 transition-colors">Blog</Link></li>
                            <li><Link to="/contact" className="hover:text-indigo-600 transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-gray-900 mb-6">Contact</h4>
                        <ul className="space-y-4 text-sm text-gray-500">
                            <li className="flex items-start space-x-3">
                                <Mail size={18} className="text-indigo-600 mt-0.5" />
                                <span>hello@ashar.ai</span>
                            </li>
                            <li className="flex items-start space-x-3">
                                <MapPin size={18} className="text-indigo-600 mt-0.5" />
                                <span>Pakistan (Remote Worldwide)</span>
                            </li>
                        </ul>
                        <div className="mt-6">
                            <h5 className="font-medium text-gray-900 mb-2">Newsletter</h5>
                            <div className="flex">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-l-lg focus:outline-none focus:border-indigo-500 text-sm"
                                />
                                <button className="px-4 py-2 bg-indigo-600 text-white rounded-r-lg hover:bg-indigo-700 transition-colors">
                                    <ChevronRight size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
                    <p>© {new Date().getFullYear()} Ashar Iftikhar. All rights reserved.</p>
                    <div className="mt-4 md:mt-0">
                        <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full font-medium text-xs">
                            Day 45 of 270 (Goal: ₹1 Crore)
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

// ChevronRight was missing in import, adding it here in code or use arrow right.
// Wait, I imported ChevronRight in Navbar but not Footer.
// I used it in Newsletter button. I need to update import.
// Let's assume Lucide imports are flexible.
// Actually I'll update the import line in the content above.
export default Footer;
