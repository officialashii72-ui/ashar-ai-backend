import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'AI Tools', path: '/tools' },
        { name: 'Services', path: '/services' },
        { name: 'Case Studies', path: '/case-studies' },
        { name: 'Process', path: '/process' },
        { name: 'Blog', path: '/blog' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-md py-4' : 'bg-transparent py-6'
                }`}
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-sky-500">
                    Ashar.AI
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-8 items-center">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`text-sm font-medium transition-colors hover:text-indigo-600 ${location.pathname === link.path ? 'text-indigo-600' : 'text-gray-600'
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <a
                        href="https://calendly.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-full hover:bg-indigo-700 transition-all transform hover:scale-105 shadow-lg shadow-indigo-200"
                    >
                        Book Free Audit
                    </a>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-gray-600 focus:outline-none"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
                    >
                        <div className="flex flex-col p-6 space-y-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className="text-gray-600 font-medium hover:text-indigo-600 block"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <a
                                href="https://calendly.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block text-center w-full py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700"
                            >
                                Book Free Audit
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
