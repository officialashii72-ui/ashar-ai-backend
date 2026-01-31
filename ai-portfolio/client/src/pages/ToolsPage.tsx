import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Youtube, Send, Loader2, Copy, Check } from 'lucide-react';

const ToolsPage: React.FC = () => {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [copied, setCopied] = useState(false);

    const handleGenerate = (e: React.FormEvent) => {
        e.preventDefault();
        if (!url) return;

        setLoading(true);
        setResult(null);

        // Mock API call
        setTimeout(() => {
            setLoading(false);
            setResult({
                twitter: "🚀 Just discovered how to automate my workflow with AI! \n\nHere are 3 takeaways:\n1. Use n8n for logic\n2. Integrate with OpenAI\n3. Save 10+ hours/week\n\n#AI #Automation #Productivity",
                linkedin: "I've been experimenting with AI automation lately, and the results are incredible.\n\nBy connecting disparate tools like Slack and Trello using custom scripts, I've managed to eliminate manual data entry entirely.\n\nHere's how you can do it too...",
                instagram: "💡 Work Smarter, Not Harder\n\nSwipe to see how I saved 20 hours this week using AI tools. 🤖✨\n\nLink in bio for the full breakdown! 🔗",
            });
        }, 2000);
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="container mx-auto px-6 py-12">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold mb-4">AI Tools Showcase</h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Explore the power of AI with these interactive demos. These are simplified versions of the complex systems I build for clients.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
                {/* Content Repurposer Demo */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
                >
                    <div className="bg-indigo-600 p-6 text-white">
                        <h2 className="text-2xl font-bold flex items-center gap-3">
                            <Youtube /> Content Repurposer
                        </h2>
                        <p className="text-indigo-100 mt-2">Turn any YouTube video into social media posts instantly.</p>
                    </div>

                    <div className="p-8">
                        <form onSubmit={handleGenerate} className="mb-8">
                            <label className="block text-sm font-medium text-gray-700 mb-2">YouTube Video URL</label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="https://youtube.com/watch?v=..."
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    className="flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                />
                                <button
                                    type="submit"
                                    disabled={loading || !url}
                                    className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    {loading ? <Loader2 className="animate-spin" /> : <Send size={20} />}
                                </button>
                            </div>
                        </form>

                        {loading && (
                            <div className="text-center py-12">
                                <Loader2 className="animate-spin text-indigo-600 mx-auto mb-4" size={32} />
                                <p className="text-gray-500"> analyzing video transcript...</p>
                                <p className="text-gray-400 text-sm">generating social posts...</p>
                            </div>
                        )}

                        {result && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="space-y-6"
                            >
                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-xs font-bold text-blue-400 uppercase tracking-wide">Twitter Thread</span>
                                        <button onClick={() => copyToClipboard(result.twitter)} className="text-gray-400 hover:text-gray-600">
                                            {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                                        </button>
                                    </div>
                                    <p className="text-sm text-gray-700 whitespace-pre-wrap font-sans">{result.twitter}</p>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-xs font-bold text-blue-700 uppercase tracking-wide">LinkedIn Post</span>
                                        <button onClick={() => copyToClipboard(result.linkedin)} className="text-gray-400 hover:text-gray-600">
                                            <Copy size={16} />
                                        </button>
                                    </div>
                                    <p className="text-sm text-gray-700 whitespace-pre-wrap font-sans">{result.linkedin}</p>
                                </div>
                            </motion.div>
                        )}

                        {!loading && !result && (
                            <div className="bg-gray-50 rounded-lg p-8 text-center text-gray-400 border border-dashed border-gray-300">
                                <p>Enter a YouTube URL above to see the magic happen.</p>
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Other Tools Placeholders */}
                <div className="space-y-8">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-shadow"
                    >
                        <h3 className="text-xl font-bold mb-2">LinkedIn Lead Generator</h3>
                        <p className="text-gray-600 mb-4">Input a company name and get tailored outreach messages.</p>
                        <button disabled className="px-4 py-2 bg-gray-100 text-gray-400 rounded-lg font-medium cursor-not-allowed w-full">Coming Soon</button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white rounded-xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-shadow"
                    >
                        <h3 className="text-xl font-bold mb-2">AI Workflow Audit</h3>
                        <p className="text-gray-600 mb-4">Get a free automated analysis of your current business processes.</p>
                        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors w-full">Book Audit</button>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ToolsPage;
