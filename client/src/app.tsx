import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { LanguageProvider } from './utils/i18n/i18n';

import PublicLayout from './components/PublicLayout';
import AdminLayout from './components/AdminLayout';
import HomePage from './pages/Home/HomePage';
import ProductsPage from './pages/Products/ProductsPage';
import ProductDetailPage from './pages/ProductDetail/ProductDetailPage';
import AboutPage from './pages/About/AboutPage';
import ContactPage from './pages/Contact/ContactPage';
import FAQPage from './pages/FAQ/FAQPage';
import AdminLoginPage from './pages/admin/Login/AdminLoginPage';
import AdminDashboardPage from './pages/admin/Dashboard/AdminDashboardPage';
import AdminInquiriesPage from './pages/admin/Inquiries/AdminInquiriesPage';
import AdminMarketingPage from './pages/admin/Marketing/AdminMarketingPage';
import AdminAnalyticsPage from './pages/admin/Analytics/AdminAnalyticsPage';
import AdminProductsPage from './pages/admin/Products/AdminProductsPage';
import AdminSettingsPage from './pages/admin/Settings/AdminSettingsPage';
import NotFound from './pages/NotFound/NotFound';

const RoutesComponent = () => {
  return (
    <LanguageProvider>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/:id" element={<ProductDetailPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="faq" element={<FAQPage />} />
        </Route>
        <Route path="admin/login" element={<AdminLoginPage />} />
        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="inquiries" element={<AdminInquiriesPage />} />
          <Route path="marketing" element={<AdminMarketingPage />} />
          <Route path="analytics" element={<AdminAnalyticsPage />} />
          <Route path="products" element={<AdminProductsPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </LanguageProvider>
  );
};

export default RoutesComponent;
