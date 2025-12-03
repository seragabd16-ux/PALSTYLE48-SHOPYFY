
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { KufiyaPattern } from './components/KufiyaPattern';
import { ParticleBackground } from './components/ParticleBackground';
import { Home } from './pages/Home';
import { ProductDetails } from './pages/ProductDetails';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { MenuOverlay } from './components/MenuOverlay';
import { CartDrawer } from './components/CartDrawer';
import { CategoryPage } from './pages/CategoryPage';
import { LoadingScreen } from './components/LoadingScreen';
import { CustomPrintPage } from './pages/CustomPrintPage';
import { SpecialDesignsPage } from './pages/SpecialDesignsPage';
import { AboutPage } from './pages/AboutPage';
import { ShippingPage } from './pages/ShippingPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { Footer } from './components/Footer';
import { useStore } from './store/useStore';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { isDarkMode } = useStore();

  // Simulate System Boot
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  // Sync Theme Class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <>
      {isLoading && <LoadingScreen />}
      <Router>
        <div className={`min-h-screen font-sans selection:bg-red-500 selection:text-white transition-colors duration-700 ease-in-out ${isDarkMode ? 'bg-black text-white' : 'bg-neutral-50 text-black'}`}>
          <KufiyaPattern />
          <ParticleBackground />
          <Navbar />
          <MenuOverlay />
          <CartDrawer />
          
          <main className="relative z-10">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/category/:category" element={<CategoryPage />} />
              <Route path="/handmade" element={<CategoryPage forcedCategory="Handmade" />} />
              <Route path="/custom-print" element={<CustomPrintPage />} />
              <Route path="/special-designs" element={<SpecialDesignsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/shipping" element={<ShippingPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
            </Routes>
          </main>
          
          <Footer />
        </div>
      </Router>
    </>
  );
};

export default App;
