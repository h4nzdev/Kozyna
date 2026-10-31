import React, { useEffect, useRef } from 'react';
import { ArrowDown, MapPin, Sparkles, Utensils, Compass } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { restaurantData } from '../data/restaurant';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection({
  onExploreMenu,
  onVisitUs,
  isLoaded = true,
}) {
  const containerRef = useRef(null);
  const metaBarRef = useRef(null);
  const wordmarkRef = useRef(null);
  const headlineRef = useRef(null);
  const quoteRef = useRef(null);
  const introRef = useRef(null);
  const ctaRef = useRef(null);
  const imageWrapperRef = useRef(null);
  const imageInnerRef = useRef(null);
  const floatingBadgeRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isLoaded || hasAnimated.current) return;
    hasAnimated.current = true;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });

      // 1. Top Meta Bar
      if (metaBarRef.current) {
        tl.fromTo(
          metaBarRef.current,
          { y: -20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' }
        );
      }

      // 2. Large KOZYNA Wordmark Entrance
      if (wordmarkRef.current) {
        tl.fromTo(
          wordmarkRef.current,
          { opacity: 0, y: 30, letterSpacing: '0.45em' },
          { opacity: 1, y: 0, letterSpacing: '0.28em', duration: 1.1, ease: 'power3.out' },
          '-=0.4'
        );
      }

      // 3. Editorial Headline
      if (headlineRef.current) {
        tl.fromTo(
          headlineRef.current,
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.6'
        );
      }

      // 4. Quote and Intro
      if (quoteRef.current && introRef.current) {
        tl.fromTo(
          [quoteRef.current, introRef.current],
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power2.out' },
          '-=0.5'
        );
      }

      // 5. CTAs
      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
          '-=0.4'
        );
      }

      // 6. Right Asymmetric Photographic Frame
      if (imageWrapperRef.current) {
        tl.fromTo(
          imageWrapperRef.current,
          { opacity: 0, scale: 0.95, y: 40 },
          { opacity: 1, scale: 1, y: 0, duration: 1.1, ease: 'power3.out' },
          '-=0.9'
        );
      }

      // 7. Floating Terroir Badge
      if (floatingBadgeRef.current) {
        tl.fromTo(
          floatingBadgeRef.current,
          { opacity: 0, x: -25 },
          { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' },
          '-=0.5'
        );
      }

      // Subtle scroll parallax on hero image
      if (imageInnerRef.current && containerRef.current) {
        gsap.to(imageInnerRef.current, {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isLoaded]);

  return (
    <section
      ref={containerRef}
      id="hero-section"
      className="relative min-h-screen bg-ivory text-espresso pt-28 pb-20 px-6 sm:px-10 lg:px-16 flex flex-col justify-between border-b border-soft-beige/50 overflow-hidden"
    >
      {/* Top Editorial Metadata Bar */}
      <div
        ref={metaBarRef}
        className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-soft-beige/50 text-[11px] uppercase tracking-widest-editorial font-mono text-dark-brown/70 gap-2"
      >
        <div className="flex items-center space-x-2">
          <Sparkles className="w-3.5 h-3.5 text-gold flex-shrink-0" />
          <span>Brgy. Alaguisoc · Jordan · Guimaras (Beside GSU Mosqueda)</span>
        </div>
        <div className="flex items-center space-x-6 text-[10px]">
          <span>10.5936° N, 122.5898° E</span>
          <span className="hidden sm:inline">·</span>
          <span>Open Daily 11 AM – 9 PM</span>
          <span className="hidden sm:inline">·</span>
          <span className="text-muted-olive font-semibold">Unlimited Filipino & Pan-Asian Buffet</span>
        </div>
      </div>

      {/* Hero Content Area */}
      <div className="max-w-7xl mx-auto w-full my-auto py-8 sm:py-12">
        {/* GRAND KOZYNA WORDMARK (Editorial Magazine Cover Style) */}
        <div className="text-center pt-2 pb-8 sm:pb-12 border-b border-soft-beige/40">
          <h1
            ref={wordmarkRef}
            className="font-serif text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[11.5rem] tracking-[0.25em] text-espresso uppercase font-normal select-none leading-none -mr-[0.25em]"
          >
            KOZYNA
          </h1>
          <p className="font-serif italic text-base sm:text-xl md:text-2xl text-dark-brown/80 mt-3 sm:mt-4 font-normal tracking-wide">
            The Home of Unlimited Filipino & Pan-Asian Buffet · Jordan, Guimaras
          </p>
        </div>

        {/* Asymmetrical Editorial Spread: Headline & Narrative (Left) + Featured Dish Photography (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center pt-10 sm:pt-14">
          {/* Left Column: Editorial Headline & Introduction */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2.5 px-3 py-1 bg-cream/70 border border-soft-beige text-[10px] uppercase tracking-ultra-wide font-mono text-muted-olive font-semibold">
              <Compass className="w-3 h-3 text-gold" />
              <span>Brgy. Alaguisoc · Right Beside GSU Mosqueda Campus</span>
            </div>

            {/* Editorial Headline */}
            <h2
              ref={headlineRef}
              className="font-serif text-4xl sm:text-6xl lg:text-7xl text-espresso font-normal tracking-tight leading-[0.98]"
            >
              Comforting Flavors, Unlimited Feasts.
            </h2>

            {/* Expressive Italic Quote */}
            <p
              ref={quoteRef}
              className="font-serif italic text-xl sm:text-2xl lg:text-3xl text-dark-brown/90 max-w-xl font-normal leading-snug"
            >
              “Experience paradise on your plate with budget-friendly all-you-can-eat spreads, sushi specials, and island warmth.”
            </p>

            {/* Short Restaurant Introduction */}
            <p
              ref={introRef}
              className="font-sans text-sm sm:text-base text-dark-brown/80 max-w-xl font-light leading-relaxed"
            >
              Welcome to Kozyna. Located along the main highway in Brgy. Alaguisoc, Jordan, Guimaras (right beside the Guimaras State University – Mosqueda Campus), we are the island's favorite spot for budget-friendly all-you-can-eat Filipino and Pan-Asian buffets (₱299 – ₱355/pax), weekend sushi feasts, and all-inclusive event celebrations.
            </p>

            {/* Primary CTAs: Explore Menu & Visit Us */}
            <div ref={ctaRef} className="pt-4 flex flex-wrap gap-4 items-center">
              <button
                onClick={onExploreMenu}
                className="px-8 py-4 bg-espresso text-ivory hover:bg-gold hover:text-espresso transition-all duration-300 text-xs uppercase tracking-widest-editorial font-semibold shadow-md flex items-center space-x-3 group cursor-pointer"
              >
                <Utensils className="w-4 h-4 text-gold group-hover:text-espresso transition-colors" />
                <span>Explore Menu & Buffets</span>
                <ArrowDown className="w-3.5 h-3.5 text-gold group-hover:text-espresso group-hover:translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={onVisitUs}
                className="px-8 py-4 border border-espresso/40 text-espresso hover:border-gold hover:text-gold bg-cream/40 hover:bg-cream transition-all duration-300 text-xs uppercase tracking-widest-editorial font-semibold flex items-center space-x-2.5 cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-gold" />
                <span>Visit Us & Reservations</span>
              </button>
            </div>

            {/* Terroir Feature Badges */}
            <div className="pt-4 flex flex-wrap gap-x-6 gap-y-2 text-[11px] font-mono text-dark-brown/70 border-t border-soft-beige/40">
              <span className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
                <span>Unlimited Filipino & Pan-Asian Buffets (₱299–₱355)</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
                <span>Weekend Signature Sushi Bar</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
                <span>Party & Event Packages</span>
              </span>
            </div>
          </div>

          {/* Right Column: Asymmetric Editorial Photography Frame */}
          <div className="lg:col-span-5 relative">
            <div
              ref={imageWrapperRef}
              className="relative aspect-[4/5] max-w-md mx-auto shadow-2xl overflow-hidden border border-soft-beige/80 bg-espresso/10"
            >
              <div ref={imageInnerRef} className="w-full h-[115%] -mt-[7%] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=85"
                  alt="Kozyna Slow-Braised Island Kare-Kare"
                  className="w-full h-full object-cover filter contrast-105 hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/85 via-espresso/20 to-transparent pointer-events-none" />

              {/* Bottom Card Caption */}
              <div className="absolute bottom-6 left-6 right-6 text-ivory pointer-events-none">
                <span className="text-[10px] uppercase tracking-widest-editorial text-gold font-mono block mb-1">
                  Signature Island Feast
                </span>
                <h3 className="font-serif text-2xl font-light">
                  Slow-Braised Beef Shank Kare-Kare
                </h3>
                <p className="text-xs text-cream/80 font-light mt-1">
                  Simmered in artisanal stone-ground roasted peanuts and house Guimaras bagoong.
                </p>
              </div>
            </div>

            {/* Floating Terroir Badge */}
            <div
              ref={floatingBadgeRef}
              className="absolute -bottom-6 -left-4 sm:-left-8 bg-cream border border-soft-beige p-4 shadow-xl max-w-[210px] hidden sm:block"
            >
              <span className="text-[10px] uppercase tracking-wider font-mono text-muted-olive font-semibold block mb-1">
                Guimaras Terroir
              </span>
              <p className="text-xs font-serif italic text-espresso leading-snug">
                World-renowned sweet mangoes & fresh morning catch from the Jordan waters.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Editorial Strip */}
      <div className="max-w-7xl mx-auto w-full pt-6 border-t border-soft-beige/40 flex flex-col sm:flex-row items-center justify-between text-xs text-dark-brown/70 font-mono gap-3">
        <div className="flex items-center space-x-4">
          <span>Open Daily 11:00 AM – 9:00 PM</span>
          <span>·</span>
          <span>Beside GSU Mosqueda Campus, Jordan</span>
          <span>·</span>
          <span>+63 953 425 6428</span>
        </div>
        <div className="flex items-center space-x-2 text-[11px] text-muted-olive">
          <span>Scroll down to discover our buffets & menu</span>
          <ArrowDown className="w-3 h-3 text-gold animate-bounce" />
        </div>
      </div>
    </section>
  );
}
