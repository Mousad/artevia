import { useState } from 'react';
import { Check, Clock, MapPin, Phone, Calendar } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const timeSlots = ['10:00 AM', '11:00 AM', '12:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];

const purposes = [
  'Browse the full collection',
  'Living room consultation',
  'Bedroom design help',
  'Office furniture setup',
  'Custom project consultation',
  'Gift purchase',
];

function getDates() {
  const dates = [];
  const today = new Date();
  for (let i = 1; i <= 14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    if (d.getDay() !== 0) { // exclude Sundays... actually showroom is open, let's include all
      dates.push(d);
    }
  }
  return dates.slice(0, 10);
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function BookVisitPage() {
  const dates = getDates();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedPurpose, setSelectedPurpose] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', phone: '', email: '', notes: '' });
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6" style={{ backgroundColor: '#f8f4f0' }}>
        <div className="bg-white rounded-3xl p-12 text-center max-w-md shadow-sm">
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
            Visit Confirmed!
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-4">
            Your showroom visit has been scheduled for:
          </p>
          <div className="bg-[#f8f4f0] rounded-xl p-4 mb-6 text-sm" style={{ color: '#2a4743' }}>
            <p className="font-semibold">
              {selectedDate ? `${DAYS[selectedDate.getDay()]}, ${MONTHS[selectedDate.getMonth()]} ${selectedDate.getDate()}` : ''}
            </p>
            <p style={{ color: '#8c7a62' }}>{selectedTime}</p>
          </div>
          <p className="text-gray-500 text-sm mb-6">
            We'll send a confirmation to <strong>{form.email || form.phone}</strong> shortly. Our team looks forward to welcoming you!
          </p>
          <button
            onClick={() => { setSubmitted(false); setStep(1); setSelectedDate(null); setSelectedTime(null); setSelectedPurpose(null); }}
            className="px-8 py-3 rounded-full text-white text-sm"
            style={{ backgroundColor: '#2a4743' }}
          >
            Book Another Visit
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#f8f4f0', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ backgroundColor: '#2a4743' }} className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs tracking-[0.35em] uppercase mb-4" style={{ color: '#cbb89d' }}>
            Come & Experience
          </p>
          <h1
            className="text-white mb-4"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 400 }}
          >
            Book a Showroom Visit
          </h1>
          <p className="text-white/60 text-sm leading-relaxed max-w-md mx-auto">
            Step into our world. Experience MODA furniture in person with personal guidance from our design consultants.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            {/* Step Indicator */}
            <div className="flex items-center gap-3 mb-8">
              {[
                { n: 1, label: 'Select Date' },
                { n: 2, label: 'Your Details' },
              ].map(({ n, label }) => (
                <div key={n} className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all"
                    style={{
                      backgroundColor: step >= n ? '#2a4743' : 'white',
                      color: step >= n ? 'white' : '#9ca3af',
                      border: step >= n ? 'none' : '1px solid #e5e7eb',
                    }}
                  >
                    {step > n ? <Check size={14} /> : n}
                  </div>
                  <span className="text-sm" style={{ color: step >= n ? '#2a4743' : '#9ca3af' }}>{label}</span>
                  {n < 2 && <div className="w-8 h-px bg-gray-200 mx-1" />}
                </div>
              ))}
            </div>

            {step === 1 && (
              <div className="space-y-6">
                {/* Purpose */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h3 className="mb-4 text-base" style={{ color: '#2a4743', fontWeight: 600 }}>
                    What brings you in?
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {purposes.map(p => (
                      <button
                        key={p}
                        onClick={() => setSelectedPurpose(p)}
                        className="px-4 py-3 rounded-xl text-sm text-left transition-all border"
                        style={{
                          backgroundColor: selectedPurpose === p ? '#2a4743' : '#f8f4f0',
                          color: selectedPurpose === p ? 'white' : '#2a4743',
                          borderColor: selectedPurpose === p ? '#2a4743' : 'transparent',
                        }}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Date Selection */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h3 className="mb-4 text-base" style={{ color: '#2a4743', fontWeight: 600 }}>
                    Choose a Date
                  </h3>
                  <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                    {dates.map((d, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedDate(d)}
                        className="p-2 rounded-xl text-center transition-all"
                        style={{
                          backgroundColor: selectedDate?.toDateString() === d.toDateString() ? '#2a4743' : '#f8f4f0',
                          color: selectedDate?.toDateString() === d.toDateString() ? 'white' : '#2a4743',
                        }}
                      >
                        <p className="text-xs opacity-60">{DAYS[d.getDay()]}</p>
                        <p className="text-base font-medium">{d.getDate()}</p>
                        <p className="text-xs opacity-60">{MONTHS[d.getMonth()]}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Slots */}
                {selectedDate && (
                  <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <h3 className="mb-4 text-base" style={{ color: '#2a4743', fontWeight: 600 }}>
                      Available Time Slots
                    </h3>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {timeSlots.map(time => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className="py-3 rounded-xl text-sm transition-all border"
                          style={{
                            backgroundColor: selectedTime === time ? '#2a4743' : 'white',
                            color: selectedTime === time ? 'white' : '#2a4743',
                            borderColor: selectedTime === time ? '#2a4743' : '#e5e7eb',
                          }}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  onClick={() => setStep(2)}
                  disabled={!selectedDate || !selectedTime}
                  className="w-full py-4 rounded-xl text-white text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ backgroundColor: '#2a4743' }}
                >
                  Continue to Details →
                </button>
              </div>
            )}

            {step === 2 && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="bg-white rounded-2xl p-6 shadow-sm mb-2">
                  <div
                    className="flex items-center gap-3 p-3 rounded-xl mb-4"
                    style={{ backgroundColor: '#f8f4f0' }}
                  >
                    <Calendar size={16} style={{ color: '#2a4743' }} />
                    <div>
                      <p className="text-sm font-medium" style={{ color: '#2a4743' }}>
                        {selectedDate ? `${DAYS[selectedDate.getDay()]}, ${MONTHS[selectedDate.getMonth()]} ${selectedDate.getDate()}` : ''}
                        {' · '}{selectedTime}
                      </p>
                      {selectedPurpose && (
                        <p className="text-xs" style={{ color: '#8c7a62' }}>{selectedPurpose}</p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="ml-auto text-xs underline"
                      style={{ color: '#8c7a62' }}
                    >
                      Change
                    </button>
                  </div>

                  {[
                    { id: 'name', label: 'Full Name', type: 'text', placeholder: 'Your full name', required: true },
                    { id: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+1 (555) 000-0000', required: true },
                    { id: 'email', label: 'Email Address', type: 'email', placeholder: 'you@email.com', required: false },
                  ].map(field => (
                    <div key={field.id} className="mb-3">
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

                  <div>
                    <label className="block text-xs uppercase tracking-widest mb-1.5" style={{ color: '#8c7a62' }}>
                      Special Requests (Optional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Any specific pieces you'd like to see, questions you have, or accessibility needs..."
                      value={form.notes}
                      onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#2a4743] transition-colors resize-none"
                      style={{ color: '#2a4743' }}
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-6 py-4 rounded-xl text-sm border border-gray-200 hover:border-[#2a4743] transition-colors"
                    style={{ color: '#2a4743' }}
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-4 rounded-xl text-white text-sm hover:opacity-90 transition"
                    style={{ backgroundColor: '#2a4743' }}
                  >
                    Confirm Showroom Visit
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Sidebar Info */}
          <div className="space-y-5">
            {/* Showroom Image */}
            <div className="rounded-2xl overflow-hidden" style={{ height: '200px' }}>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1760611656148-063d3b9a8dbc?w=600&q=80"
                alt="MODA Showroom"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info */}
            <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
              <h3 className="text-base font-semibold" style={{ color: '#2a4743' }}>
                MODA Furniture Studio
              </h3>
              {[
                { icon: MapPin, text: '42 Design District, Suite 5\nNew York, NY 10001' },
                { icon: Phone, text: '+1 (212) 555-0190' },
                { icon: Clock, text: 'Mon–Sat: 10am – 7pm\nSunday: 11am – 5pm' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex gap-3">
                  <Icon size={16} className="shrink-0 mt-0.5" style={{ color: '#8c7a62' }} />
                  <p className="text-sm text-gray-600 whitespace-pre-line">{text}</p>
                </div>
              ))}
            </div>

            {/* What to Expect */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-sm font-semibold mb-3" style={{ color: '#2a4743' }}>What to Expect</h3>
              <ul className="space-y-2">
                {[
                  'Personal 1-on-1 with a design consultant',
                  'Touch and test every piece in our showroom',
                  'Custom fabric & finish samples',
                  'Complimentary design recommendations',
                  'No obligation to purchase',
                ].map(item => (
                  <li key={item} className="flex gap-2 text-sm text-gray-600">
                    <Check size={14} className="mt-0.5 shrink-0" style={{ color: '#2a4743' }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
