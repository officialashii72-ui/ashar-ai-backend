import React from 'react';
import { motion } from 'framer-motion';
import { Check, BrainCircuit, Target, MessageSquareText } from 'lucide-react';

const ServicesPage: React.FC = () => {
    const services = [
        {
            title: 'AI Workflow Automation',
            price: 'Starting at ₹25,000',
            description: 'End-to-end automation of your business processes.',
            features: [
                'Custom n8n Workflow Design',
                'API Integrations (Slack, CRM, etc.)',
                'Error Handling & Monitoring',
                '1 Month Support Included',
            ],
            icon: <BrainCircuit size={40} />,
            recommended: false,
        },
        {
            title: 'AI-Powered Lead System',
            price: '₹50,000 Setup + ₹15k/mo',
            description: 'A complete system to generate and qualify leads on autopilot.',
            features: [
                'Automated LinkedIn Outreach',
                'Email Sequence Setup',
                'Lead Scoring AI Agent',
                'CRM Sync & Notification',
                'Weekly Performance Reports',
            ],
            icon: <Target size={40} />,
            recommended: true,
        },
        {
            title: 'Content Engine Setup',
            price: '₹35,000 One-time',
            description: 'Scale your content production without hiring more writers.',
            features: [
                'Blog Post Generation Pipeline',
                'Social Media Snippets Generator',
                'Voice Cloning for Audio/Video',
                'SEO Optimization Built-in',
            ],
            icon: <MessageSquareText size={40} />,
            recommended: false,
        },
    ];

    return (
        <div className="container mx-auto px-6 py-12">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold mb-4">Professional AI Services</h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    I don't just write code; I build business assets. Choose a package that fits your growth goals.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {services.map((service, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`rounded-2xl p-8 border ${service.recommended
                                ? 'border-indigo-600 shadow-xl bg-white relative overflow-hidden'
                                : 'border-gray-200 shadow-sm bg-white hover:shadow-lg transition-shadow'
                            }`}
                    >
                        {service.recommended && (
                            <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-bold px-4 py-1 rounded-bl-lg">
                                RECOMMENDED
                            </div>
                        )}

                        <div className={`mb-6 ${service.recommended ? 'text-indigo-600' : 'text-gray-600'}`}>
                            {service.icon}
                        </div>

                        <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                        <p className="text-gray-500 text-sm mb-6 min-h-[40px]">{service.description}</p>

                        <div className="mb-8">
                            <span className="text-2xl font-bold text-gray-900">{service.price}</span>
                        </div>

                        <ul className="space-y-4 mb-8">
                            {service.features.map((feature, i) => (
                                <li key={i} className="flex items-start text-sm text-gray-600">
                                    <Check size={16} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <button
                            className={`w-full py-3 rounded-lg font-medium transition-colors ${service.recommended
                                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                                    : 'bg-white border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50'
                                }`}
                        >
                            Get Started
                        </button>
                    </motion.div>
                ))}
            </div>

            <div className="mt-20 bg-gray-900 rounded-2xl p-12 text-center text-white">
                <h2 className="text-3xl font-bold mb-4">Need a Custom Solution?</h2>
                <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                    Have a unique problem that needs solving? Let's hop on a call and design a system tailored to your specific needs.
                </p>
                <a
                    href="https://calendly.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-8 py-4 bg-white text-gray-900 font-bold rounded-lg hover:bg-gray-100 transition-colors"
                >
                    Book Discovery Call
                </a>
            </div>
        </div>
    );
};

export default ServicesPage;
