import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, MapPin, Clock, Phone, Mail, Navigation, ExternalLink, Calendar, CheckCircle, Facebook, Instagram, Compass } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { restaurantData } from '../data/restaurant';

gsap.registerPlugin(ScrollTrigger);

export default function VisitSection({ onOpenReservation }) {
  const loc = restaurantData.location;
  const sectionRef = useRef(null);

  // Local reservation form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '18:00',
    guests: '2',
    seating: 'Indoor Hardwood Hall',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [refCode, setRefCode] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const code = `KZN-${Math.floor(1000 + Math.random() * 9000)}`;
    setRefCode(code);
    setSubmitted(true);
  };

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.visit-reveal-col',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="visit-section"
      className="py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-espresso text-ivory border-b border-cream/15 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center space-x-2 text-[10px] uppercase tracking-ultra-wide text-gold font-mono px-3.5 py-1.5 bg-dark-brown/60 border border-gold/30 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>Section 07 · Location & Table Reservations</span>
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl text-ivory font-normal tracking-tight">
            Your Table Awaits.
          </h2>
          <p className="font-serif italic text-xl sm:text-2xl text-gold-light mt-2">
            “Located in the tranquil agricultural heart of Jordan, Guimaras.”
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left Column: Practical Location, Hours & Travel Information */}
          <div className="visit-reveal-col lg:col-span-5 space-y-6">
            {/* Confirmed Address Card */}
            <div className="bg-dark-brown/70 border border-cream/15 p-6 sm:p-8 shadow-xl">
              <div className="flex items-center space-x-2 text-gold text-xs uppercase tracking-wider mb-2 font-mono">
                <MapPin className="w-4 h-4" />
                <span>Verified Restaurant Location</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-ivory mb-1 font-normal">
                {loc.fullAddress}
              </h3>
              <p className="text-xs text-soft-beige/80 mb-4 font-mono">
                {loc.landmarks}
              </p>

              {/* Travel Guidance */}
              <div className="text-xs text-soft-beige/90 border-t border-cream/10 pt-4 leading-relaxed font-light">
                <strong className="text-ivory block font-mono uppercase text-[10px] tracking-wider mb-1 text-gold">
                  Getting Here from Iloilo City:
                </strong>
                {loc.travelNote}
              </div>

              {/* Google Maps Actions */}
              <div className="mt-6 pt-4 border-t border-cream/10 flex flex-col sm:flex-row gap-3">
                <a
                  href={loc.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 bg-gold text-espresso hover:bg-gold-light text-xs uppercase tracking-widest-editorial font-semibold transition-colors flex items-center justify-center space-x-2 shadow-sm"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Get Google Maps Directions</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1" />
                </a>
              </div>
            </div>

            {/* Operating Hours Card */}
            <div className="bg-dark-brown/70 border border-cream/15 p-6 sm:p-8 shadow-xl">
              <div className="flex items-center space-x-2 text-gold text-xs uppercase tracking-wider mb-4 font-mono">
                <Clock className="w-4 h-4" />
                <span>Operating Hours</span>
              </div>
              <div className="space-y-3.5 text-xs">
                {restaurantData.operatingHours.map((sched, idx) => (
                  <div key={idx} className="flex justify-between items-baseline border-b border-cream/10 pb-2.5">
                    <span className="text-ivory font-serif text-base">{sched.days}</span>
                    <div className="text-right">
                      <span className="text-gold font-mono font-medium block">{sched.hours}</span>
                      <span className="text-[10px] text-soft-beige/60">{sched.notes}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Contacts & Social Links */}
            <div className="bg-dark-brown/70 border border-cream/15 p-6 space-y-4 shadow-xl">
              <div className="text-xs space-y-3 font-mono">
                <div className="flex items-start space-x-3 text-soft-beige/90">
                  <Phone className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <div className="text-[10px] uppercase text-gold/80 font-semibold">Call or Text for Inquiries:</div>
                    <div className="flex flex-wrap gap-x-3">
                      <a href="tel:+639534256428" className="hover:text-gold transition-colors underline font-medium">
                        +63 953 425 6428
                      </a>
                      <span>·</span>
                      <a href="tel:+639695836203" className="hover:text-gold transition-colors underline font-medium">
                        +63 969 583 6203
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 text-soft-beige/90">
                  <Facebook className="w-4 h-4 text-gold flex-shrink-0" />
                  <a
                    href="https://www.facebook.com/Kozynarestaurant/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gold transition-colors underline truncate"
                  >
                    facebook.com/Kozynarestaurant
                  </a>
                </div>

                <div className="flex items-center space-x-3 text-soft-beige/90">
                  <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                  <span>{restaurantData.contact.email}</span>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="pt-3 border-t border-cream/10 flex flex-wrap gap-2 items-center">
                <span className="text-[10px] uppercase font-mono text-soft-beige/60 mr-2">Official Channels:</span>
                {restaurantData.socialLinks.map((s, idx) => (
                  <a
                    key={idx}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 border border-cream/20 hover:border-gold hover:text-gold text-[11px] font-mono transition-colors text-ivory/80 bg-espresso/60"
                  >
                    {s.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Nearby Tourist Spots & Accommodations Concierge Card */}
            <div className="bg-dark-brown/70 border border-gold/30 p-6 space-y-4 shadow-xl">
              <div className="flex items-center space-x-2 text-gold text-xs uppercase tracking-wider font-mono">
                <Compass className="w-4 h-4 text-gold" />
                <span>Jordan Tourist Spots & Nearby Stays</span>
              </div>
              <p className="text-xs text-soft-beige/80 font-light leading-relaxed">
                Planning a day tour or weekend getaway to Jordan, Guimaras? Kozyna is centrally located right on the travel route.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-[11px] font-mono border-t border-cream/10">
                <div className="space-y-1">
                  <strong className="text-ivory block uppercase tracking-wider text-[10px] text-gold">Nearby Attractions:</strong>
                  <div className="text-soft-beige/70">· GSU Mosqueda Campus (Beside us)</div>
                  <div className="text-soft-beige/70">· Guimaras Provincial Capitol (5 mins)</div>
                  <div className="text-soft-beige/70">· Balaan Bukid Pilgrimage Trail</div>
                  <div className="text-soft-beige/70">· Trappist Monastery (15 mins)</div>
                </div>
                <div className="space-y-1">
                  <strong className="text-ivory block uppercase tracking-wider text-[10px] text-gold">Nearby Accommodations:</strong>
                  <div className="text-soft-beige/70">· Zemkamps Chalet (Jordan)</div>
                  <div className="text-soft-beige/70">· Raymen Beach Resort (Alubihod)</div>
                  <div className="text-soft-beige/70">· Jannah-Glycel Beach House</div>
                  <div className="text-soft-beige/70">· Iloilo Hotels (15-min pump boat)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Table Reservation Booking Form */}
          <div className="visit-reveal-col lg:col-span-7 bg-dark-brown/85 border border-cream/20 p-8 sm:p-12 shadow-2xl">
            {!submitted ? (
              <div>
                <div className="mb-8 pb-4 border-b border-cream/15">
                  <span className="text-[10px] uppercase tracking-ultra-wide text-gold font-mono block mb-1">
                    Book Directly with the Kitchen
                  </span>
                  <h3 className="font-serif text-3xl sm:text-4xl text-ivory font-normal">
                    Reserve a Seat
                  </h3>
                  <p className="text-xs text-soft-beige/80 mt-1 font-light">
                    For dining reservations, private celebration suites, or family gatherings in Jordan.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block uppercase tracking-widest-editorial text-soft-beige/80 mb-1 font-mono text-[10px]">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="e.g. Maria Elena Cruz"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-espresso/80 border border-cream/15 px-3.5 py-3 text-ivory placeholder-soft-beige/40 focus:outline-none focus:border-gold"
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
                        className="w-full bg-espresso/80 border border-cream/15 px-3.5 py-3 text-ivory placeholder-soft-beige/40 focus:outline-none focus:border-gold"
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
                      className="w-full bg-espresso/80 border border-cream/15 px-3.5 py-3 text-ivory placeholder-soft-beige/40 focus:outline-none focus:border-gold"
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
                        className="w-full bg-espresso/80 border border-cream/15 px-3.5 py-3 text-ivory focus:outline-none focus:border-gold"
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
                        className="w-full bg-espresso/80 border border-cream/15 px-3.5 py-3 text-ivory focus:outline-none focus:border-gold"
                      >
                        <option value="11:30" className="bg-espresso">11:30 AM (Lunch)</option>
                        <option value="12:30" className="bg-espresso">12:30 PM (Lunch)</option>
                        <option value="14:00" className="bg-espresso">02:00 PM (Afternoon)</option>
                        <option value="17:30" className="bg-espresso">05:30 PM (Sunset Acoustic)</option>
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
                        className="w-full bg-espresso/80 border border-cream/15 px-3.5 py-3 text-ivory focus:outline-none focus:border-gold"
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
                      Atmosphere & Seating Preference
                    </label>
                    <select
                      name="seating"
                      value={formData.seating}
                      onChange={handleChange}
                      className="w-full bg-espresso/80 border border-cream/15 px-3.5 py-3 text-ivory focus:outline-none focus:border-gold"
                    >
                      <option value="Indoor Hardwood Hall" className="bg-espresso">
                        Indoor Dining Pavilion (Air-Conditioned / Steel Trusses)
                      </option>
                      <option value="Botanical Garden Al Fresco" className="bg-espresso">
                        Botanical Garden Al Fresco (Island Breeze)
                      </option>
                      <option value="Private Celebration Suite" className="bg-espresso">
                        Private Celebration Suite (Anniversary / VIP)
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block uppercase tracking-widest-editorial text-soft-beige/80 mb-1 font-mono text-[10px]">
                      Special Requests / Notes
                    </label>
                    <textarea
                      name="notes"
                      rows={2}
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="Special dietary requests, allergies, anniversary candles, preferred dishes..."
                      className="w-full bg-espresso/80 border border-cream/15 px-3.5 py-2.5 text-ivory placeholder-soft-beige/40 focus:outline-none focus:border-gold resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-4 bg-gold text-espresso hover:bg-gold-light text-xs uppercase tracking-widest-editorial font-semibold transition-all duration-300 shadow-md hover:shadow-gold/30 cursor-pointer"
                    >
                      Confirm Reservation Inquiry
                    </button>
                    <p className="text-[10px] text-center text-soft-beige/60 mt-2 font-light">
                      Our maître d' will confirm your table promptly via SMS or Phone call.
                    </p>
                  </div>
                </form>
              </div>
            ) : (
              /* Success State */
              <div className="text-center py-10">
                <CheckCircle className="w-16 h-16 text-gold mx-auto mb-4 animate-bounce" />
                <span className="text-[10px] uppercase tracking-ultra-wide text-gold font-mono block mb-1">
                  Inquiry Received
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl text-ivory mb-2">
                  We Look Forward To Welcoming You
                </h3>
                <div className="inline-block px-4 py-2 bg-espresso border border-gold/40 text-gold font-mono text-sm tracking-widest my-4">
                  BOOKING REFERENCE: {refCode}
                </div>

                <div className="bg-espresso/50 border border-cream/10 p-5 max-w-md mx-auto text-left text-xs space-y-2 text-soft-beige/90 mb-6">
                  <div><strong className="text-ivory">Guest:</strong> {formData.name}</div>
                  <div><strong className="text-ivory">Date & Time:</strong> {formData.date} at {formData.time}</div>
                  <div><strong className="text-ivory">Party Size:</strong> {formData.guests} Guests ({formData.seating})</div>
                  <div><strong className="text-ivory">Direct Contact:</strong> {restaurantData.contact.phone}</div>
                </div>

                <button
                  onClick={() => setSubmitted(false)}
                  className="px-8 py-3 bg-gold text-espresso text-xs uppercase tracking-widest-editorial font-semibold hover:bg-gold-light transition-colors"
                >
                  Make Another Inquiry
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
