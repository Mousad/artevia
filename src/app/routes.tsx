import { createBrowserRouter } from 'react-router';
import { Root } from './pages/Root';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { OffersPage } from './pages/OffersPage';
import { BookVisitPage } from './pages/BookVisitPage';
import { ContactPage } from './pages/ContactPage';

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center" style={{ backgroundColor: '#f8f4f0' }}>
      <p className="text-6xl mb-4">🛋️</p>
      <h1
        style={{ color: '#2a4743', fontFamily: "'Playfair Display', serif", fontWeight: 400 }}
      >
        Page Not Found
      </h1>
      <p className="text-gray-500 mt-2 text-sm">This page doesn't exist.</p>
      <a
        href="/"
        className="mt-6 px-8 py-3 rounded-full text-white text-sm"
        style={{ backgroundColor: '#2a4743' }}
      >
        Go Home
      </a>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: HomePage },
      { path: 'shop', Component: ShopPage },
      { path: 'shop/:id', Component: ProductDetailPage },
      { path: 'cart', Component: CartPage },
      { path: 'projects', Component: ProjectsPage },
      { path: 'offers', Component: OffersPage },
      { path: 'book-visit', Component: BookVisitPage },
      { path: 'contact', Component: ContactPage },
      { path: '*', Component: NotFound },
    ],
  },
]);
