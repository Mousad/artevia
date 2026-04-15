import { Link } from 'react-router';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

export function Footer() {
  return (
    <footer style={{ backgroundColor: '#2a4743' }} className="text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              
              <div>
                <div
                  className="text-xl tracking-[0.12em] uppercase text-white"
                  style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}
                >
                  artevia
                </div>
                
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Premium furniture for modern living. We craft spaces that inspire, comfort, and endure — with designs rooted in craftsmanship and a passion for quality.
            </p>
            <div className="flex gap-3">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#8c7a62] transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm tracking-widest uppercase text-white/50 mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: 'Shop Collection', path: '/shop' },
                { label: 'Interior Projects', path: '/projects' },
                { label: 'Current Offers', path: '/offers' },
                { label: 'Book a Visit', path: '/book-visit' },
                { label: 'Contact Us', path: '/contact' },
              ].map(link => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-white/70 text-sm hover:text-[#cbb89d] transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

       

          {/* Contact Info */}
          <div>
            <h4 className="text-sm tracking-widest uppercase text-white/50 mb-5">Visit Us</h4>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin size={16} className="text-[#cbb89d] shrink-0 mt-0.5" />
                <span className="text-white/70 text-sm">
                  42 Design District, Suite 5<br />
                  New York, NY 10001
                </span>
              </li>
              <li className="flex gap-3">
                <Phone size={16} className="text-[#cbb89d] shrink-0" />
                <a href="tel:+12125550190" className="text-white/70 text-sm hover:text-[#cbb89d] transition-colors">
                  +1 (212) 555-0190
                </a>
              </li>
              <li className="flex gap-3">
                <Mail size={16} className="text-[#cbb89d] shrink-0" />
                <a href="mailto:hello@modafurniture.com" className="text-white/70 text-sm hover:text-[#cbb89d] transition-colors">
                  hello@arteviarniture.com
                </a>
              </li>
            </ul>

           
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-xs">
            © 2026 MODA Furniture Studio. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Sitemap'].map(item => (
              <a key={item} href="#" className="text-white/40 text-xs hover:text-white/70 transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
