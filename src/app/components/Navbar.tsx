import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Shop', path: '/shop' },
  { label: 'Projects', path: '/projects' },
  { label: 'Offers', path: '/offers' },
  { label: 'Contact', path: '/contact' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { totalItems } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-sm'
        }`}
      >
        {/* Top bar */}
        <div
          style={{ backgroundColor: '#2a4743' }}
          className="text-white text-center py-2 px-4 text-xs tracking-widest uppercase"
        >
          Free Delivery on Orders Over $500
        </div>

        {/* MAIN NAV */}
        <div className="max-w-7xl mx-auto px-2 py-4 flex items-center justify-between relative">

          {/* 🛒 MOBILE CART (LEFT) */}
          <button
            onClick={() => navigate('/cart')}
            className="md:hidden relative p-2"
          >
            <ShoppingCart size={20} style={{ color: '#2a4743' }} />
            {totalItems > 0 && (
              <span
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-white text-xs flex items-center justify-center"
                style={{ backgroundColor: '#8c7a62' }}
              >
                {totalItems}
              </span>
            )}
          </button>

          {/* 🏷️ LOGO CENTER (MOBILE) */}
          <Link
            to="/"
            className="absolute left-1/2 transform -translate-x-1/2 md:static md:translate-x-0"
          >
            <div
              className="text-xl tracking-[0.12em] uppercase"
              style={{
                color: '#2a4743',
                fontFamily: "'Playfair Display', serif",
                fontWeight: 600,
              }}
            >
              artevia 
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`text-sm tracking-wide transition-colors duration-200 hover:text-[#8c7a62] ${
                    location.pathname === link.path
                      ? 'text-[#2a4743] font-semibold border-b-2 border-[#8c7a62] pb-0.5'
                      : 'text-gray-600'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-4">

            {/* DESKTOP CART */}
            <button
              onClick={() => navigate('/cart')}
              className="hidden md:block relative p-2 rounded-full hover:bg-[#f8f4f0] transition-colors"
            >
              <ShoppingCart size={20} style={{ color: '#2a4743' }} />
              {totalItems > 0 && (
                <span
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-white text-xs flex items-center justify-center"
                  style={{ backgroundColor: '#8c8e6d' }}
                >
                  {totalItems}
                </span>
              )}
            </button>

            {/* BOOK VISIT */}
            <Link
              to="/book-visit"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm text-white transition-all duration-300 hover:opacity-90 hover:shadow-md"
              style={{ backgroundColor: '#2a4743' }}
            >
              Book a Visit
            </Link>

            {/* MENU BUTTON */}
            <button
              className="md:hidden p-2 rounded-full hover:bg-[#f8f4f0] transition-colors"
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={22} style={{ color: '#2a4743' }} />
            </button>
          </div>
        </div>
      </nav>

      {/* 📱 FULL SCREEN MOBILE MENU */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-[#f8f4f0] flex flex-col">

          {/* HEADER */}
          <div className="flex justify-between items-center px-6 py-5 border-b border-gray-200">
            <div
              className="text-xl uppercase"
              style={{
                color: '#2a4743',
                fontFamily: "'Playfair Display', serif",
              }}
            >
              artevia
            </div>

            <button onClick={() => setMobileOpen(false)}>
              <X size={24} style={{ color: '#2a4743' }} />
            </button>
          </div>

          {/* LINKS */}
          <div className="flex-1 flex flex-col justify-center items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className="text-2xl tracking-wide text-[#2a4743] hover:text-[#8c8e6d] transition"
              >
                {link.label}
              </Link>
            ))}

            <Link
              to="/book-visit"
              onClick={() => setMobileOpen(false)}
              className="mt-8 px-8 py-3 rounded-full text-white"
              style={{ backgroundColor: '#2a4743' }}
            >
              Book a Visit
            </Link>
          </div>
        </div>
      )}

      {/* spacer */}
      <div className="h-[104px]" />
    </>
  );
}