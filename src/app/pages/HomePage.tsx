import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import {
  ArrowRight, Star, Truck, Wrench, Shield, ChevronLeft, ChevronRight,
  Quote, Play
} from 'lucide-react';
import { products, categories } from '../data/products';
import { useCart } from '../context/CartContext';
import { ShoppingCart } from "lucide-react";

const HERO_IMG = 'https://images.unsplash.com/photo-1672927936377-97d1be3976cd?w=1800&q=90';

const testimonials = [
  {
    name: 'Sophia Laurent',
    role: 'Interior Designer',
    text: 'MODA transformed our client\'s apartment into something truly spectacular. The quality of the Nordic Lux Sofa is unmatched — every stitch, every grain of wood speaks to serious craftsmanship.',
    rating: 5,
    avatar: 'SL',
  },
  {
    name: 'James Whitmore',
    role: 'Architect, New York',
    text: 'I\'ve worked with dozens of furniture brands across projects. MODA consistently delivers pieces that feel premium, last forever, and make clients genuinely excited about their spaces.',
    rating: 5,
    avatar: 'JW',
  },
  {
    name: 'Amara Osei',
    role: 'Homeowner',
    text: 'Ordered the Osaka Dining Table and it arrived perfectly packaged, beautifully finished. The installation team was professional and the whole experience felt like true luxury service.',
    rating: 5,
    avatar: 'AO',
  },
];

const projectShowcase = [
  {
    title: 'Williamsburg Loft',
    tag: 'Living Room',
    before: 'https://images.unsplash.com/photo-1666704369274-83898c9309ef?w=700&q=80',
    after: 'https://images.unsplash.com/photo-1775505082483-85fda71273d0?w=700&q=80',
    desc: 'A complete open-plan transformation featuring the Nordic Lux Sofa, Osaka Dining Table, and Pacific Coffee Table.',
  },
  {
    title: 'Upper East Penthouse',
    tag: 'Master Bedroom',
    before: 'https://images.unsplash.com/photo-1774716926071-fc03e73d0806?w=700&q=80',
    after: 'https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=700&q=80',
    desc: 'Transforming a bare bedroom into a serene luxury retreat with the Timber King Bed and Marble Side Tables.',
  },
  {
    title: 'SoHo Creative Studio',
    tag: 'Home Office',
    before: 'https://images.unsplash.com/photo-1759238136818-7b00ec9e782a?w=700&q=80',
    after: 'https://images.unsplash.com/photo-1760611656148-063d3b9a8dbc?w=700&q=80',
    desc: 'A bespoke office solution with the Executive Pro Desk and Zen Bookshelf creating an inspiring workspace.',
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star
          key={i}
          size={12}
          className={i <= rating ? 'fill-[#8c7a62] text-[#8c7a62]' : 'text-gray-300'}
        />
      ))}
    </div>
  );
}

function ProductCard({ product }: { product: (typeof products)[0] }) {
  const { addItem } = useCart();
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer">
      <div
        className="relative overflow-hidden"
        style={{ height: '120px' }}
        onClick={() => navigate(`/shop/${product.id}`)}
      >
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
         
          {product.isNew && (
            <span className="px-2.5 py-1 rounded-full text-xs text-white" style={{ backgroundColor: '#8c7a62' }}>
              New
            </span>
          )}
          {product.isSale && product.discount && (
            <span className="px-2.2 py-1 rounded-full text-xs text-white bg-red-500">
              -{product.discount}%
            </span>
          )}
        </div>
      </div>
      <div className="p-5">
       
        <h3
          className="text-base text-xs mb-1 hover:text-[#8c7a62] transition-colors"
          style={{ color: '#2a4743', fontWeight: 500 }}
          onClick={() => navigate(`/shop/${product.id}`)}
        >
          {product.name}
        </h3>
       
        <div className="flex items-center text-xs gap-7 justify-between">
          <div>
            <span className="text-base font-semibold" style={{ color: '#2a4743' }}>
  ${product.price.toLocaleString()}
</span>
           
          </div>
          <button
  onClick={(e) => { e.stopPropagation(); addItem(product); }}
  className="px-2 py-2 rounded-full text-white transition-all hover:opacity-80 hover:shadow-md flex items-center justify-center"
  style={{ backgroundColor: '#2a4743' }}
>
  <ShoppingCart size={16} />
</button>
        </div>
      </div>
    </div>
  );
}

