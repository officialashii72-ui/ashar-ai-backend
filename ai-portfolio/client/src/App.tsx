import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import ToolsPage from './pages/ToolsPage';
import ServicesPage from './pages/ServicesPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminRoute from './components/AdminRoute';
import AdminProjectsPage from './pages/AdminProjectsPage';
import AdminProjectEditPage from './pages/AdminProjectEditPage';
import AdminServicesPage from './pages/AdminServicesPage';
import AdminServiceEditPage from './pages/AdminServiceEditPage';
import AdminBlogPage from './pages/AdminBlogPage';
import AdminBlogEditPage from './pages/AdminBlogEditPage';
import AdminMessagesPage from './pages/AdminMessagesPage';

import CaseStudiesPage from './pages/CaseStudiesPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';

const ProcessPage = () => <div className="p-20 text-center text-2xl">Process (Coming Soon)</div>;

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
        <Route path="/tools" element={<MainLayout><ToolsPage /></MainLayout>} />
        <Route path="/services" element={<MainLayout><ServicesPage /></MainLayout>} />
        <Route path="/case-studies" element={<MainLayout><CaseStudiesPage /></MainLayout>} />
        <Route path="/process" element={<MainLayout><ProcessPage /></MainLayout>} />
        <Route path="/blog" element={<MainLayout><BlogPage /></MainLayout>} />
        <Route path="/contact" element={<MainLayout><ContactPage /></MainLayout>} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route element={<AdminRoute />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/projects" element={<AdminProjectsPage />} />
          <Route path="/admin/projects/:id/edit" element={<AdminProjectEditPage />} />
          <Route path="/admin/services" element={<AdminServicesPage />} />
          <Route path="/admin/services/:id/edit" element={<AdminServiceEditPage />} />
          <Route path="/admin/blog" element={<AdminBlogPage />} />
          <Route path="/admin/blog/:id/edit" element={<AdminBlogEditPage />} />
          <Route path="/admin/messages" element={<AdminMessagesPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
