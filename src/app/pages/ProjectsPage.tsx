import { useState } from 'react';
import { Link } from 'react-router';
import { ArrowRight, MapPin, Calendar } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const projects = [
  {
    id: 1,
    title: 'Williamsburg Loft',
    type: 'Full Home',
    location: 'Brooklyn, NY',
    year: '2025',
    budget: '$48,000',
    before: 'https://images.unsplash.com/photo-1666704369274-83898c9309ef?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1775505082483-85fda71273d0?w=800&q=80',
    desc: 'A complete transformation of a 2,200 sq ft open-plan loft. We replaced every piece of furniture, redesigned the layout, and created distinct living, dining, and workspace zones using the Nordic Lux Sofa, Osaka Dining Table, Executive Desk, and Pacific Coffee Table.',
    products: ['Nordic Lux Sofa', 'Osaka Dining Table', 'Pacific Coffee Table', 'Executive Pro Desk'],
    tag: 'Residential',
  },
  {
    id: 2,
    title: 'Upper East Penthouse',
    type: 'Master Bedroom',
    location: 'Manhattan, NY',
    year: '2025',
    budget: '$22,000',
    before: 'https://images.unsplash.com/photo-1774716926071-fc03e73d0806?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=800&q=80',
    desc: 'A luxurious bedroom makeover featuring the Timber King Bed as the centrepiece, flanked by custom marble side tables and adorned with hand-selected decor. The result is a five-star hotel experience in a private home.',
    products: ['Timber King Bed', 'Marble Side Table', 'Nordic Decor Bundle', 'Velvet Ottoman'],
    tag: 'Residential',
  },
  {
    id: 3,
    title: 'SoHo Creative Studio',
    type: 'Home Office',
    location: 'Manhattan, NY',
    year: '2026',
    budget: '$15,000',
    before: 'https://images.unsplash.com/photo-1759238136818-7b00ec9e782a?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1760611656148-063d3b9a8dbc?w=800&q=80',
    desc: 'Converting a spare room into a world-class creative workspace. The Executive Pro Desk takes center stage with the Zen Bookshelf creating a stunning display wall and the Scandy Chairs providing ergonomic meeting seating.',
    products: ['Executive Pro Desk', 'Zen Bookshelf', 'Scandy Dining Chair', 'Cloud Armchair'],
    tag: 'Commercial',
  },
  {
    id: 4,
    title: 'Tribeca Family Home',
    type: 'Full Home',
    location: 'Tribeca, NY',
    year: '2026',
    budget: '$65,000',
    before: 'https://images.unsplash.com/photo-1628304502420-eaa71f507638?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1672927936377-97d1be3976cd?w=800&q=80',
    desc: 'An extensive family home project spanning 4 rooms and outdoor terrace. MODA curated a complete furniture collection balancing style, practicality, and durability for a family of five.',
    products: ['Nordic Lux Sofa', 'Timber King Bed', 'Osaka Dining Table', 'Garden Lounge Set'],
    tag: 'Residential',
  },
  {
    id: 5,
    title: 'Chelsea Art Gallery',
    type: 'Commercial',
    location: 'Chelsea, NY',
    year: '2025',
    budget: '$30,000',
    before: 'https://images.unsplash.com/photo-1680712738343-84ef33239b1c?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1762803841422-5b8cf8767cd9?w=800&q=80',
    desc: 'Furnishing a gallery and events space that needed to feel sophisticated yet welcoming. MODA selected pieces that complement the artwork without overpowering it.',
    products: ['Cloud Armchair', 'Velvet Ottoman', 'Marble Side Table', 'Nordic Decor Bundle'],
    tag: 'Commercial',
  },
  {
    id: 6,
    title: 'Park Slope Brownstone',
    type: 'Dining Room',
    location: 'Brooklyn, NY',
    year: '2026',
    budget: '$18,000',
    before: 'https://images.unsplash.com/photo-1762856490803-8e200418973a?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1758977403826-01e2c8a3f68f?w=800&q=80',
    desc: 'A dining room transformation centered around the Osaka Dining Table, paired with Scandy Chairs. The natural teak finish and minimalist aesthetic created the perfect dinner party setting.',
    products: ['Osaka Dining Table', 'Scandy Dining Chair', 'Pacific Coffee Table'],
    tag: 'Residential',
  },
];

const filters = ['All', 'Residential', 'Commercial'];

