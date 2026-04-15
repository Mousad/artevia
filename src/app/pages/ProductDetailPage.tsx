import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { Star, ChevronLeft, ChevronRight, ShoppingCart, Calendar, MessageCircle, Heart, Share2, Package, Truck, Shield, Check } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const product = products.find(p => p.id === Number(id));

  const [activeImg, setActiveImg] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews'>('description');
  const [wishlisted, setWishlisted] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center" style={{ backgroundColor: '#f8f4f0' }}>
        <p className="text-5xl mb-4">🛋️</p>
        <h2 style={{ color: '#2a4743' }}>Product Not Found</h2>
        <Link to="/shop" className="mt-4 text-sm underline" style={{ color: '#8c7a62' }}>
          Back to Shop
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div style={{ backgroundColor: '#f8f4f0', minHeight: '100vh' }}>
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <nav className="flex items-center gap-2 text-xs" style={{ color: '#8c7a62' }}>
          <Link to="/" className="hover:underline">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:underline">Shop</Link>
          <span>/</span>
          <Link to={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:underline">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-gray-400">{product.name}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* ─── IMAGE GALLERY ─── */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative rounded-3xl overflow-hidden bg-white" style={{ height: '350px' }}>
              <ImageWithFallback
                src={product.images[activeImg]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {/* Nav arrows */}
              {product.images.length > 1 && (
                <>
                 
                  
                </>
              )}
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
              
                {product.isNew && (
                  <span className="px-3 py-1.5 rounded-full text-xs text-white" style={{ backgroundColor: '#8c7a62' }}>
                    New Arrival
                  </span>
                )}
                {product.isSale && product.discount && (
                  <span className="px-3 py-1.5 rounded-full text-xs text-white bg-red-500">
                    Save {product.discount}%
                  </span>
                )}
              </div>
              {/* Wishlist */}
             
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`rounded-xl overflow-hidden transition-all`}
                    style={{
                      width: '80px',
                      height: '80px',
                      border: i === activeImg ? '2px solid #2a4743' : '2px solid transparent',
                    }}
                  >
                    <ImageWithFallback src={img} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ─── PRODUCT INFO ─── */}
          <div className="space-y-6">
            <div>
              <p className="text-xs uppercase tracking-widest mb-2" style={{ color: '#8c7a62' }}>
                {product.category} · {product.style}
              </p>
              <h1
                className="leading-tight mb-3"
                style={{
                  color: '#2a4743',
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
                  fontWeight: 400,
                }}
              >
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(i => (
                    <Star
                      key={i}
                      size={14}
                      className={i <= Math.floor(product.rating) ? 'fill-[#8c7a62] text-[#8c7a62]' : 'fill-gray-200 text-gray-200'}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium" style={{ color: '#2a4743' }}>{product.rating}</span>
                <span className="text-sm text-gray-400">({product.reviews} reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span
                className="text-3xl"
                style={{ color: '#2a4743', fontFamily: "'Playfair Display', serif" }}
              >
                ${product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-gray-400 line-through">
                    ${product.originalPrice.toLocaleString()}
                  </span>
                  <span className="text-sm text-red-500 font-medium">
                    Save ${(product.originalPrice - product.price).toLocaleString()}
                  </span>
                </>
              )}
            </div>

            <div className="w-full h-px bg-gray-100" />

            {/* Colors */}
            <div>
              <p className="text-xs uppercase tracking-widest mb-3" style={{ color: '#8c7a62' }}>
                Color: <span style={{ color: '#2a4743' }}>{product.colors[selectedColor]}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color, i) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(i)}
                    className="px-4 py-2 rounded-full text-xs transition-all"
                    style={{
                      backgroundColor: i === selectedColor ? '#2a4743' : 'white',
                      color: i === selectedColor ? 'white' : '#2a4743',
                      border: '1px solid #e5e7eb',
                    }}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <p className="text-xs uppercase tracking-widest mb-3" style={{ color: '#8c7a62' }}>Quantity</p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-10 h-10 rounded-xl bg-white border border-gray-200 text-lg flex items-center justify-center hover:border-[#2a4743] transition"
                  style={{ color: '#2a4743' }}
                >
                  −
                </button>
                <span className="w-12 text-center font-medium" style={{ color: '#2a4743' }}>{quantity}</span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="w-10 h-10 rounded-xl bg-white border border-gray-200 text-lg flex items-center justify-center hover:border-[#2a4743] transition"
                  style={{ color: '#2a4743' }}
                >
                  +
                </button>
                <span className="text-xs text-gray-400 ml-2">In stock — ships in 3–5 days</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl text-sm text-white transition-all hover:opacity-90 hover:shadow-lg"
                style={{ backgroundColor: added ? '#8c7a62' : '#2a4743' }}
              >
                {added ? <><Check size={16} /> Added to Cart</> : <><ShoppingCart size={16} /> Add to Cart</>}
              </button>
              <Link
                to="/book-visit"
                className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl text-sm transition-all border hover:bg-[#2a4743] hover:text-white hover:border-[#2a4743]"
                style={{ color: '#2a4743', borderColor: '#2a4743' }}
              >
                <Calendar size={16} /> Request Visit
              </Link>
             
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {[
                { icon: Truck, label: 'Free Delivery', sub: 'Orders $500+' },
                { icon: Package, label: 'Free Assembly', sub: 'Professional team' },
                { icon: Shield, label: '5-Year Warranty', sub: 'Quality guarantee' },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="bg-white rounded-xl p-3 text-center shadow-sm">
                  <Icon size={18} className="mx-auto mb-1.5" style={{ color: '#2a4743' }} />
                  <p className="text-xs font-medium" style={{ color: '#2a4743' }}>{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ─── TABS ─── */}
        <div className="mt-16 bg-white rounded-3xl overflow-hidden shadow-sm">
          <div className="flex border-b border-gray-100">
            {(['description', 'specs', 'reviews'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-8 py-4 text-sm capitalize transition-all relative"
                style={{
                  color: activeTab === tab ? '#2a4743' : '#9ca3af',
                  fontWeight: activeTab === tab ? 600 : 400,
                }}
              >
                {tab === 'specs' ? 'Specifications' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ backgroundColor: '#2a4743' }} />
                )}
              </button>
            ))}
          </div>

          <div className="p-8">
            {activeTab === 'description' && (
              <div className="max-w-3xl">
                <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>
                <ul className="space-y-2">
                  {['Handcrafted by skilled artisans', 'Sustainably sourced materials', 'Easy flat-pack delivery', 'Professional assembly available'].map(feat => (
                    <li key={feat} className="flex items-center gap-2 text-sm text-gray-600">
                      <Check size={14} style={{ color: '#2a4743' }} />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
                {[
                  { label: 'Product Name', value: product.name },
                  { label: 'Category', value: product.category },
                  { label: 'Style', value: product.style },
                  { label: 'Material', value: product.material },
                  { label: 'Dimensions', value: product.dimensions },
                  { label: 'Available Colors', value: product.colors.join(', ') },
                  { label: 'Warranty', value: '5 Years Structural' },
                  { label: 'Assembly', value: 'Professional installation available' },
                ].map(({ label, value }) => (
                  <div key={label} className="border-b border-gray-100 pb-3">
                    <p className="text-xs uppercase tracking-widest mb-1" style={{ color: '#8c7a62' }}>{label}</p>
                    <p className="text-sm" style={{ color: '#2a4743' }}>{value}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="max-w-3xl space-y-6">
                {[
                  { name: 'Emma R.', rating: 5, date: 'March 2026', text: 'Absolutely stunning piece. The quality exceeded my expectations and the delivery team was exceptional. Worth every penny.' },
                  { name: 'Michael T.', rating: 5, date: 'February 2026', text: 'Second piece I\'ve bought from MODA. The craftsmanship is consistently excellent. My living room looks magazine-worthy now.' },
                  { name: 'Priya K.', rating: 4, date: 'January 2026', text: 'Beautiful design and solid construction. Took a while to arrive but the quality made the wait worthwhile. Would recommend.' },
                ].map((review, i) => (
                  <div key={i} className="border-b border-gray-100 pb-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs" style={{ backgroundColor: '#2a4743' }}>
                          {review.name[0]}
                        </div>
                        <div>
                          <p className="text-sm font-medium" style={{ color: '#2a4743' }}>{review.name}</p>
                          <p className="text-xs text-gray-400">{review.date}</p>
                        </div>
                      </div>
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map(i => (
                          <Star key={i} size={12} className={i <= review.rating ? 'fill-[#8c7a62] text-[#8c7a62]' : 'fill-gray-200 text-gray-200'} />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{review.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ─── RELATED PRODUCTS ─── */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2
              className="mb-8 text-2xl"
              style={{ color: '#2a4743', fontFamily: "'Playfair Display', serif", fontWeight: 400 }}
            >
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {related.map(rel => (
                <div
                  key={rel.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer group"
                  onClick={() => navigate(`/shop/${rel.id}`)}
                >
                  <div className="overflow-hidden" style={{ height: '200px' }}>
                    <ImageWithFallback
                      src={rel.image}
                      alt={rel.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-gray-400 mb-1">{rel.category}</p>
                    <p className="text-sm font-medium mb-1" style={{ color: '#2a4743' }}>{rel.name}</p>
                    <p className="text-sm font-semibold" style={{ color: '#8c7a62' }}>${rel.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
