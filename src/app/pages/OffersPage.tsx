import { useState } from 'react';
import { Link } from 'react-router';
import { ArrowRight, Clock, Tag, Percent, Star } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const bundles = [
  {
    id: 'b1',
    name: 'Living Room Starter Bundle',
    items: ['Nordic Lux Sofa', 'Pacific Coffee Table', 'Velvet Ottoman', 'Nordic Decor Bundle'],
    original: 4226,
    price: 3199,
    savings: 1027,
    image: 'https://images.unsplash.com/photo-1672927936377-97d1be3976cd?w=800&q=80',
    badge: 'Most Popular',
    color: '#2a4743',
  },
  {
    id: 'b2',
    name: 'Bedroom Luxury Suite',
    items: ['Timber King Bed', 'Marble Side Table ×2', 'Nordic Decor Bundle'],
    original: 3197,
    price: 2499,
    savings: 698,
    image: 'https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=800&q=80',
    badge: 'Best Value',
    color: '#8c7a62',
  },
  {
    id: 'b3',
    name: 'Home Office Pro Bundle',
    items: ['Executive Pro Desk', 'Zen Bookshelf', 'Cloud Armchair'],
    original: 2697,
    price: 1999,
    savings: 698,
    image: 'https://images.unsplash.com/photo-1765366417030-16d9765d920a?w=800&q=80',
    badge: 'New Bundle',
    color: '#2a4743',
  },
  {
    id: 'b4',
    name: 'Dining Room Complete Set',
    items: ['Osaka Dining Table', 'Scandy Dining Chair ×6'],
    original: 5193,
    price: 3999,
    savings: 1194,
    image: 'https://images.unsplash.com/photo-1758977403826-01e2c8a3f68f?w=800&q=80',
    badge: 'Limited Offer',
    color: '#8c7a62',
  },
];

const saleProducts = products.filter(p => p.isSale || p.originalPrice);

export function OffersPage() {
  const { addItem } = useCart();
  const [addedId, setAddedId] = useState<number | null>(null);

  const handleAdd = (product: typeof products[0]) => {
    addItem(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  const countdown = { days: 3, hours: 14, mins: 22, secs: 47 };

  return (
    <div className="w-full overflow-x-hidden" style={{ backgroundColor: '#f8f4f0', minHeight: '100vh' }}>

      {/* HERO */}
      <div className="relative overflow-hidden w-full" style={{ minHeight: '400px' }}>
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1760611656148-063d3b9a8dbc?w=1400&q=80"
          alt="Seasonal Sale"
          className="w-full h-full object-cover absolute inset-0"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#2a4743]/90 to-[#2a4743]/60" />

        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 sm:px-6 py-16 sm:py-24">

          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6">
            <Percent size={14} style={{ color: '#cbb89d' }} />
            <span className="text-[10px] sm:text-xs tracking-widest uppercase text-white">
              Spring Sale 2026
            </span>
          </div>

          <h1
            className="text-white mb-4"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.6rem, 5vw, 4rem)',
              fontWeight: 400,
              lineHeight: 1.2
            }}
          >
            Up to 25% Off<br />Premium Furniture
          </h1>

          <p className="text-white/70 mb-8 max-w-md text-sm leading-relaxed px-2">
            Our biggest sale of the year is here. Discover extraordinary savings on handcrafted furniture and curated bundles.
          </p>

          {/* COUNTDOWN FIX */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8">
            {[
              { value: countdown.days, label: 'Days' },
              { value: countdown.hours, label: 'Hours' },
              { value: countdown.mins, label: 'Mins' },
              { value: countdown.secs, label: 'Secs' },
            ].map(({ value, label }) => (
              <div
                key={label}
                className="bg-white/10 backdrop-blur rounded-xl px-3 py-3 text-center min-w-[60px]"
              >
                <p
                  className="text-xl sm:text-2xl text-white"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {String(value).padStart(2, '0')}
                </p>
                <p className="text-[10px] sm:text-xs text-white/60 uppercase tracking-widest">
                  {label}
                </p>
              </div>
            ))}
          </div>

          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-white text-sm transition hover:opacity-90"
            style={{ backgroundColor: '#8c7a62' }}
          >
            Shop Sale Now <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* CONTENT WRAPPER FIX */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">

        {/* GRID FIX */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          {[
            { icon: Tag, title: 'Up to 25% Off', desc: 'Selected sofas, chairs, and bedroom furniture.', bg: '#2a4743' },
            { icon: Clock, title: 'Limited Time Only', desc: "Sale ends in 3 days.", bg: '#8c7a62' },
            { icon: Percent, title: 'Bundle & Save More', desc: 'Save extra 10% on bundles.', bg: '#2a4743' },
          ].map(({ icon: Icon, title, desc, bg }) => (
            <div key={title} className="rounded-2xl p-5 sm:p-6 text-white" style={{ backgroundColor: bg }}>
              <Icon size={24} className="mb-3 opacity-80" />
              <h3 className="mb-1 text-base font-semibold">{title}</h3>
              <p className="text-white/70 text-sm">{desc}</p>
            </div>
          ))}
        </div>

        {/* PRODUCTS GRID FIX */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-16">
          {saleProducts.map(product => (
            <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all group w-full">

              <div className="relative overflow-hidden h-[200px] sm:h-[220px]">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="p-4 sm:p-5">
                <h3 className="mb-2 text-sm sm:text-base font-medium text-[#2a4743]">
                  {product.name}
                </h3>

                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-semibold text-[#2a4743]">
                    ${product.price.toLocaleString()}
                  </span>

                  <button
                    onClick={() => handleAdd(product)}
                    className="px-3 py-2 rounded-full text-xs text-white w-full sm:w-auto"
                    style={{ backgroundColor: addedId === product.id ? '#8c7a62' : '#2a4743' }}
                  >
                    {addedId === product.id ? 'Added ✓' : 'Add to Cart'}
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* BUNDLES + NEWSLETTER نفس الفكرة (responsive fix) */}
        <div className="mt-16 rounded-3xl p-6 sm:p-10 text-center w-full" style={{ backgroundColor: '#2a4743' }}>
          <h2 className="text-white mb-4 text-lg sm:text-2xl">
            Get Exclusive Offers by Email
          </h2>

          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto w-full">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-full bg-white/10 border border-white/20 text-white text-sm"
            />
            <button
              className="w-full sm:w-auto px-6 py-3 rounded-full text-white text-sm"
              style={{ backgroundColor: '#8c7a62' }}
            >
              Subscribe
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}