import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router';
import { SlidersHorizontal, Star, Search, X, ChevronDown } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { ShoppingCart } from "lucide-react";

const STYLES = ['All Styles', 'Modern', 'Scandinavian', 'Japanese', 'Minimalist', 'Luxury'];
const CATEGORIES = ['All', 'Sofas', 'Chairs', 'Tables', 'Beds', 'Office Furniture', 'Decor'];
const SORT_OPTIONS = ['Featured', 'Price: Low to High', 'Price: High to Low', 'Top Rated', 'Newest'];

export function ShopPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const initialCategory = searchParams.get('category') || 'All';
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedStyle, setSelectedStyle] = useState('All Styles');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [sortBy, setSortBy] = useState('Featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [addedId, setAddedId] = useState<number | null>(null);

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);
  }, [searchParams]);

  const filtered = products
    .filter(p => {
      if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
      if (selectedStyle !== 'All Styles' && p.style !== selectedStyle) return false;
      if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
      if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'Price: Low to High') return a.price - b.price;
      if (sortBy === 'Price: High to Low') return b.price - a.price;
      if (sortBy === 'Top Rated') return b.rating - a.rating;
      return 0;
    });

  const handleAdd = (e: React.MouseEvent, product: typeof products[0]) => {
    e.stopPropagation();
    addItem(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <div style={{ backgroundColor: '#f8f4f0', minHeight: '100vh' }}>
      {/* Page Header */}
      <div
  className="relative py-10 px-6 text-center bg-cover bg-center"
  style={{
    backgroundImage: "url('https://i.pinimg.com/736x/85/92/6f/85926f8ed1bb9c1e589c0e241e5a262e.jpg')",
  }}
>
  {/* Overlay */}
  <div className="absolute inset-0 bg-black/50"></div>

  {/* Content */}
  <div className="relative">
    <p
      className="text-xs tracking-[0.35em] uppercase mb-3"
      style={{ color: '#cbb89d' }}
    >
      Our Collection
    </p>

    <h1
      className="text-white"
      style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: 'clamp(2rem, 4vw, 3rem)',
        fontWeight: 400,
      }}
    >
      Shop All Furniture
    </h1>

    <p className="text-white/70 mt-3 text-sm">
      Showing {filtered.length} of {products.length} products
    </p>
  </div>
</div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Search + Sort + Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search */}
         

          {/* Sort */}
          

          {/* Filter Toggle */}
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm transition-all"
            style={{
              backgroundColor: filterOpen ? '#2a4743' : 'white',
              color: filterOpen ? 'white' : '#2a4743',
              border: '1px solid #e5e7eb',
            }}
          >
            <SlidersHorizontal size={16} />
            Filters
          </button>
        </div>

        {/* Filter Panel */}
        {filterOpen && (
          <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Category */}
              <div>
                <h4 className="text-xs tracking-widest uppercase mb-3" style={{ color: '#8c7a62' }}>
                  Category
                </h4>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className="px-3 py-1.5 rounded-full text-xs transition-all"
                      style={{
                        backgroundColor: selectedCategory === cat ? '#2a4743' : '#f8f4f0',
                        color: selectedCategory === cat ? 'white' : '#2a4743',
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Style */}
              <div>
                <h4 className="text-xs tracking-widest uppercase mb-3" style={{ color: '#8c7a62' }}>
                  Style
                </h4>
                <div className="flex flex-wrap gap-2">
                  {STYLES.map(s => (
                    <button
                      key={s}
                      onClick={() => setSelectedStyle(s)}
                      className="px-3 py-1.5 rounded-full text-xs transition-all"
                      style={{
                        backgroundColor: selectedStyle === s ? '#8c7a62' : '#f8f4f0',
                        color: selectedStyle === s ? 'white' : '#2a4743',
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h4 className="text-xs tracking-widest uppercase mb-3" style={{ color: '#8c7a62' }}>
                  Price Range: ${priceRange[0]} – ${priceRange[1] === 5000 ? '5,000+' : priceRange[1].toLocaleString()}
                </h4>
                <input
                  type="range"
                  min={0}
                  max={5000}
                  step={100}
                  value={priceRange[1]}
                  onChange={e => setPriceRange([0, Number(e.target.value)])}
                  className="w-full accent-[#2a4743]"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>$0</span>
                  <span>$5,000+</span>
                </div>
              </div>
            </div>

            {/* Reset */}
            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedStyle('All Styles');
                  setPriceRange([0, 5000]);
                }}
                className="text-sm hover:underline"
                style={{ color: '#8c7a62' }}
              >
                Reset All Filters
              </button>
            </div>
          </div>
        )}

        {/* Category Quick Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className="shrink-0 px-5 py-2 rounded-full text-sm transition-all"
              style={{
                backgroundColor: selectedCategory === cat ? '#2a4743' : 'white',
                color: selectedCategory === cat ? 'white' : '#2a4743',
                border: selectedCategory === cat ? 'none' : '1px solid #e5e7eb',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">🛋️</p>
            <h3 style={{ color: '#2a4743' }}>No products found</h3>
            <p className="text-gray-500 text-sm mt-2">Try adjusting your filters or search query.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map(product => (
              <div
                key={product.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer"
                onClick={() => navigate(`/shop/${product.id}`)}
              >
                <div className="relative overflow-hidden" style={{ height: '160px' }}>
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    {product.isBestSeller && (
                      <span className="px-2.5 py-1 rounded-full text-xs text-white" style={{ backgroundColor: '#2a4743' }}>
                        Best Seller
                      </span>
                    )}
                    {product.isNew && (
                      <span className="px-2.5 py-1 rounded-full text-xs text-white" style={{ backgroundColor: '#8c7a62' }}>
                        New
                      </span>
                    )}
                    {product.isSale && product.discount && (
                      <span className="px-2.5 py-1 rounded-full text-xs text-white bg-red-500">
                        -{product.discount}%
                      </span>
                    )}
                  </div>
                  {/* Quick Add Overlay */}
               
                </div>

                <div className="p-4">
                 
                  <h3 className="mb-3 leading-snug" style={{ color: '#2a4743', fontWeight: 500, fontSize: '0.65rem' }}>
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1 mb-1">
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map(i => (
                        <Star
                          key={i}
                          size={10}
                          className={i <= Math.floor(product.rating) ? 'fill-[#8c7a62] text-[#8c7a62]' : 'text-gray-200 fill-gray-200'}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-sm" style={{ color: '#2a4743' }}>
  ${product.price.toLocaleString()}
</span>
                    
                    </div>
                   <button
  onClick={e => handleAdd(e, product)}
  className="text-xs px-3 py-1.5 rounded-full border transition-all hover:text-white flex items-center justify-center gap-1"
  style={{
    borderColor: '#2a4743',
    color: '#2a4743',
  }}
  onMouseEnter={e => {
    e.currentTarget.style.backgroundColor = '#2a4743';
    e.currentTarget.style.color = 'white';
  }}
  onMouseLeave={e => {
    e.currentTarget.style.backgroundColor = 'transparent';
    e.currentTarget.style.color = '#2a4743';
  }}
>
  <ShoppingCart size={14} />
</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
