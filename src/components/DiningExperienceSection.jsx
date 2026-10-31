import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Star, Users, Music, Trees, Sun, Heart, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { restaurantData } from '../data/restaurant';

gsap.registerPlugin(ScrollTrigger);

export default function DiningExperienceSection({ onOpenReservation }) {
  const exp = restaurantData.diningExperience;
  const [activeReviewIdx, setActiveReviewIdx] = useState(0);
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  // Auto-advance reviews gently
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveReviewIdx((prev) => (prev + 1) % exp.verifiedReviews.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [exp.verifiedReviews.length]);

  // GSAP scroll trigger
  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.experience-bento-tile',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: gridRef.current || sectionRef.current,
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
      id="experience-section"
      className="py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-[#ECE4D8] text-espresso border-b border-soft-beige/60"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 pb-8 border-b border-soft-beige/70 gap-6">
          <div>
            <span className="inline-flex items-center space-x-2 text-[10px] uppercase tracking-ultra-wide text-muted-olive font-mono mb-2">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span>Section 06 · Dining Atmosphere & Ambiance</span>
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl text-espresso font-normal tracking-tight">
              Good Food. Great Company.
            </h2>
            <p className="font-serif italic text-xl sm:text-2xl text-dark-brown/80 mt-2">
              “{exp.headline} An orchestration of island breezes, ambient lighting, and shared tables.”
            </p>
          </div>

          <div className="text-xs font-mono text-dark-brown/70 flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-gold flex-shrink-0" />
            <span>San Miguel, Jordan, Guimaras</span>
          </div>
        </div>

        {/* ============================================================== */}
        {/* BENTO GRID: INTERIOR & EXTERIOR PHOTOGRAPHY + ATMOSPHERE      */}
        {/* ============================================================== */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch mb-12">
          {/* Tile 1: LARGE INTERIOR PHOTO CARD (Span 8) */}
          <div className="experience-bento-tile md:col-span-12 lg:col-span-8 bg-white border border-soft-beige shadow-sm overflow-hidden flex flex-col group">
            <div className="relative aspect-[16/10] overflow-hidden bg-espresso">
              <img
                src={restaurantData.interiorPhoto}
                alt="Kozyna Restaurant Interior Pavilion with Steel Trusses and Edison Chandeliers"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-transparent to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-espresso/90 text-ivory text-[10px] uppercase tracking-widest-editorial font-mono">
                  Main Pavilion Hall
                </span>
              </div>
              <div className="absolute bottom-5 left-6 right-6 text-ivory">
                <span className="text-[10px] uppercase tracking-widest-editorial text-gold font-mono block mb-1">
                  Architecture & Light
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-light">
                  Open-Air High Steel Trusses & Cage Chandeliers
                </h3>
              </div>
            </div>

            <div className="p-6 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="text-xs sm:text-sm text-dark-brown/85 font-sans font-light leading-relaxed max-w-xl">
                Soaring gabled roofs and open timber bays invite fresh Guimaras breezes across polished floors. Under warm Edison cage chandeliers, every table is positioned for conversation and intimacy.
              </p>
              <div className="flex items-center space-x-2 text-xs font-mono text-muted-olive flex-shrink-0">
                <Sun className="w-4 h-4 text-gold" />
                <span>Naturally Ventilated</span>
              </div>
            </div>
          </div>

          {/* Tile 2: AMBIANCE HIGHLIGHT EDITORIAL CARD (Span 4) */}
          <div className="experience-bento-tile md:col-span-12 lg:col-span-4 bg-[#EAE1D4] border border-soft-beige p-7 sm:p-8 flex flex-col justify-between shadow-sm">
            <div>
              <span className="text-[10px] uppercase tracking-ultra-wide text-muted-olive font-mono block mb-2">
                Atmosphere Notes
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-espresso mb-3 font-normal leading-tight">
                Sensory Elements of the Kozyna Table
              </h3>
              <p className="text-xs text-dark-brown/80 font-sans font-light leading-relaxed mb-6">
                {exp.description}
              </p>

              <div className="space-y-4">
                <div className="flex items-start space-x-3 bg-white/70 p-3.5 border border-soft-beige/70">
                  <Trees className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-espresso font-serif text-sm block">Al Fresco Pavilion</strong>
                    <span className="text-[11px] text-dark-brown/70 leading-snug block">
                      Surrounded by tropical Guimaras palms and landscaped gardens.
                    </span>
                  </div>
                </div>

                <div className="flex items-start space-x-3 bg-white/70 p-3.5 border border-soft-beige/70">
                  <Music className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-espresso font-serif text-sm block">Sunset Acoustic Sessions</strong>
                    <span className="text-[11px] text-dark-brown/70 leading-snug block">
                      Gentle acoustic serenades every Friday through Sunday twilight.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-soft-beige/60">
              <button
                onClick={onOpenReservation}
                className="w-full py-3 bg-espresso text-ivory hover:bg-gold hover:text-espresso text-xs uppercase tracking-widest-editorial font-semibold transition-colors shadow-sm"
              >
                Reserve Your Ambiance
              </button>
            </div>
          </div>

          {/* Tile 3: EXTERIOR PHOTO CARD (Span 6) */}
          <div className="experience-bento-tile md:col-span-6 bg-white border border-soft-beige shadow-sm overflow-hidden flex flex-col group">
            <div className="relative aspect-[16/11] overflow-hidden bg-espresso">
              <img
                src={restaurantData.exteriorPhoto}
                alt="Kozyna Restaurant Entrance with Stacked Stone Pillars and Marquee"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-transparent to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-espresso/90 text-ivory text-[10px] uppercase tracking-widest-editorial font-mono">
                  The Arrival & Grounds
                </span>
              </div>
              <div className="absolute bottom-5 left-6 right-6 text-ivory">
                <span className="text-[10px] uppercase tracking-widest-editorial text-gold font-mono block mb-1">
                  Exterior & Garden Marquee
                </span>
                <h4 className="font-serif text-2xl font-light">
                  Stacked Brick Pillars & Tropical Palms
                </h4>
              </div>
            </div>

            <div className="p-6">
              <p className="text-xs text-dark-brown/85 font-sans font-light leading-relaxed">
                Guests arrive through our signature stacked brick entrance pillars beneath the glowing timber KOZYNA wordmark, leading into open-air marquee spaces and welcoming island lawns.
              </p>
            </div>
          </div>

          {/* Tile 4: FAMILY & GROUP DINING CARD (Span 6) */}
          <div className="experience-bento-tile md:col-span-6 bg-white border border-soft-beige p-7 sm:p-8 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center space-x-2 text-muted-olive text-[10px] uppercase tracking-ultra-wide font-mono mb-2">
                <Users className="w-3.5 h-3.5 text-gold" />
                <span>Gatherings & Celebrations</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-espresso mb-3 font-normal">
                Family & Group Dining
              </h3>

              <p className="text-xs sm:text-sm text-dark-brown/80 font-sans font-light leading-relaxed mb-6">
                Filipino dining is fundamentally communal. Kozyna is built to host joyful multi-generational reunions, intimate milestone anniversaries, birthday banquets, and friends traveling together from across the Visayas.
              </p>

              <div className="grid grid-cols-2 gap-3 text-xs font-mono mb-6">
                <div className="p-3 bg-[#F4EEE5] border border-soft-beige/70">
                  <span className="text-gold font-semibold text-sm block font-serif">20 – 120 Guests</span>
                  <span className="text-[10px] text-dark-brown/70">Banquet & Pavilion Capacity</span>
                </div>
                <div className="p-3 bg-[#F4EEE5] border border-soft-beige/70">
                  <span className="text-gold font-semibold text-sm block font-serif">Private Suite</span>
                  <span className="text-[10px] text-dark-brown/70">Intimate Curated Rooms</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-soft-beige/60 flex items-center justify-between text-xs font-mono text-muted-olive">
              <span className="flex items-center space-x-1.5">
                <Heart className="w-3.5 h-3.5 text-gold" />
                <span>Customized Tasting Menus Available</span>
              </span>
              <button
                onClick={onOpenReservation}
                className="text-espresso hover:text-gold font-semibold transition-colors"
              >
                Book Group →
              </button>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* VERIFIED GUEST TESTIMONIALS SPREAD                              */}
        {/* ============================================================== */}
        <div className="bg-white border border-soft-beige p-8 sm:p-12 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 pb-4 border-b border-soft-beige/50 gap-4">
            <div>
              <span className="text-[10px] uppercase tracking-ultra-wide text-muted-olive font-mono block mb-1">
                Verified Customer Testimonials
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-espresso font-normal">
                Memories Around Our Table
              </h3>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1 text-gold">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>
              <span className="text-xs font-mono text-dark-brown/60 ml-2">5.0 / 5.0 Rating</span>
            </div>
          </div>

          {/* Active Review Quote */}
          <div className="min-h-[120px] flex flex-col justify-between">
            <blockquote className="font-serif italic text-xl sm:text-2xl text-espresso leading-relaxed mb-6">
              “{exp.verifiedReviews[activeReviewIdx].quote}”
            </blockquote>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t border-soft-beige/40 gap-3">
              <div>
                <span className="text-sm font-semibold text-espresso">
                  {exp.verifiedReviews[activeReviewIdx].author}
                </span>
                <span className="text-xs text-dark-brown/60 ml-2 font-mono">
                  · {exp.verifiedReviews[activeReviewIdx].location}
                </span>
              </div>

              {/* Prev / Next & Dots */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={() =>
                    setActiveReviewIdx(
                      (prev) => (prev - 1 + exp.verifiedReviews.length) % exp.verifiedReviews.length
                    )
                  }
                  className="p-1 text-dark-brown/60 hover:text-espresso transition-colors"
                  aria-label="Previous Review"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="flex space-x-2">
                  {exp.verifiedReviews.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveReviewIdx(i)}
                      className={`w-2.5 h-2.5 rounded-full transition-colors ${
                        i === activeReviewIdx ? 'bg-gold' : 'bg-soft-beige hover:bg-dark-brown/40'
                      }`}
                      aria-label={`Show review ${i + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={() =>
                    setActiveReviewIdx((prev) => (prev + 1) % exp.verifiedReviews.length)
                  }
                  className="p-1 text-dark-brown/60 hover:text-espresso transition-colors"
                  aria-label="Next Review"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
