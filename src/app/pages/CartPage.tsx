import { useState } from 'react';
import { Link } from 'react-router';
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function CartPage() {
  const { state, removeItem, updateQuantity, clearCart, totalItems, totalPrice } = useCart();

  const [form, setForm] = useState({
    name: '', phone: '', email: '', address: '', notes: '', payment: 'cash',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    clearCart();
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6" style={{ backgroundColor: '#f8f4f0' }}>
        <div className="bg-white rounded-3xl p-12 text-center max-w-md shadow-sm">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: '#2a4743' }}>
            <Check size={28} className="text-white" />
          </div>
          <h2 className="mb-3" style={{ color: '#2a4743', fontFamily: "'Playfair Display', serif", fontWeight: 400, fontSize: '1.75rem' }}>
            Order Confirmed!
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-6">
            Thank you, {form.name || 'valued customer'}. Your order has been received and our team will contact you shortly to confirm delivery details.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-white text-sm"
            style={{ backgroundColor: '#2a4743' }}
          >
            Continue Shopping <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#f8f4f0', minHeight: '100vh' }}>
      {/* Header */}
     <div
  className="relative py-12 px-6 text-center bg-cover bg-center"
  style={{
    backgroundImage: "url('https://i.pinimg.com/1200x/eb/26/ea/eb26ea615bcab8ac6819da262be6380d.jpg')",
  }}
>
  {/* Overlay */}
  <div className="absolute inset-0 bg-black/50"></div>

  {/* Content */}
  <div className="relative">
    <p
      className="text-xs tracking-[0.35em] uppercase mb-2"
      style={{ color: '#cbb89d' }}
    >
      Your Selection
    </p>

    <h1
      className="text-white"
      style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
        fontWeight: 400,
      }}
    >
      Shopping Cart
    </h1>

    <p className="text-white/70 mt-2 text-sm">
      {totalItems} {totalItems === 1 ? 'item' : 'items'}
    </p>
  </div>
