import React, { useEffect, useRef } from 'react';
import { Sparkles, UtensilsCrossed, Award, Sprout, Flame, Heart } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { restaurantData } from '../data/restaurant';

gsap.registerPlugin(ScrollTrigger);

export default function ChefSection() {
  const chef = restaurantData.chef;
  const sectionRef = useRef(null);
  const portraitRef = useRef(null);
  const bioRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      // Portrait reveal
      if (portraitRef.current) {
        gsap.fromTo(
          portraitRef.current,
          { opacity: 0, scale: 0.94, y: 30 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.0,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: portraitRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Bio text elements
      if (bioRef.current) {
        gsap.fromTo(
          bioRef.current.children,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: bioRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="chef-section"
      className="py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-espresso text-ivory border-b border-cream/15 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Label */}
        <div className="mb-14">
          <span className="inline-flex items-center space-x-2 text-[10px] uppercase tracking-ultra-wide text-gold font-mono px-3.5 py-1.5 bg-dark-brown/60 border border-gold/30">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>Section 05 · Culinary Leadership & Vision</span>
          </span>
        </div>

        {/* Editorial Magazine Grid Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Chef Portrait with Gold Frame Accents */}
          <div ref={portraitRef} className="lg:col-span-5 relative">
            <div className="relative aspect-[3/4] overflow-hidden border border-gold/40 shadow-2xl bg-dark-brown">
              <img
                src={chef.portrait}
                alt={chef.name}
                className="w-full h-full object-cover filter contrast-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso via-transparent to-transparent opacity-85" />

              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[10px] uppercase tracking-ultra-wide font-mono text-gold block mb-1">
                  Executive Head Chef
                </span>
                <h3 className="font-serif text-3xl text-ivory font-normal">
                  {chef.name}
                </h3>
                <span className="text-xs text-soft-beige/70 font-mono mt-0.5 block">
                  Jordan, Guimaras Native
                </span>
              </div>
            </div>

            {/* Inset Credential Badge */}
            <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-dark-brown border border-gold/40 p-4 shadow-xl max-w-[210px] hidden sm:block">
              <span className="text-[10px] uppercase tracking-wider font-mono text-gold block mb-0.5">
                Guimaras Provenance
              </span>
              <p className="text-xs text-soft-beige/90 font-serif italic">
                {chef.experienceYears}
              </p>
            </div>
          </div>

          {/* Chef Biography & Philosophy Text */}
          <div ref={bioRef} className="lg:col-span-7 space-y-6">
            <span className="text-xs uppercase tracking-widest-editorial text-gold font-mono block">
              {chef.role}
            </span>

            <h2 className="font-serif text-4xl sm:text-5xl text-ivory font-normal tracking-wide leading-tight">
              {chef.name}
            </h2>

            <p className="font-serif italic text-2xl sm:text-3xl text-gold-light font-normal leading-snug">
              “{chef.headline}”
            </p>

            {/* Food Philosophy Pullquote */}
            <blockquote className="border-l-2 border-gold pl-6 py-3 my-6 text-base sm:text-lg text-cream/95 italic font-serif leading-relaxed bg-dark-brown/40">
              {chef.philosophy}
            </blockquote>

            {/* Biography */}
            <p className="font-sans text-sm sm:text-base text-soft-beige/90 font-light leading-relaxed">
              {chef.biography}
            </p>

            {/* Culinary Philosophy Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-cream/15 text-xs text-soft-beige/80">
              <div className="flex items-start space-x-3 bg-dark-brown/40 p-3.5 border border-cream/10">
                <Sprout className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-ivory block font-mono uppercase text-[10px] tracking-wider mb-0.5">
                    Island Sourcing & Foraging
                  </strong>
                  Daily partnerships with smallholders across Jordan, Buenavista, and artisanal coastal fisherfolk.
                </div>
              </div>

              <div className="flex items-start space-x-3 bg-dark-brown/40 p-3.5 border border-cream/10">
                <Flame className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-ivory block font-mono uppercase text-[10px] tracking-wider mb-0.5">
                    Wood-Fire & Scratch Craft
                  </strong>
                  Slow 8-hour braises, wild batwan souring, and traditional charcoal searing.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
