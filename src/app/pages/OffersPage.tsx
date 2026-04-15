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

  // Countdown timer (mock)
  const countdown = { days: 3, hours: 14, mins: 22, secs: 47 };

  return (
    <div style={{ backgroundColor: '#f8f4f0', minHeight: '100vh' }}>
      {/* Hero Banner */}
      <div className="relative overflow-hidden" style={{ minHeight: '400px' }}>
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1760611656148-063d3b9a8dbc?w=1400&q=80"
          alt="Seasonal Sale"
          className="w-full h-full object-cover absolute inset-0"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, rgba(42,71,67,0.95) 0%, rgba(42,71,67,0.65) 100%)' }}
        />
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6">
            <Percent size={14} style={{ color: '#cbb89d' }} />
            <span className="text-xs tracking-widest uppercase text-white">Spring Sale 2026</span>
          </div>
          <h1
            className="text-white mb-4"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 400 }}
          >
            Up to 25% Off<br />Premium Furniture
          </h1>
          <p className="text-white/70 mb-8 max-w-md text-sm leading-relaxed">
            Our biggest sale of the year is here. Discover extraordinary savings on handcrafted furniture and curated bundles — for a limited time only.
          </p>

          {/* Countdown */}
          <div className="flex gap-4 mb-8">
            {[
              { value: countdown.days, label: 'Days' },
              { value: countdown.hours, label: 'Hours' },
              { value: countdown.mins, label: 'Mins' },
              { value: countdown.secs, label: 'Secs' },
            ].map(({ value, label }) => (
              <div key={label} className="bg-white/10 backdrop-blur rounded-xl px-4 py-3 text-center min-w-[60px]">
                <p
                  className="text-2xl text-white mb-0.5"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {String(value).padStart(2, '0')}
                </p>
                <p className="text-xs text-white/60 uppercase tracking-widest">{label}</p>
              </div>
            ))}
          </div>

          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white text-sm hover:opacity-90 transition"
            style={{ backgroundColor: '#8c7a62' }}
          >
            Shop Sale Now <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Promo Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          {[
            {
              icon: Tag,
              title: 'Up to 25% Off',
              desc: 'Selected sofas, chairs, and bedroom furniture.',
              bg: '#2a4743',
            },
            {
              icon: Clock,
              title: 'Limited Time Only',
              desc: 'Sale ends in 3 days. Don\'t miss exclusive pricing.',
              bg: '#8c7a62',
            },
            {
              icon: Percent,
              title: 'Bundle & Save More',
              desc: 'Save an extra 10% when you buy 3+ items together.',
              bg: '#2a4743',
            },
          ].map(({ icon: Icon, title, desc, bg }) => (
            <div key={title} className="rounded-2xl p-6 text-white" style={{ backgroundColor: bg }}>
              <Icon size={24} className="mb-3 opacity-80" />
              <h3 className="mb-1 text-base text-white" style={{ fontWeight: 600 }}>{title}</h3>
              <p className="text-white/70 text-sm">{desc}</p>
            </div>
          ))}
        </div>

        {/* Sale Products */}
        <div className="mb-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs uppercase tracking-widest mb-2" style={{ color: '#8c7a62' }}>
                On Sale Now
              </p>
              <h2
                className="text-3xl"
                style={{ color: '#2a4743', fontFamily: "'Playfair Display', serif", fontWeight: 400 }}
              >
                Discounted Products
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {saleProducts.map(product => (
              <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all group">
                <div className="relative overflow-hidden" style={{ height: '220px' }}>
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Discount badge */}
                  {product.discount && (
                    <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-white text-sm font-bold bg-red-500">
                      -{product.discount}%
                    </div>
                  )}
                  <div
                    className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full text-white text-xs"
                    style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                  >
                    <Clock size={10} className="inline mr-1" />
                    Limited time
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-xs uppercase tracking-widest mb-1" style={{ color: '#8c7a62' }}>
                    {product.category}
                  </p>
                  <h3 className="mb-2" style={{ color: '#2a4743', fontWeight: 500 }}>
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1.5 mb-3">
                    {[1, 2, 3, 4, 5].map(i => (
                      <Star key={i} size={11} className={i <= Math.floor(product.rating) ? 'fill-[#8c7a62] text-[#8c7a62]' : 'fill-gray-200 text-gray-200'} />
                    ))}
                    <span className="text-xs text-gray-400 ml-1">({product.reviews})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xl font-semibold" style={{ color: '#2a4743' }}>
                        ${product.price.toLocaleString()}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-400 line-through ml-2">
                          ${product.originalPrice.toLocaleString()}
                        </span>
                      )}
                      {product.originalPrice && (
                        <p className="text-xs text-green-600">
                          You save ${(product.originalPrice - product.price).toLocaleString()}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => handleAdd(product)}
                      className="px-4 py-2 rounded-full text-xs text-white transition-all hover:opacity-80"
                      style={{ backgroundColor: addedId === product.id ? '#8c7a62' : '#2a4743' }}
                    >
                      {addedId === product.id ? 'Added ✓' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bundles */}
        <div>
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest mb-2" style={{ color: '#8c7a62' }}>
              Greater Savings
            </p>
            <h2
              className="text-3xl"
              style={{ color: '#2a4743', fontFamily: "'Playfair Display', serif", fontWeight: 400 }}
            >
              Furniture Bundles
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bundles.map(bundle => (
              <div key={bundle.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all group">
                <div className="relative overflow-hidden" style={{ height: '240px' }}>
                  <ImageWithFallback
                    src={bundle.image}
                    alt={bundle.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 rounded-full text-xs text-white" style={{ backgroundColor: bundle.color }}>
                      {bundle.badge}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <p
                      className="text-3xl text-white"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      ${bundle.price.toLocaleString()}
                    </p>
                    <p className="text-sm text-white/60 line-through">${bundle.original.toLocaleString()}</p>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <span className="px-3 py-1.5 rounded-full text-white text-xs bg-red-500 font-bold">
                      Save ${bundle.savings.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="mb-3" style={{ color: '#2a4743', fontFamily: "'Playfair Display', serif", fontSize: '1.1rem' }}>
                    {bundle.name}
                  </h3>
                  <p className="text-xs uppercase tracking-widest mb-2" style={{ color: '#8c7a62' }}>
                    Included Items
                  </p>
                  <ul className="space-y-1 mb-4">
                    {bundle.items.map(item => (
                      <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="w-1 h-1 rounded-full bg-[#cbb89d]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/contact"
                    className="w-full block text-center py-3 rounded-xl text-sm text-white transition hover:opacity-90"
                    style={{ backgroundColor: bundle.color }}
                  >
                    Enquire About Bundle
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter CTA */}
        <div className="mt-16 rounded-3xl p-10 md:p-14 text-center" style={{ backgroundColor: '#2a4743' }}>
          <p className="text-xs tracking-[0.35em] uppercase mb-3" style={{ color: '#cbb89d' }}>
            Never Miss a Deal
          </p>
          <h2
            className="text-white mb-4"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.75rem', fontWeight: 400 }}
          >
            Get Exclusive Offers by Email
          </h2>
          <p className="text-white/60 mb-6 text-sm">
            Join 12,000+ subscribers who receive early access to our sales and exclusive member discounts.
          </p>
          <div className="flex max-w-md mx-auto gap-3">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-5 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 text-sm outline-none focus:border-[#cbb89d] transition-colors"
            />
            <button
              className="px-6 py-3 rounded-full text-white text-sm whitespace-nowrap"
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
