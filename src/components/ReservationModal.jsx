import React, { useState } from 'react';
import { X, Calendar, Users, Clock, MapPin, CheckCircle, Phone, Sparkles } from 'lucide-react';
import { restaurantData } from '../data/restaurant';

export default function ReservationModal({ isOpen, onClose, preselectedDish = null }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '18:00',
    guests: '2',
    seating: 'Unlimited Filipino & Pan-Asian Buffet (₱299 - ₱349)',
    promo: 'None',
    notes: preselectedDish ? `Interested in reserving dish: ${preselectedDish.name}` : '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [refCode, setRefCode] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const code = `KZN-${Math.floor(1000 + Math.random() * 9000)}`;
    setRefCode(code);
    setSubmitted(true);
  };

  const resetForm = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-espresso/85 backdrop-blur-md pointer-events-auto animate-fadeIn overflow-y-auto">
      <div
        className="relative w-full max-w-xl bg-dark-brown/95 border border-cream/20 shadow-2xl p-6 sm:p-10 my-8 text-ivory"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-espresso/60 border border-cream/20 text-ivory hover:text-gold hover:border-gold transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            {/* Header */}
            <div className="text-center mb-8">
              <span className="text-[10px] uppercase tracking-ultra-wide text-gold font-mono block mb-1">
                Table Reservation Inquiry
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-ivory font-normal">
                A Seat at the Table
              </h2>
              <p className="text-xs text-soft-beige/70 mt-1 font-sans">
                Brgy. Alaguisoc (Beside GSU Mosqueda), Jordan, Guimaras · +63 953 425 6428 / +63 969 583 6203
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase tracking-widest-editorial text-soft-beige/80 mb-1 font-mono text-[10px]">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="e.g. Maria Santos"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-espresso/60 border border-cream/15 px-3 py-2.5 text-ivory placeholder-soft-beige/40 focus:outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block uppercase tracking-widest-editorial text-soft-beige/80 mb-1 font-mono text-[10px]">
                    Mobile Contact *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="+63 9XX XXX XXXX"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-espresso/60 border border-cream/15 px-3 py-2.5 text-ivory placeholder-soft-beige/40 focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block uppercase tracking-widest-editorial text-soft-beige/80 mb-1 font-mono text-[10px]">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-espresso/60 border border-cream/15 px-3 py-2.5 text-ivory placeholder-soft-beige/40 focus:outline-none focus:border-gold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block uppercase tracking-widest-editorial text-soft-beige/80 mb-1 font-mono text-[10px]">
                    Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    required
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full bg-espresso/60 border border-cream/15 px-3 py-2.5 text-ivory focus:outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block uppercase tracking-widest-editorial text-soft-beige/80 mb-1 font-mono text-[10px]">
                    Preferred Time *
                  </label>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full bg-espresso/60 border border-cream/15 px-3 py-2.5 text-ivory focus:outline-none focus:border-gold"
                  >
                    <option value="11:30" className="bg-espresso">11:30 AM (Lunch)</option>
                    <option value="12:30" className="bg-espresso">12:30 PM (Lunch)</option>
                    <option value="14:00" className="bg-espresso">02:00 PM (Afternoon)</option>
                    <option value="17:30" className="bg-espresso">05:30 PM (Sunset)</option>
                    <option value="18:30" className="bg-espresso">06:30 PM (Dinner)</option>
                    <option value="19:30" className="bg-espresso">07:30 PM (Dinner)</option>
                    <option value="20:30" className="bg-espresso">08:30 PM (Late Dinner)</option>
                  </select>
                </div>
                <div>
                  <label className="block uppercase tracking-widest-editorial text-soft-beige/80 mb-1 font-mono text-[10px]">
                    Guests *
                  </label>
                  <select
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    className="w-full bg-espresso/60 border border-cream/15 px-3 py-2.5 text-ivory focus:outline-none focus:border-gold"
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20].map((num) => (
                      <option key={num} value={num} className="bg-espresso">
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                    <option value="25+" className="bg-espresso">Banquet (25+ Guests)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block uppercase tracking-widest-editorial text-soft-beige/80 mb-1 font-mono text-[10px]">
                  Dining Experience or Event Inquiry
                </label>
                <select
                  name="seating"
                  value={formData.seating}
                  onChange={handleChange}
                  className="w-full bg-espresso/60 border border-cream/15 px-3 py-2.5 text-ivory focus:outline-none focus:border-gold"
                >
                  <option value="Unlimited Filipino & Pan-Asian Buffet (₱299)" className="bg-espresso">
                    Unlimited Filipino & Pan-Asian Buffet (₱299 / person)
                  </option>
                  <option value="Weekend Signature Feast & Sushi (₱355)" className="bg-espresso">
                    Weekend Signature Feast & Unlimited Sushi (₱355 / person)
                  </option>
                  <option value="All-Inclusive Party / Event Package" className="bg-espresso">
                    All-Inclusive Party Package (Birthday, Wedding, Debut, Reunion)
                  </option>
                  <option value="Casual À La Carte Dining" className="bg-espresso">
                    Casual À La Carte Dining (Indoor Air-Conditioned Pavilion)
                  </option>
                  <option value="Botanical Garden Al Fresco" className="bg-espresso">
                    Botanical Garden Al Fresco (Naturally Ventilated)
                  </option>
                </select>
              </div>

              <div>
                <label className="block uppercase tracking-widest-editorial text-soft-beige/80 mb-1 font-mono text-[10px]">
                  Availing Ongoing Promos & Deals? (Optional)
                </label>
                <select
                  name="promo"
                  value={formData.promo}
                  onChange={handleChange}
                  className="w-full bg-espresso/60 border border-cream/15 px-3 py-2.5 text-ivory focus:outline-none focus:border-gold"
                >
                  <option value="None" className="bg-espresso">No Promo / Regular Dining</option>
                  <option value="Birthday Promo (Celebrant Eats FREE with 5 paying guests)" className="bg-espresso">
                    🎂 Birthday Celebrant Dines FREE (with at least 5 paying guests)
                  </option>
                  <option value="Barkada Deal (6+1: Pay 6, Dine 7)" className="bg-espresso">
                    👥 Barkada Deal: Pay for 6, Get 1 FREE (6+1)
                  </option>
                  <option value="Family Deal (12+2: Pay 12, Dine 14)" className="bg-espresso">
                    🎉 Big Family Deal: Pay for 12, Get 2 FREE (12+2)
                  </option>
                  <option value="Loyalty Stamp Card (5th visit 50% / 8th visit FREE)" className="bg-espresso">
                    ⭐ Kozyna Loyalty Card (5th visit 50% Off / 8th visit 100% Free)
                  </option>
                  <option value="Senior Citizen / PWD 20% Discount" className="bg-espresso">
                    🎖️ Senior Citizen / PWD 20% Mandatory Privilege
                  </option>
                </select>
              </div>

              <div>
                <label className="block uppercase tracking-widest-editorial text-soft-beige/80 mb-1 font-mono text-[10px]">
                  Dietary Preferences, Event Details or Special Requests
                </label>
                <textarea
                  name="notes"
                  rows={2}
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Event type, party theme, allergies, special dish requests..."
                  className="w-full bg-espresso/60 border border-cream/15 px-3 py-2.5 text-ivory placeholder-soft-beige/40 focus:outline-none focus:border-gold resize-none"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-gold text-espresso hover:bg-gold-light text-xs uppercase tracking-widest-editorial font-semibold transition-all duration-300 shadow-md hover:shadow-gold/30"
                >
                  Confirm Reservation Inquiry
                </button>
                <p className="text-[10px] text-center text-soft-beige/60 mt-2 font-light">
                  Our front-of-house team will confirm your table promptly via Call / SMS or Facebook.
                </p>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation State */
          <div className="text-center py-6">
            <CheckCircle className="w-14 h-14 text-gold mx-auto mb-4 animate-bounce" />
            <span className="text-[10px] uppercase tracking-ultra-wide text-gold font-mono block mb-1">
              Inquiry Received
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-ivory mb-2">
              We Look Forward To Welcoming You
            </h2>
            <div className="inline-block px-4 py-2 bg-espresso border border-gold/30 text-gold font-mono text-sm tracking-widest my-4">
              REFERENCE: {refCode}
            </div>

            <div className="bg-espresso/50 border border-cream/10 p-5 max-w-md mx-auto text-left text-xs space-y-2 text-soft-beige/90 mb-6">
              <div><strong className="text-ivory">Guest:</strong> {formData.name}</div>
              <div><strong className="text-ivory">Date & Time:</strong> {formData.date} at {formData.time}</div>
              <div><strong className="text-ivory">Party Size:</strong> {formData.guests} Guests ({formData.seating})</div>
              {formData.promo && formData.promo !== 'None' && (
                <div><strong className="text-ivory">Promo / Deal:</strong> <span className="text-gold font-medium">{formData.promo}</span></div>
              )}
              <div><strong className="text-ivory">Direct Lines:</strong> +63 953 425 6428 · +63 969 583 6203</div>
            </div>

            <button
              onClick={resetForm}
              className="px-8 py-3 bg-gold text-espresso text-xs uppercase tracking-widest-editorial font-semibold hover:bg-gold-light transition-colors"
            >
              Return to Dining Journey
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
