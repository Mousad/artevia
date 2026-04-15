import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { FaWhatsapp } from "react-icons/fa";

export function ContactPage() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', subject: '', message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ backgroundColor: '#f8f4f0', minHeight: '90  vh' }}>
      {/* Header */}
     <div
  className="relative py-20 px-6 bg-cover bg-center"
  style={{
    backgroundImage: "url('https://i.pinimg.com/736x/ba/d4/69/bad4694fbffb29f7a8ad46358d622ecb.jpg')",
  }}
>
  {/* Overlay */}
  <div className="absolute inset-0 bg-black/40"></div>

  {/* Content */}
  <div className="relative max-w-4xl mx-auto text-center">
    <p
      className="text-xs tracking-[0.35em] uppercase mb-4"
      style={{ color: '#cbb89d' }}
    >
      We'd Love to Hear From You
    </p>

    <h1
      className="text-white mb-4"
      style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: 'clamp(2rem, 4vw, 3rem)',
        fontWeight: 400,
      }}
    >
      Get in Touch
    </h1>

    <p className="text-white/80 text-sm leading-relaxed max-w-md mx-auto">
      Whether you have a question about our furniture, need design advice, or want to discuss a project — our team is here to help.
    </p>
  </div>
</div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="bg-white rounded-3xl p-12 text-center shadow-sm">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ backgroundColor: '#2a4743' }}
                >
                  <Check size={28} className="text-white" />
                </div>
                <h2
                  className="mb-3"
                  style={{ color: '#2a4743', fontFamily: "'Playfair Display', serif", fontSize: '1.75rem', fontWeight: 400 }}
                >
                  Message Sent!
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                  Thank you, {form.name}. We've received your message and will get back to you within 1 business day.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', subject: '', message: '' }); }}
                  className="px-8 py-3 rounded-full text-white text-sm"
                  style={{ backgroundColor: '#2a4743' }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-8 shadow-sm">
                <h2
                  className="mb-6"
                  style={{ color: '#2a4743', fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 400 }}
                >
                  Send Us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { id: 'name', label: 'Full Name', type: 'text', placeholder: 'Your full name', required: true },
                      { id: 'email', label: 'Email Address', type: 'email', placeholder: 'you@email.com', required: true },
                      { id: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+1 (555) 000-0000', required: false },
                      { id: 'subject', label: 'Subject', type: 'text', placeholder: 'How can we help?', required: true },
                    ].map(field => (
                      <div key={field.id}>
                        <label className="block text-xs uppercase tracking-widest mb-1.5" style={{ color: '#8c7a62' }}>
                          {field.label}
                        </label>
                        <input
                          type={field.type}
                          placeholder={field.placeholder}
                          required={field.required}
                          value={form[field.id as keyof typeof form]}
                          onChange={e => setForm(f => ({ ...f, [field.id]: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#2a4743] transition-colors"
                          style={{ color: '#2a4743' }}
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest mb-1.5" style={{ color: '#8c7a62' }}>
                      Message
                    </label>
                    <textarea
                      rows={5}
                      placeholder="Tell us about your inquiry, project, or question..."
                      required
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#2a4743] transition-colors resize-none"
                      style={{ color: '#2a4743' }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl text-white text-sm hover:opacity-90 transition hover:shadow-lg flex items-center justify-center gap-2"
                    style={{ backgroundColor: '#2a4743' }}
                  >
                    Send Message <ArrowRight size={16} />
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Contact Info */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-base font-semibold mb-4" style={{ color: '#2a4743' }}>Contact Details</h3>
              <ul className="space-y-4">
                {[
                  { icon: Phone, label: 'Call Us', value: '+1 (212) 555-0190', href: 'tel:+12125550190' },
                  { icon: Mail, label: 'Email Us', value: 'hello@modafurniture.com', href: 'mailto:hello@modafurniture.com' },
                  { icon: MapPin, label: 'Visit Us', value: '42 Design District, Suite 5\nNew York, NY 10001', href: '#map' },
                  { icon: Clock, label: 'Hours', value: 'Mon–Sat: 10am–7pm\nSunday: 11am–5pm', href: null },
                ].map(({ icon: Icon, label, value, href }) => (
                  <li key={label} className="flex gap-3">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: '#f8f4f0' }}
                    >
                      <Icon size={16} style={{ color: '#2a4743' }} />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest mb-0.5" style={{ color: '#8c7a62' }}>{label}</p>
                      {href ? (
                        <a href={href} className="text-sm hover:underline whitespace-pre-line" style={{ color: '#2a4743' }}>
                          {value}
                        </a>
                      ) : (
                        <p className="text-sm whitespace-pre-line" style={{ color: '#2a4743' }}>{value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* WhatsApp */}
     

            {/* Book Visit CTA */}
            <div
              className="rounded-2xl p-6 text-white"
              style={{ backgroundColor: '#2a4743' }}
            >
              <p className="text-xs uppercase tracking-widest mb-2" style={{ color: '#cbb89d' }}>Better Together</p>
              <h3 className="text-base mb-2 text-white" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontSize: '1.1rem' }}>
                Prefer to Talk in Person?
              </h3>
              <p className="text-white/60 text-sm mb-4 leading-relaxed">
                Book a free showroom visit and speak with one of our design consultants face to face.
              </p>
              <Link
                to="/book-visit"
                className="flex items-center gap-2 text-sm"
                style={{ color: '#cbb89d' }}
              >
                Book a Visit <ArrowRight size={14} />
              </Link>
            </div>

            {/* FAQ */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-sm font-semibold mb-3" style={{ color: '#2a4743' }}>Quick Answers</h3>
              <div className="space-y-3">
                {[
                  { q: 'How long does delivery take?', a: '3–10 business days depending on your location.' },
                  { q: 'Do you offer installation?', a: 'Yes — professional assembly is available for all products.' },
                  { q: 'Can I return a product?', a: '30-day returns on unused, original-packaged items.' },
                ].map(({ q, a }) => (
                  <div key={q} className="border-b border-gray-100 pb-3">
                    <p className="text-xs font-medium mb-1" style={{ color: '#2a4743' }}>{q}</p>
                    <p className="text-xs text-gray-500 leading-relaxed">{a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Map placeholder */}
        <div id="map" className="mt-10 rounded-3xl overflow-hidden" style={{ height: '300px', backgroundColor: '#e5e7eb' }}>
          <div
            className="w-full h-full flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #2a474315 0%, #8c7a6215 100%)',
              border: '1px solid #e5e7eb',
              borderRadius: '1.5rem',
            }}
          >
            <div className="text-center">
              <MapPin size={36} className="mx-auto mb-3" style={{ color: '#2a4743', opacity: 0.4 }} />
              <p className="font-medium" style={{ color: '#2a4743' }}>42 Design District, Suite 5</p>
              <p className="text-sm text-gray-400">New York, NY 10001</p>
             <div className="w-full h-80 rounded-2xl overflow-hidden">
  <iframe
    title="Saudi Arabia Map"
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14980399.441417667!2d45.079162!3d23.8859425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15e7b5f7c0c2c3b3%3A0x2c0a5f5b5a0c0c0!2sSaudi%20Arabia!5e0!3m2!1sen!2s!4v0000000000"
    className="w-full h-full border-0"
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  />
</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
