import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  Sparkles,
  Utensils,
  ArrowUpRight,
  Check,
  Calendar,
  Flame,
  Eye,
  Award,
  ArrowRight,
  BookOpen,
  Layers,
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { menuCategories, menuItems } from '../data/menu';
import { restaurantData } from '../data/restaurant';

gsap.registerPlugin(ScrollTrigger);

export default function MenuShowcaseSection({
  onSelectDish,
  onOpenReservation,
  onViewMoreMenu,
}) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeTab, setActiveTab] = useState('ala-carte'); // 'ala-carte' or 'buffet'
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  const filteredItems = useMemo(() => {
    if (selectedCategory === 'all') {
      // In the default showcase, display the curated first 11 dishes so the 12th slot (spanning 8 cols)
      // seamlessly completes the grid row with the View More Options card!
      return menuItems.slice(0, 11);
    }
    return menuItems.filter((m) => m.category === selectedCategory);
  }, [selectedCategory]);

  const totalDishCount = menuItems.length;

  // GSAP Entrance
  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.menu-bento-card',
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
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
  }, [selectedCategory, activeTab]);

  return (
    <section
      ref={sectionRef}
      id="menu-section"
      className="py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-[#F8F4EE] text-espresso border-b border-soft-beige/50"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-8 border-b border-soft-beige/60 gap-6">
          <div>
            <span className="inline-flex items-center space-x-2 text-[10px] uppercase tracking-ultra-wide text-muted-olive font-mono mb-2">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span>Section 03 · Editorial Menu Curation</span>
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl text-espresso font-normal tracking-tight">
              The Culinary Repertoire.
            </h2>
            <p className="font-serif italic text-xl sm:text-2xl text-dark-brown/80 mt-2">
              “Flavors rooted in Guimaras soil, heirloom batwan souring, and fresh coastal tides.”
            </p>
          </div>

          {/* Action Row: Tab Switcher & View More Options Button */}
          <div className="flex flex-wrap items-center gap-3 self-start md:self-end">
            {/* View More Options Quick Button in Header */}
            {onViewMoreMenu && (
              <button
                onClick={onViewMoreMenu}
                className="inline-flex items-center space-x-2 px-4 py-2.5 bg-espresso text-ivory hover:bg-gold hover:text-espresso transition-colors text-xs uppercase tracking-widest-editorial font-semibold shadow-sm cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5 text-gold" />
                <span>View More Options</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            <div className="inline-flex bg-cream p-1 border border-soft-beige">
              <button
                onClick={() => setActiveTab('ala-carte')}
                className={`px-4 sm:px-5 py-2 text-xs uppercase tracking-widest-editorial transition-all font-medium cursor-pointer ${
                  activeTab === 'ala-carte'
                    ? 'bg-espresso text-ivory font-semibold shadow-sm'
                    : 'text-espresso/70 hover:text-espresso'
                }`}
              >
                À La Carte
              </button>
              <button
                onClick={() => setActiveTab('buffet')}
                className={`px-4 sm:px-5 py-2 text-xs uppercase tracking-widest-editorial transition-all font-medium cursor-pointer ${
                  activeTab === 'buffet'
                    ? 'bg-espresso text-ivory font-semibold shadow-sm'
                    : 'text-espresso/70 hover:text-espresso'
                }`}
              >
                Banquet Buffets
              </button>
            </div>
          </div>
        </div>

        {activeTab === 'ala-carte' ? (
          <div>
            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2 mb-10">
              {menuCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 text-xs uppercase tracking-wider transition-all border cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'border-espresso bg-espresso text-ivory font-semibold shadow-sm'
                      : 'border-soft-beige bg-cream/60 text-dark-brown hover:border-espresso/40 hover:bg-cream'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Asymmetric Bento Layout for Menu Items */}
            <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
              {filteredItems.map((dish, idx) => {
                // Wide hero card on index 0
                const isWideHero = selectedCategory === 'all' && idx === 0;

                return (
                  <article
                    key={dish.id}
                    onClick={() => onSelectDish(dish)}
                    className={`menu-bento-card group cursor-pointer bg-white border border-soft-beige/80 p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-gold/60 transition-all duration-300 ${
                      isWideHero
                        ? 'md:col-span-12 lg:col-span-8 flex-col sm:flex-row gap-6'
                        : 'md:col-span-6 lg:col-span-4'
                    }`}
                  >
                    {isWideHero ? (
                      /* Wide Bento Card Layout */
                      <>
                        <div className="sm:w-1/2 relative aspect-[4/3] sm:aspect-auto overflow-hidden bg-cream/40 min-h-[240px]">
                          <img
                            src={dish.image}
                            alt={dish.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            loading="lazy"
                          />
                          <div className="absolute top-3 left-3">
                            <span className="px-2.5 py-1 text-[9px] uppercase tracking-widest bg-gold text-espresso font-bold font-mono shadow-sm">
                              Signature Special
                            </span>
                          </div>
                        </div>

                        <div className="sm:w-1/2 flex flex-col justify-between pt-4 sm:pt-0">
                          <div>
                            <div className="flex items-center space-x-2 text-[11px] font-mono text-muted-olive mb-1.5">
                              <span>{dish.categoryLabel}</span>
                              <span>·</span>
                              <span className="text-gold font-semibold">Heirloom Broth</span>
                            </div>

                            <div className="flex items-baseline justify-between mb-2">
                              <h3 className="font-serif text-2xl sm:text-3xl text-espresso group-hover:text-gold transition-colors font-medium leading-tight">
                                {dish.name}
                              </h3>
                            </div>

                            <div className="font-serif text-2xl text-espresso font-semibold mb-3">
                              {dish.priceFormatted}
                            </div>

                            <p className="text-xs sm:text-sm text-dark-brown/80 font-sans font-light leading-relaxed mb-4">
                              {dish.description}
                            </p>

                            {dish.garnish && (
                              <div className="text-[11px] font-mono text-muted-olive flex items-center space-x-1.5 mb-4">
                                <Award className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                                <span>{dish.garnish}</span>
                              </div>
                            )}
                          </div>

                          <div className="pt-4 border-t border-soft-beige/50 flex items-center justify-between text-xs font-mono text-dark-brown/70">
                            <span className="inline-flex items-center space-x-1.5 group-hover:text-gold transition-colors font-semibold">
                              <Eye className="w-3.5 h-3.5 text-gold" />
                              <span>Inspect Dish & Pairing</span>
                            </span>
                            <span className="text-[10px] text-dark-brown/40">Verified Price</span>
                          </div>
                        </div>
                      </>
                    ) : (
                      /* Standard Bento Card Layout */
                      <>
                        <div>
                          {/* Dish Image */}
                          <div className="relative aspect-[4/3] overflow-hidden mb-4 bg-cream/40">
                            <img
                              src={dish.image}
                              alt={dish.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              loading="lazy"
                            />
                            <div className="absolute top-3 left-3">
                              <span className="px-2.5 py-1 text-[9px] uppercase tracking-widest bg-espresso/90 text-ivory font-mono">
                                {dish.categoryLabel}
                              </span>
                            </div>
                            {dish.featured && (
                              <div className="absolute bottom-3 right-3">
                                <span className="px-2 py-0.5 text-[9px] uppercase tracking-wider bg-gold text-espresso font-mono font-bold">
                                  Chef Favorite
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Dish Title & Price */}
                          <div className="flex items-baseline justify-between mb-2">
                            <h3 className="font-serif text-xl sm:text-2xl text-espresso group-hover:text-gold transition-colors font-medium leading-tight">
                              {dish.name}
                            </h3>
                            <span className="font-serif text-xl text-espresso font-semibold ml-3 flex-shrink-0">
                              {dish.priceFormatted}
                            </span>
                          </div>

                          {/* Description */}
                          <p className="text-xs sm:text-sm text-dark-brown/80 font-sans font-light leading-relaxed mb-4 line-clamp-3">
                            {dish.description}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-soft-beige/50 flex items-center justify-between text-xs font-mono text-muted-olive">
                          <span className="inline-flex items-center space-x-1 group-hover:text-gold transition-colors font-medium">
                            <span>View recipe details</span>
                            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </span>
                          <span className="text-[10px] text-dark-brown/40">VAT Inclusive</span>
                        </div>
                      </>
                    )}
                  </article>
                );
              })}

              {/* ============================================================== */}
              {/* DEDICATED "VIEW MORE OPTIONS" BENTO CARD IN THE MENU GRID      */}
              {/* Perfectly spans columns 2 & 3 in the final row to fill gap!    */}
              {/* ============================================================== */}
              <div
                onClick={onViewMoreMenu}
                className="menu-bento-card md:col-span-12 lg:col-span-8 bg-gradient-to-br from-espresso via-dark-brown to-charcoal text-ivory border-2 border-gold/40 hover:border-gold p-7 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 shadow-xl hover:shadow-2xl transition-all duration-300 group cursor-pointer relative overflow-hidden"
              >
                {/* Ambient Glow */}
                <div className="absolute -right-12 -bottom-12 w-44 h-44 bg-gold/15 rounded-full blur-2xl pointer-events-none group-hover:bg-gold/25 transition-all duration-500" />

                <div className="max-w-md">
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="px-3 py-1 bg-gold text-espresso text-[10px] uppercase tracking-widest-editorial font-bold font-mono shadow-sm">
                      Culinary Catalogue
                    </span>
                    <span className="text-[10px] uppercase font-mono text-gold-light">
                      {totalDishCount}+ Recipes Plated
                    </span>
                  </div>

                  <h4 className="font-serif text-2xl sm:text-3xl text-ivory font-normal leading-snug mb-2 group-hover:text-gold-light transition-colors">
                    View More Options & Full Menu Catalogue
                  </h4>

                  <p className="text-xs text-soft-beige/85 font-sans font-light leading-relaxed">
                    Craving heirloom KBL, charcoal chicken inasal, artisanal pancit molo dumplings, grilled stuffed squid, or craft island cocktails? Explore our complete repertoire with live search and dietary details.
                  </p>
                </div>

                <div className="flex-shrink-0 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onViewMoreMenu) onViewMoreMenu();
                    }}
                    className="w-full sm:w-auto px-7 py-3.5 bg-gold hover:bg-gold-light text-espresso font-semibold text-xs uppercase tracking-widest-editorial transition-all duration-300 flex items-center justify-center space-x-2 shadow-md group-hover:shadow-gold/30 cursor-pointer"
                  >
                    <span>View More Options</span>
                    <ArrowRight className="w-4 h-4 text-espresso group-hover:translate-x-1.5 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Banquet Buffets & Special Celebrations */
          <div className="space-y-10">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-[10px] uppercase tracking-ultra-wide text-gold font-mono block mb-1">
                Family Reunions, Weddings & Banquets
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-espresso">
                {restaurantData.buffetAndEvents.title}
              </h3>
              <p className="text-sm text-dark-brown/80 mt-2 font-light leading-relaxed">
                {restaurantData.buffetAndEvents.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {restaurantData.buffetAndEvents.buffetOptions.map((pkg, i) => (
                <div
                  key={i}
                  className="bg-white border-2 border-soft-beige hover:border-gold p-8 sm:p-10 flex flex-col justify-between shadow-md transition-all duration-300"
                >
                  <div>
                    <h4 className="font-serif text-2xl sm:text-3xl text-espresso mb-1">
                      {pkg.name}
                    </h4>
                    <div className="text-3xl font-serif text-gold mb-1 font-semibold">
                      {pkg.price}
                    </div>
                    <div className="text-xs uppercase tracking-wider text-muted-olive font-mono mb-6">
                      {pkg.minGuests}
                    </div>

                    <div className="space-y-3 mb-8">
                      <span className="text-xs uppercase tracking-widest text-espresso font-mono font-semibold block">
                        Curation Inclusions:
                      </span>
                      {pkg.inclusions.map((item, idx) => (
                        <div key={idx} className="flex items-start space-x-2 text-xs sm:text-sm text-dark-brown/90 font-light">
                          <Check className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={onOpenReservation}
                    className="w-full py-4 bg-espresso text-ivory hover:bg-gold hover:text-espresso text-xs uppercase tracking-widest-editorial font-semibold transition-colors flex items-center justify-center space-x-2 cursor-pointer shadow-sm"
                  >
                    <Calendar className="w-4 h-4 text-gold" />
                    <span>Inquire for Event or Banquet</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* BOTTOM EDITORIAL BANNER FOR "VIEW MORE OPTIONS"                */}
        {/* ============================================================== */}
        <div className="mt-12 bg-white border border-soft-beige p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full border border-gold/40 flex items-center justify-center text-gold bg-cream/30 flex-shrink-0">
              <Utensils className="w-5 h-5 text-gold" />
            </div>
            <div>
              <h4 className="font-serif text-xl sm:text-2xl text-espresso font-normal">
                Looking for our full à la carte catalogue, desserts, or drink pairings?
              </h4>
              <p className="text-xs text-dark-brown/70 font-sans font-light mt-0.5">
                Explore our dedicated Full Menu Catalogue page with live search, dietary tags, and pre-reservation tools.
              </p>
            </div>
          </div>

          <div className="flex-shrink-0 w-full sm:w-auto">
            <button
              onClick={onViewMoreMenu}
              className="w-full sm:w-auto px-8 py-3.5 bg-espresso text-ivory hover:bg-gold hover:text-espresso transition-all duration-300 text-xs uppercase tracking-widest-editorial font-semibold shadow-md flex items-center justify-center space-x-2.5 cursor-pointer"
            >
              <span>View More Options (Full Menu)</span>
              <ArrowRight className="w-4 h-4 text-gold hover:text-espresso" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
