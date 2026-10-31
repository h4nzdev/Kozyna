import React from 'react';
import { ArrowUp, Instagram, Facebook, Globe, Sparkles, MapPin, Phone, Mail } from 'lucide-react';
import { restaurantData } from '../data/restaurant';

export default function FooterSection({ onScrollToTop }) {
  return (
    <footer className="bg-charcoal text-ivory py-16 sm:py-20 px-6 sm:px-10 lg:px-16 border-t border-cream/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-16 border-b border-cream/15">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-4">
              {restaurantData.logo && (
                <img
                  src={restaurantData.logo}
                  alt="Kozyna Logo"
                  className="w-14 h-14 object-contain rounded-full border border-gold/40 shadow-sm p-0.5 bg-espresso"
                />
              )}
              <div>
                <span className="font-serif text-3xl sm:text-4xl tracking-widest-editorial text-ivory font-normal block">
                  {restaurantData.name}
                </span>
                <span className="text-[10px] uppercase tracking-ultra-wide text-gold font-mono">
                  Jordan · Guimaras Island · Philippines
                </span>
              </div>
            </div>

            <p className="text-xs text-soft-beige/70 font-light leading-relaxed max-w-sm pt-2">
              A contemporary editorial dining destination celebrating authentic Western Visayas heirloom recipes, fresh Jordan catches, and warm Hiligaynon hospitality.
            </p>
          </div>

          {/* Location & Schedule */}
          <div className="md:col-span-4 space-y-3 text-xs font-mono text-soft-beige/80">
            <span className="text-[10px] uppercase tracking-widest text-gold block font-semibold mb-2">
              Jordan Sanctuary
            </span>
            <div className="flex items-start space-x-2.5">
              <MapPin className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
              <span>{restaurantData.location.fullAddress}</span>
            </div>
            <div className="text-[11px] text-soft-beige/60 pl-6">
              {restaurantData.location.landmarks}
            </div>
            <div className="pt-2 pl-6 text-[11px] text-gold-light">
              Daily Lunch & Dinner · 10:30 AM – 9:00 PM
            </div>
          </div>

          {/* Direct Contacts & Social */}
          <div className="md:col-span-3 space-y-3 text-xs font-mono">
            <span className="text-[10px] uppercase tracking-widest text-gold block font-semibold mb-2">
              Direct Contact
            </span>
            <div className="flex items-center space-x-2 text-soft-beige/80">
              <Phone className="w-3.5 h-3.5 text-gold flex-shrink-0" />
              <span>{restaurantData.contact.phone}</span>
            </div>
            <div className="flex items-center space-x-2 text-soft-beige/80">
              <Mail className="w-3.5 h-3.5 text-gold flex-shrink-0" />
              <span>{restaurantData.contact.email}</span>
            </div>

            {/* Social Media Links */}
            <div className="pt-4 flex flex-wrap gap-2 items-center">
              {restaurantData.socialLinks.map((item, i) => (
                <a
                  key={i}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 border border-cream/20 bg-espresso/60 text-[10px] uppercase tracking-widest text-soft-beige hover:text-gold hover:border-gold transition-colors font-mono"
                >
                  {item.name}
                </a>
              ))}

              <button
                onClick={onScrollToTop}
                className="p-2 border border-cream/20 text-soft-beige hover:text-gold hover:border-gold transition-colors ml-1"
                title="Return to top"
                aria-label="Back to top"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-soft-beige/50 font-mono tracking-wider gap-4">
          <div>
            © {new Date().getFullYear()} KOZYNA RESTAURANT. SAN MIGUEL, JORDAN, GUIMARAS, PHILIPPINES. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center space-x-6 text-[10px]">
            <span>Postal Code 5045</span>
            <span>·</span>
            <span>Western Visayas</span>
            <span>·</span>
            <span>Contemporary Island Gastronomy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
