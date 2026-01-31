const projects = [
    {
        title: 'AI Content Repurposer',
        description: 'An AI tool that repurposes YouTube videos into social media posts.',
        image: '/images/project1.jpg',
        technologies: ['React', 'Node.js', 'OpenAI API', 'MongoDB'],
        category: 'SaaS',
        results: {
            'Hours Saved': '20 hrs/week',
            'Efficiency': '+300%',
        },
        featured: true,
        order: 1,
    },
    {
        title: 'LinkedIn Lead Gen System',
        description: 'Automated LinkedIn outreach system using n8n and AI.',
        image: '/images/project2.jpg',
        technologies: ['n8n', 'LinkedIn API', 'ChatGPT'],
        category: 'Automation',
        results: {
            'Leads Generated': '500+ month',
            'Conversion Rate': '5%',
        },
        featured: true,
        order: 2,
    },
    {
        title: 'Customer Support Bot',
        description: 'AI-powered chatbot for 24/7 customer support.',
        image: '/images/project3.jpg',
        technologies: ['Python', 'LangChain', 'Pinecone'],
        category: 'AI Chatbot',
        results: {
            'Response Time': '< 1 min',
            'Resolution Rate': '80%',
        },
        featured: false,
        order: 3,
    },
];

export default projects;