export function HomePage() {
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const navigate = useNavigate();

  const featuredProducts = products.filter(p => p.featured);
  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 3);

  const nextTestimonial = () => setTestimonialIdx(i => (i + 1) % testimonials.length);
  const prevTestimonial = () => setTestimonialIdx(i => (i - 1 + testimonials.length) % testimonials.length);

  return (
    <div style={{ backgroundColor: '#f8f4f0' }}>
      {/* ─── HERO ─── */}
      <section
        className="relative flex items-center justify-center"
        style={{ height: '92vh', minHeight: '500px' }}
      >
        <div className="absolute inset-0">
          <ImageWithFallback
            src={HERO_IMG}
            alt="Luxury living room"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-2xl">
            <p className="text-[#cbb89d] text-sm tracking-[0.3em] uppercase mb-4">
              Premium Furniture Studio
            </p>
            <h1
              className="text-white mb-6 leading-[1.1]"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                fontWeight: 400,
              }}
            >
              Elegant Furniture for<br />Modern Living Spaces
            </h1>
            <p className="text-white/75 mb-10 leading-relaxed" style={{ fontSize: '1.05rem', maxWidth: '480px' }}>
              Discover handcrafted luxury furniture that transforms every room into a sanctuary of style, comfort, and timeless design.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-full text-white text-sm tracking-wide transition-all hover:opacity-90 hover:shadow-lg hover:gap-3"
                style={{ backgroundColor: '#8c7a62' }}
              >
                Shop Now <ArrowRight size={16} />
              </Link>
              <Link
                to="/book-visit"
                className="inline-flex items-center gap-2 px-6 py-2 rounded-full text-white text-sm tracking-wide border border-white/40 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all"
              >
                Book a  Visit
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div className="w-0.5 h-12 bg-white/30 relative overflow-hidden">
            <div className="w-full bg-white/70 h-4 absolute top-0 animate-bounce" />
          </div>
        </div>
      </section>

      {/* ─── STATS BAR ─── */}
      <div style={{ backgroundColor: '#2a4743' }} className="text-white py-8">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
          
            { value: '12', label: 'Years in Design' },
            { value: '5★', label: 'Average Rating' },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <div
                className="text-3xl mb-1"
                style={{ color: '#cbb89d', fontFamily: "'Playfair Display', serif" }}
              >
                {stat.value}
              </div>
              <div className="text-white/60 text-xs tracking-widest uppercase">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── CATEGORIES ─── */}
      <section className="py-8 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: '#8c7a62' }}>
            Browse By Room
          </p>
          <h2
            className="text-3xl md:text-4xl"
            style={{ color: '#2a4743', fontFamily: "'Playfair Display', serif", fontWeight: 400 }}
          >
            Shop by Category
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map(cat => (
            <Link
              key={cat.name}
              to={`/shop?category=${encodeURIComponent(cat.name)}`}
              className="group relative rounded-2xl overflow-hidden aspect-square cursor-pointer"
              style={{ minHeight: '160px' }}
            >
              <ImageWithFallback
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                <p className="text-sm font-medium">{cat.name}</p>
                <p className="text-xs text-white/60">{cat.count} items</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── FEATURED PRODUCTS ─── */}
      <section className="py-8 px-6" style={{ backgroundColor: 'white' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: '#8c7a62' }}>
                Curated Selection
              </p>
              <h2
                className="text-3xl md:text-4xl"
                style={{ color: '#2a4743', fontFamily: "'Playfair Display', serif", fontWeight: 400 }}
              >
                Featured Products
              </h2>
            </div>
            <Link
              to="/shop"
              className="hidden md:flex items-center gap-2 text-sm hover:gap-3 transition-all"
              style={{ color: '#8c7a62' }}
            >
              View All <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-10 text-center md:hidden">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-white text-sm"
              style={{ backgroundColor: '#2a4743' }}
            >
              View All  <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── BEST SELLERS HIGHLIGHT ─── */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: '#8c7a62' }}>
            Most Loved
          </p>
          <h2
            className="text-3xl md:text-4xl"
            style={{ color: '#2a4743', fontFamily: "'Playfair Display', serif", fontWeight: 400 }}
          >
            Best Sellers
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {bestSellers.map((product, i) => (
            <div
              key={product.id}
              className={`relative rounded-3xl overflow-hidden group cursor-pointer ${i === 0 ? 'md:row-span-2' : ''}`}
              style={{ minHeight: i === 0 ? '480px' : '240px' }}
              onClick={() => navigate(`/shop/${product.id}`)}
            >
              <ImageWithFallback
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 absolute inset-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <p className="text-xs uppercase tracking-widest text-white/60 mb-1">{product.category}</p>
                <h3 className="text-xl mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {product.name}
                </h3>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-lg" style={{ color: '#cbb89d' }}>
                    ${product.price.toLocaleString()}
                  </span>
                  <button
                    className="px-4 py-2 rounded-full text-xs bg-white/20 backdrop-blur-sm hover:bg-white/30 transition text-white border border-white/30"
                    onClick={e => { e.stopPropagation(); navigate(`/shop/${product.id}`); }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── INTERIOR PROJECTS SHOWCASE ─── */}
      <section className="py-20 px-6" style={{ backgroundColor: '#2a4743' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: '#cbb89d' }}>
              Transformations
            </p>
            <h2
              className="text-3xl md:text-4xl text-white"
              style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400 }}
            >
              Before & After Projects
            </h2>
            <p className="text-white/60 mt-3 max-w-lg mx-auto text-sm leading-relaxed">
              See how MODA furniture transforms real homes and offices into breathtaking spaces.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projectShowcase.map((proj, i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden bg-white/5 group cursor-pointer"
                onMouseEnter={() => setActiveProject(i)}
                onMouseLeave={() => setActiveProject(null)}
              >
                <div className="relative overflow-hidden" style={{ height: '240px' }}>
                  <ImageWithFallback
                    src={activeProject === i ? proj.after : proj.before}
                    alt={proj.title}
                    className="w-full h-full object-cover transition-all duration-700"
                  />
                  <div className="absolute top-3 right-3">
                    <span
                      className="px-3 py-1 rounded-full text-xs text-white"
                      style={{ backgroundColor: activeProject === i ? '#8c7a62' : '#2a4743', border: '1px solid rgba(255,255,255,0.3)' }}
                    >
                      {activeProject === i ? 'After ✓' : 'Before →'}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-xs uppercase tracking-widest mb-1" style={{ color: '#cbb89d' }}>
                    {proj.tag}
                  </p>
                  <h3 className="text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {proj.title}
                  </h3>
                  <p className="text-white/55 text-sm leading-relaxed">{proj.desc}</p>
                  <p className="text-xs text-white/40 mt-3">Hover to see transformation →</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm border border-white/30 text-white hover:bg-white/10 transition-all"
            >
              View All Projects <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-20 px-6" style={{ backgroundColor: 'white' }}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: '#8c7a62' }}>
            Client Stories
          </p>
          <h2
            className="text-3xl md:text-4xl mb-12"
            style={{ color: '#2a4743', fontFamily: "'Playfair Display', serif", fontWeight: 400 }}
          >
            What Our Clients Say
          </h2>

          <div className="relative">
            <div className="bg-[#f8f4f0] rounded-3xl p-10 md:p-14">
              <Quote size={36} className="mx-auto mb-6 opacity-20" style={{ color: '#2a4743' }} />
              <p
                className="text-lg md:text-xl leading-relaxed mb-8 text-gray-700"
                style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}
              >
                "{testimonials[testimonialIdx].text}"
              </p>
              <div className="flex items-center justify-center gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white text-sm font-semibold"
                  style={{ backgroundColor: '#2a4743' }}
                >
                  {testimonials[testimonialIdx].avatar}
                </div>
                <div className="text-left">
                  <p className="font-semibold" style={{ color: '#2a4743' }}>
                    {testimonials[testimonialIdx].name}
                  </p>
                  <p className="text-sm" style={{ color: '#8c7a62' }}>
                    {testimonials[testimonialIdx].role}
                  </p>
                </div>
                <div className="ml-4">
                  <StarRating rating={testimonials[testimonialIdx].rating} />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={prevTestimonial}
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-[#f8f4f0] transition"
              >
                <ChevronLeft size={18} style={{ color: '#2a4743' }} />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setTestimonialIdx(i)}
                    className={`rounded-full transition-all ${i === testimonialIdx ? 'w-6 h-2 bg-[#2a4743]' : 'w-2 h-2 bg-gray-300'}`}
                  />
                ))}
              </div>
              <button
                onClick={nextTestimonial}
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-[#f8f4f0] transition"
              >
                <ChevronRight size={18} style={{ color: '#2a4743' }} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FEATURES / SERVICES ─── */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: Truck,
              title: 'White Glove Delivery',
              desc: 'Free delivery on orders over $500. Careful handling and scheduled delivery to your exact room of choice.',
              color: '#2a4743',
            },
            {
              icon: Wrench,
              title: 'Expert Installation',
              desc: 'Our professional installation team assembles every piece with precision, so you can enjoy your furniture from day one.',
              color: '#8c7a62',
            },
            {
              icon: Shield,
              title: '5-Year Warranty',
              desc: 'Every MODA piece comes with a 5-year structural warranty. We stand behind the quality of every product we sell.',
              color: '#2a4743',
            },
          ].map(({ icon: Icon, title, desc, color }) => (
            <div
              key={title}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow group"
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform"
                style={{ backgroundColor: `${color}12` }}
              >
                <Icon size={24} style={{ color }} />
              </div>
              <h3 className="mb-2" style={{ color: '#2a4743', fontWeight: 600, fontSize: '1rem' }}>
                {title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── FINAL CTA BANNER ─── */}
      <section className="mx-6 mb-20 rounded-3xl overflow-hidden relative" style={{ minHeight: '320px' }}>
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1759238136818-7b00ec9e782a?w=1400&q=80"
          alt="Luxury apartment"
          className="w-full h-full object-cover absolute inset-0"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, rgba(42,71,67,0.92) 0%, rgba(42,71,67,0.6) 100%)' }}
        />
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-20">
          <p className="text-[#cbb89d] text-xs tracking-[0.35em] uppercase mb-4">
            Come See It In Person
          </p>
          <h2
            className="text-white text-3xl md:text-5xl mb-4"
            style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400 }}
          >
            Visit Our Showroom
          </h2>
          <p className="text-white/70 mb-8 max-w-md text-sm leading-relaxed">
            Experience our full collection in person. Our design consultants are ready to help you create the perfect space, tailored to your lifestyle.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/book-visit"
              className="px-8 py-4 rounded-full text-white text-sm tracking-wide transition-all hover:opacity-90 hover:shadow-xl"
              style={{ backgroundColor: '#8c7a62' }}
            >
              Book a Visit
            </Link>
            <Link
              to="/shop"
              className="px-8 py-4 rounded-full text-white text-sm tracking-wide border border-white/40 hover:bg-white/10 transition-all"
            >
              Browse Online
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}