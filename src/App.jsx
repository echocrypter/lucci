import React from 'react';
import { CartProvider, useCart } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartDrawer from './components/CartDrawer';
import SalonBookingModal from './components/SalonBookingModal';
import QuickViewModal from './components/QuickViewModal';
import SearchModal from './components/SearchModal';
import RunwayModal from './components/RunwayModal';
import Toast from './components/Toast';

function AppContent() {
  const { activePage } = useCart();

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface">
      <Header />
      
      <div className="flex-1">
        {activePage === 'home' ? <HomePage /> : <ProductDetailPage />}
      </div>

      <Footer />

      {/* Global Interactive Modals & Drawers */}
      <CartDrawer />
      <SalonBookingModal />
      <QuickViewModal />
      <SearchModal />
      <RunwayModal />
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