export function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  const filtered = activeFilter === 'All' ? projects : projects.filter(p => p.tag === activeFilter);

  return (
    <div style={{ backgroundColor: '#f8f4f0', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ backgroundColor: '#2a4743' }} className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs tracking-[0.35em] uppercase mb-4" style={{ color: '#cbb89d' }}>
            Our Work
          </p>
          <h1
            className="text-white mb-4"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 400 }}
          >
            Interior Design Projects
          </h1>
          <p className="text-white/60 max-w-lg mx-auto text-sm leading-relaxed">
            Each project is a unique collaboration between our design team and our clients, resulting in spaces that are deeply personal, beautifully curated, and built to last.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-10">
          <div className="flex gap-2">
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className="px-5 py-2 rounded-full text-sm transition-all"
                style={{
                  backgroundColor: activeFilter === f ? '#2a4743' : 'white',
                  color: activeFilter === f ? 'white' : '#2a4743',
                  border: '1px solid #e5e7eb',
                }}
              >
                {f}
              </button>
            ))}
          </div>
          <p className="text-sm text-gray-500">{filtered.length} projects</p>
        </div>

        {/* Projects Grid */}
        <div className="space-y-12">
          {filtered.map((proj, idx) => (
            <div
              key={proj.id}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
              style={{ flexDirection: idx % 2 === 1 ? 'row-reverse' : 'row' }}
            >
              {/* Before/After Images */}
              <div
                className={`relative rounded-3xl overflow-hidden ${idx % 2 === 1 ? 'lg:order-2' : ''}`}
                style={{ height: '420px' }}
                onMouseEnter={() => setHoveredProject(proj.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <ImageWithFallback
                  src={hoveredProject === proj.id ? proj.after : proj.before}
                  alt={proj.title}
                  className="w-full h-full object-cover transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span
                    className="px-3 py-1.5 rounded-full text-xs text-white"
                    style={{ backgroundColor: proj.tag === 'Residential' ? '#2a4743' : '#8c7a62' }}
                  >
                    {proj.tag}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span
                    className="px-3 py-1.5 rounded-full text-xs text-white border border-white/30"
                    style={{ backgroundColor: hoveredProject === proj.id ? '#8c7a62' : 'rgba(0,0,0,0.4)' }}
                  >
                    {hoveredProject === proj.id ? 'After ✓' : 'Hover for After →'}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-xs text-white/60 mb-0.5 flex items-center gap-1">
                    <MapPin size={10} /> {proj.location}
                  </p>
                  <p className="text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>{proj.title}</p>
                </div>
              </div>

              {/* Project Info */}
              <div className={`space-y-5 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div>
                  <p className="text-xs uppercase tracking-widest mb-2" style={{ color: '#8c7a62' }}>
                    {proj.type}
                  </p>
                  <h2
                    className="mb-3"
                    style={{ color: '#2a4743', fontFamily: "'Playfair Display', serif", fontSize: '1.75rem', fontWeight: 400 }}
                  >
                    {proj.title}
                  </h2>
                  <p className="text-gray-500 text-sm leading-relaxed">{proj.desc}</p>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {[
                    { icon: MapPin, label: 'Location', value: proj.location },
                    { icon: Calendar, label: 'Year', value: proj.year },
                    { icon: ArrowRight, label: 'Budget', value: proj.budget },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="bg-white rounded-xl p-3 shadow-sm text-center">
                      <p className="text-xs text-gray-400 mb-0.5">{label}</p>
                      <p className="text-sm font-medium" style={{ color: '#2a4743' }}>{value}</p>
                    </div>
                  ))}
                </div>

                <div>
                  <p className="text-xs uppercase tracking-widest mb-2" style={{ color: '#8c7a62' }}>
                    Products Used
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {proj.products.map(p => (
                      <span
                        key={p}
                        className="px-3 py-1 rounded-full text-xs"
                        style={{ backgroundColor: '#f8f4f0', color: '#2a4743', border: '1px solid #e5e7eb' }}
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  to="/book-visit"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm text-white transition-all hover:opacity-90"
                  style={{ backgroundColor: '#2a4743' }}
                >
                  Start Your Project <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 rounded-3xl overflow-hidden text-center py-20 px-6" style={{ backgroundColor: '#2a4743' }}>
          <p className="text-xs tracking-[0.35em] uppercase mb-4" style={{ color: '#cbb89d' }}>
            Let's Work Together
          </p>
          <h2
            className="text-white mb-4"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 400 }}
          >
            Ready to Transform Your Space?
          </h2>
          <p className="text-white/60 mb-8 max-w-md mx-auto text-sm leading-relaxed">
            Our design team would love to hear about your project. Book a consultation and let's create something extraordinary together.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/book-visit"
              className="px-8 py-4 rounded-full text-white text-sm"
              style={{ backgroundColor: '#8c7a62' }}
            >
              Book a Consultation
            </Link>
            <Link
              to="/contact"
              className="px-8 py-4 rounded-full text-white text-sm border border-white/30 hover:bg-white/10 transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
