import React, { useEffect, useRef } from 'react';
import { Sparkles, Sprout, Compass, HeartHandshake, Leaf, Sun, Waves } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { restaurantData } from '../data/restaurant';

gsap.registerPlugin(ScrollTrigger);

export default function StorySection() {
  const story = restaurantData.story;
  const sectionRef = useRef(null);
  const narrativeRef = useRef(null);
  const pillarsRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      // Narrative text reveal
      if (narrativeRef.current) {
        gsap.fromTo(
          narrativeRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: narrativeRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Pillars reveal
      if (pillarsRef.current) {
        gsap.fromTo(
          pillarsRef.current.children,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: pillarsRef.current,
              start: 'top 85%',
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
      id="story-section"
      className="py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-cream text-espresso border-b border-soft-beige/50"
    >
      <div className="max-w-7xl mx-auto">
        {/* Editorial Section Label */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center space-x-2 text-[10px] uppercase tracking-ultra-wide text-muted-olive font-mono mb-2">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>Section 04 · Our Story & Philosophy</span>
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl text-espresso font-normal tracking-tight">
            More Than Just a Place to Eat.
          </h2>
          <p className="font-serif italic text-xl sm:text-2xl text-dark-brown/80 mt-2">
            “The soil, the sea, and the soulful spirit of Jordan, Guimaras.”
          </p>
        </div>

        {/* Magazine Asymmetrical Spread */}
        <div ref={narrativeRef} className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-20">
          {/* Left Column: Two Columns of Editorial Text with Drop Cap */}
          <div className="lg:col-span-7 space-y-6 text-sm sm:text-base text-dark-brown/90 font-sans font-light leading-relaxed">
            <p className="first-letter:text-5xl first-letter:font-serif first-letter:text-gold first-letter:float-left first-letter:mr-3 first-letter:leading-none">
              {story.narrative[0]}
            </p>
            <p>
              {story.narrative[1]}
            </p>
            <p>
              {story.narrative[2]}
            </p>
            <p className="font-serif italic text-lg sm:text-xl text-espresso leading-snug pt-2 border-t border-soft-beige/60">
              “{story.narrative[3]}”
            </p>
          </div>

          {/* Right Column: Editorial Visual Inset */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] overflow-hidden border border-soft-beige shadow-2xl bg-espresso/10">
              <img
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80"
                alt="Guimaras Coastal Landscape"
                className="w-full h-full object-cover filter contrast-105 hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-ivory">
                <span className="text-[10px] uppercase tracking-widest-editorial text-gold font-mono block mb-1">
                  Island Provenance
                </span>
                <p className="font-serif text-xl sm:text-2xl">
                  Guimaras Island, Western Visayas
                </p>
                <p className="text-xs text-cream/80 font-light mt-1">
                  Surrounded by the gentle waves of the Iloilo Strait and sun-drenched mango groves.
                </p>
              </div>
            </div>

            {/* Inset Terroir Quote Tag */}
            <div className="absolute -top-5 -right-3 sm:-right-6 bg-white/95 border border-soft-beige px-4 py-3 shadow-lg max-w-[200px] hidden sm:block">
              <span className="text-[9px] uppercase tracking-widest font-mono text-muted-olive block mb-0.5">
                Territory & Craft
              </span>
              <p className="text-xs font-serif italic text-espresso">
                Farm-to-fork sourcing from Jordan smallholders.
              </p>
            </div>
          </div>
        </div>

        {/* What Makes Kozyna Special: 3 Core Pillars */}
        <div className="mb-6">
          <div className="text-center mb-10">
            <span className="text-[10px] uppercase tracking-ultra-wide text-muted-olive font-mono block mb-1">
              The Guiding Pillars
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-espresso">
              What Defines The Kozyna Table
            </h3>
          </div>

          <div ref={pillarsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {story.pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="bg-white/85 border border-soft-beige p-7 sm:p-8 shadow-sm hover:shadow-lg hover:border-gold/60 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-full border border-gold/50 flex items-center justify-center text-gold mb-5 bg-cream/40">
                    {idx === 0 && <Sprout className="w-5 h-5 text-gold" />}
                    {idx === 1 && <Compass className="w-5 h-5 text-gold" />}
                    {idx === 2 && <HeartHandshake className="w-5 h-5 text-gold" />}
                  </div>

                  <span className="text-[10px] uppercase tracking-widest text-muted-olive font-mono block mb-1">
                    Pillar 0{idx + 1}
                  </span>

                  <h4 className="font-serif text-2xl text-espresso mb-3 font-medium">
                    {pillar.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-dark-brown/80 font-sans font-light leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-soft-beige/50 flex items-center space-x-2 text-[11px] font-mono text-muted-olive">
                  {idx === 0 && (
                    <>
                      <Waves className="w-3.5 h-3.5 text-gold" />
                      <span>Guimaras Strait catch</span>
                    </>
                  )}
                  {idx === 1 && (
                    <>
                      <Sun className="w-3.5 h-3.5 text-gold" />
                      <span>Wood-fired alchemy</span>
                    </>
                  )}
                  {idx === 2 && (
                    <>
                      <Leaf className="w-3.5 h-3.5 text-gold" />
                      <span>Warm Hiligaynon welcome</span>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
