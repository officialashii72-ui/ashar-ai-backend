import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
            <Navbar />
            <main className="flex-grow pt-20">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;
