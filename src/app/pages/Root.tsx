import { Outlet, useLocation } from 'react-router';
import { useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CartProvider } from '../context/CartContext';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export function Root() {
  return (
    <CartProvider>
      <div style={{ backgroundColor: '#f8f4f0', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
        <ScrollToTop />
        <Navbar />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}