</div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {state.items.length === 0 ? (
          <div className="text-center py-24">
            <ShoppingBag size={48} className="mx-auto mb-4 opacity-30" style={{ color: '#2a4743' }} />
            <h3 className="mb-2" style={{ color: '#2a4743' }}>Your cart is empty</h3>
            <p className="text-gray-500 text-sm mb-6">Discover our premium furniture collection</p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-white text-sm"
              style={{ backgroundColor: '#2a4743' }}
            >
              Browse Collection <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-base font-semibold" style={{ color: '#2a4743' }}>
                  Cart Items ({totalItems})
                </h2>
                <button
                  onClick={clearCart}
                  className="text-xs text-gray-400 hover:text-red-500 transition-colors underline"
                >
                  Clear All
                </button>
              </div>

              {state.items.map(({ product, quantity }) => (
                <div key={product.id} className="bg-white rounded-2xl p-4 shadow-sm flex gap-4">
                  {/* Image */}
                  <div className="rounded-xl overflow-hidden shrink-0" style={{ width: '100px', height: '100px' }}>
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs uppercase tracking-widest mb-0.5" style={{ color: '#8c7a62' }}>
                      {product.category}
                    </p>
                    <h4 className="text-sm font-medium truncate mb-1" style={{ color: '#2a4743' }}>
                      {product.name}
                    </h4>
                    <p className="text-sm font-semibold mb-3" style={{ color: '#2a4743' }}>
                      ${product.price.toLocaleString()}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 border border-gray-200 rounded-full px-3 py-1">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="hover:text-[#8c7a62] transition-colors"
                          style={{ color: '#2a4743' }}
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-sm font-medium w-6 text-center" style={{ color: '#2a4743' }}>
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="hover:text-[#8c7a62] transition-colors"
                          style={{ color: '#2a4743' }}
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(product.id)}
                        className="text-gray-300 hover:text-red-400 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Subtotal */}
                  <div className="text-right shrink-0">
                    <p className="text-sm font-semibold" style={{ color: '#2a4743' }}>
                      ${(product.price * quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column: Summary + Checkout Form */}
            <div className="space-y-5">
              {/* Order Summary */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-semibold mb-4" style={{ color: '#2a4743' }}>Order Summary</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Subtotal</span>
                    <span style={{ color: '#2a4743' }}>${totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Delivery</span>
                    <span className="text-green-600">{totalPrice >= 500 ? 'Free' : '$75'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Installation</span>
                    <span style={{ color: '#2a4743' }}>Contact to confirm</span>
                  </div>
                  <div className="border-t border-gray-100 pt-3 flex justify-between font-semibold text-base">
                    <span style={{ color: '#2a4743' }}>Total</span>
                    <span style={{ color: '#2a4743' }}>
                      ${(totalPrice + (totalPrice < 500 ? 75 : 0)).toLocaleString()}
                    </span>
                  </div>
                </div>
                {totalPrice < 500 && (
                  <p className="mt-3 text-xs text-center py-2 px-3 rounded-lg" style={{ backgroundColor: '#f8f4f0', color: '#8c7a62' }}>
                    Add ${(500 - totalPrice).toLocaleString()} more for free delivery
                  </p>
                )}
              </div>

              {/* Checkout Form */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-semibold mb-4" style={{ color: '#2a4743' }}>Delivery Details</h3>
                <form onSubmit={handleSubmit} className="space-y-3">
                  {[
                    { id: 'name', label: 'Full Name', type: 'text', placeholder: 'Your full name', required: true },
                    { id: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+1 (555) 000-0000', required: true },
                    { id: 'email', label: 'Email Address', type: 'email', placeholder: 'you@email.com', required: false },
                  ].map(field => (
                    <div key={field.id}>
                      <label className="block text-xs tracking-widest uppercase mb-1.5" style={{ color: '#8c7a62' }}>
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        required={field.required}
                        value={form[field.id as keyof typeof form]}
                        onChange={e => setForm(f => ({ ...f, [field.id]: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#2a4743] transition-colors"
                        style={{ color: '#2a4743' }}
                      />
                    </div>
                  ))}

                  <div>
                    <label className="block text-xs tracking-widest uppercase mb-1.5" style={{ color: '#8c7a62' }}>
                      Delivery Address
                    </label>
                    <textarea
                      placeholder="Street address, city, state, zip..."
                      required
                      rows={2}
                      value={form.address}
                      onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#2a4743] transition-colors resize-none"
                      style={{ color: '#2a4743' }}
                    />
                  </div>

                  <div>
                    <label className="block text-xs tracking-widest uppercase mb-1.5" style={{ color: '#8c7a62' }}>
                      Notes (Optional)
                    </label>
                    <textarea
                      placeholder="Delivery instructions, preferred times..."
                      rows={2}
                      value={form.notes}
                      onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#2a4743] transition-colors resize-none"
                      style={{ color: '#2a4743' }}
                    />
                  </div>

                  {/* Payment */}
                  <div>
                    <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: '#8c7a62' }}>
                      Payment Method
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { value: 'cash', label: 'Cash' },
                        { value: 'card', label: 'Card' },
                        { value: 'bank', label: 'Bank Transfer' },
                      ].map(opt => (
                        <label
                          key={opt.value}
                          className="flex items-center justify-center gap-1.5 py-2 rounded-xl cursor-pointer text-xs border transition-all"
                          style={{
                            backgroundColor: form.payment === opt.value ? '#2a4743' : 'white',
                            color: form.payment === opt.value ? 'white' : '#2a4743',
                            borderColor: form.payment === opt.value ? '#2a4743' : '#e5e7eb',
                          }}
                        >
                          <input
                            type="radio"
                            name="payment"
                            value={opt.value}
                            checked={form.payment === opt.value}
                            onChange={e => setForm(f => ({ ...f, payment: e.target.value }))}
                            className="hidden"
                          />
                          {opt.label}
                        </label>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl text-white text-sm font-medium transition-all hover:opacity-90 hover:shadow-lg mt-2"
                    style={{ backgroundColor: '#2a4743' }}
                  >
                    Place Order — ${(totalPrice + (totalPrice < 500 ? 75 : 0)).toLocaleString()}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
