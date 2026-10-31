import React, { useState, useMemo, useEffect } from 'react';
import {
  ArrowLeft,
  Search,
  Sparkles,
  Utensils,
  ArrowRight,
  Eye,
  Check,
  Award,
  Calendar,
  X,
  Plus,
  Globe,
  Compass,
  Grid,
  Gift,
  Tag,
} from 'lucide-react';
import { menuItems, menuCategories } from '../data/menu';
import { restaurantData } from '../data/restaurant';
import InfiniteMenu from './InfiniteMenu';

export default function FullMenuPage({
  onBackToHome,
  onSelectDish,
  onOpenReservationWithDish,
}) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('both'); // 'both' | 'sphere' | 'grid'

  // Prepare dishes for 3D Infinite Menu Sphere
  const sphereMenuItems = useMemo(() => {
    return menuItems.map((dish) => ({
      image: dish.image,
      title: dish.name,
      description: `${dish.priceFormatted} · ${dish.categoryLabel}`,
      link: '#',
      dish: dish,
    }));
  }, []);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Filtered & Searched dishes
  const filteredList = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.garnish && item.garnish.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.tags && item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#F8F4EE] text-espresso selection:bg-gold selection:text-espresso font-sans">
      {/* Top Editorial Sticky Navigation Header */}
      <header className="sticky top-0 z-40 bg-espresso text-ivory border-b border-cream/15 shadow-xl backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-4 flex items-center justify-between">
          {/* Back to Home Button */}
          <button
            onClick={onBackToHome}
            className="group inline-flex items-center space-x-2.5 text-xs uppercase tracking-widest-editorial font-mono text-soft-beige hover:text-gold transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-gold group-hover:-translate-x-1 transition-transform" />
            <span>Return to Kozyna Home</span>
          </button>

          {/* Center Brand Identity */}
          <div className="flex items-center space-x-3">
            {restaurantData.logo && (
              <img
                src={restaurantData.logo}
                alt="Kozyna Logo"
                className="w-8 h-8 rounded-full border border-gold/40 p-0.5 bg-dark-brown hidden sm:block"
              />
            )}
            <span className="font-serif text-xl sm:text-2xl tracking-widest-editorial text-ivory">
              KOZYNA
            </span>
          </div>

          {/* Right Direct Reserve Button */}
          <button
            onClick={() => onOpenReservationWithDish && onOpenReservationWithDish(null)}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-gold hover:bg-gold-light text-espresso transition-colors text-xs uppercase tracking-widest-editorial font-semibold cursor-pointer shadow-sm"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reserve Table</span>
          </button>
        </div>
      </header>

      {/* Hero Header Spread */}
      <div className="border-b border-soft-beige/70 bg-[#F0E8DC] py-16 sm:py-20 px-6 sm:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 text-[10px] uppercase tracking-ultra-wide text-muted-olive font-mono mb-3">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span>The Complete Culinary Repertoire</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-espresso font-normal tracking-tight leading-[0.98]">
              The Full Menu Catalogue.
            </h1>

            <p className="font-serif italic text-xl sm:text-2xl text-dark-brown/85 mt-4 leading-snug">
              “Explore the full spectrum of our island kitchen—from heirloom batwan broths and coconut charcoal roasts to artisanal mango desserts and handcrafted spritzers.”
            </p>

            <p className="text-xs sm:text-sm text-dark-brown/70 font-sans font-light mt-3 max-w-xl">
              All dishes prepared fresh to order in Jordan, Guimaras. Sourced from local coastal fisherfolk and regional smallholder growers. All prices are in Philippine Pesos (₱) inclusive of VAT.
            </p>
          </div>
        </div>
      </div>

      {/* 360° Sphere Culinary Explorer Section */}
      {(viewMode === 'both' || viewMode === 'sphere') && (
        <section className="bg-[#1C1410] text-ivory border-b border-soft-beige/20 overflow-hidden relative">
          {/* Section Header with View Mode Switcher */}
          <div className="max-w-7xl mx-auto px-6 sm:px-10 pt-10 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10">
            <div>
              <div className="inline-flex items-center space-x-2 text-[10px] uppercase tracking-ultra-wide text-gold font-mono mb-2">
                <Globe className="w-3.5 h-3.5 text-gold" />
                <span>Interactive 3D Sphere · WebGL2 Gastronomic Explorer</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl text-ivory font-normal tracking-tight">
                The Kozyna Culinary Sphere.
              </h2>
              <p className="font-serif italic text-base sm:text-xl text-soft-beige/85 mt-2">
                “Drag and rotate the 3D globe to navigate our island creations. Click any dish or inspection arrow to view details & reserve.”
              </p>
            </div>

            {/* View Mode Switcher */}
            <div className="flex items-center space-x-1.5 self-start md:self-end bg-espresso/90 border border-cream/20 p-1.5 shadow-inner">
              <button
                onClick={() => setViewMode('both')}
                className={`px-3.5 py-1.5 text-[11px] uppercase tracking-widest font-mono transition-all cursor-pointer ${
                  viewMode === 'both'
                    ? 'bg-gold text-espresso font-semibold shadow-sm'
                    : 'text-soft-beige/80 hover:text-ivory'
                }`}
              >
                Sphere & Grid
              </button>
              <button
                onClick={() => setViewMode('sphere')}
                className={`px-3.5 py-1.5 text-[11px] uppercase tracking-widest font-mono transition-all cursor-pointer ${
                  viewMode === 'sphere'
                    ? 'bg-gold text-espresso font-semibold shadow-sm'
                    : 'text-soft-beige/80 hover:text-ivory'
                }`}
              >
                Sphere Only
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3.5 py-1.5 text-[11px] uppercase tracking-widest font-mono transition-all cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-gold text-espresso font-semibold shadow-sm'
                    : 'text-soft-beige/80 hover:text-ivory'
                }`}
              >
                Grid Only
              </button>
            </div>
          </div>

          {/* InfiniteMenu 3D Canvas Stage */}
          <div className="relative w-full h-[520px] sm:h-[620px] lg:h-[660px] bg-[#1C1410] select-none">
            <InfiniteMenu
              items={sphereMenuItems}
              count={120}
              tileSize={0.64}
              roundness={0.24}
              zoom={1.65}
              pullBack={1.0}
              stretch={0.6}
              inertia={0.65}
              autoplay={3.5}
              grayscale={true}
              dim={0.45}
              intro={true}
              showInfo={true}
              theme="dark"
              accentColor="#C59B63"
              backgroundColor="#1C1410"
              onItemClick={(item) => onSelectDish(item.dish || item)}
            />

            {/* Floating interaction hint pill in bottom corner */}
            <div className="absolute bottom-4 left-6 z-10 pointer-events-none hidden sm:flex items-center space-x-2 px-3.5 py-1.5 bg-espresso/80 backdrop-blur-md border border-cream/15 text-[10px] font-mono uppercase tracking-wider text-soft-beige/90 shadow-md">
              <Compass className="w-3.5 h-3.5 text-gold" />
              <span>Drag to spin globe · Click dish to inspect</span>
            </div>
          </div>

          {/* Quick Switch to Grid Strip if in Sphere Only Mode */}
          {viewMode === 'sphere' && (
            <div className="py-4 px-6 bg-espresso border-t border-cream/10 text-center">
              <button
                onClick={() => setViewMode('both')}
                className="text-xs uppercase tracking-widest-editorial font-mono text-gold hover:text-gold-light inline-flex items-center space-x-2"
              >
                <Grid className="w-3.5 h-3.5" />
                <span>Show Search & Category Filter Grid Below</span>
              </button>
            </div>
          )}
        </section>
      )}

      {/* Main Content Area: Search, Filters & Dishes Grid */}
      {(viewMode === 'both' || viewMode === 'grid') && (
      <main className="max-w-7xl mx-auto py-12 sm:py-16 px-6 sm:px-10 lg:px-16">
        {/* Active Promos & Perks Strip */}
        <div className="mb-8 p-4 sm:p-5 bg-white border border-soft-beige flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center space-x-3.5">
            <div className="w-9 h-9 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center text-gold flex-shrink-0">
              <Gift className="w-4 h-4 text-gold" />
            </div>
            <div>
              <div className="flex items-center space-x-2 text-[10px] font-mono uppercase tracking-wider text-muted-olive">
                <span className="font-bold text-espresso">Active Dining Privileges</span>
                <span>·</span>
                <span>Jordan, Guimaras</span>
              </div>
              <p className="text-xs text-dark-brown/90 font-sans mt-0.5">
                <span className="font-semibold text-espresso">Birthday Celebrant 100% FREE</span> (w/ 5 paying guests) · <span className="font-semibold text-espresso">Barkada Deal (6+1)</span> · <span className="font-semibold text-espresso">Family Deal (12+2)</span> · 20% Senior/PWD Privilege Honored.
              </p>
            </div>
          </div>

          <button
            onClick={() => onOpenReservationWithDish && onOpenReservationWithDish(null)}
            className="inline-flex items-center space-x-1.5 px-4 py-2 bg-espresso text-ivory hover:bg-gold hover:text-espresso transition-colors text-[11px] font-mono uppercase tracking-wider cursor-pointer shadow-sm flex-shrink-0"
          >
            <Tag className="w-3.5 h-3.5 text-gold" />
            <span>Claim on Booking</span>
          </button>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12 pb-8 border-b border-soft-beige/60">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {menuCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 text-xs uppercase tracking-wider transition-all border cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'border-espresso bg-espresso text-ivory font-semibold shadow-sm'
                    : 'border-soft-beige bg-white/70 text-dark-brown hover:border-espresso/40 hover:bg-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative max-w-md w-full">
            <Search className="w-4 h-4 text-muted-olive absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search dishes, batwan, mango, seafood..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-soft-beige pl-10 pr-10 py-2.5 text-xs text-espresso placeholder-dark-brown/50 focus:outline-none focus:border-gold shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-brown/50 hover:text-espresso"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Counter Strip */}
        <div className="flex items-center justify-between text-xs font-mono text-dark-brown/70 mb-8">
          <div>
            Showing <strong className="text-espresso font-semibold">{filteredList.length}</strong> handcrafted dishes
            {selectedCategory !== 'all' && (
              <span> in <span className="text-gold font-semibold uppercase">{selectedCategory}</span></span>
            )}
            {searchQuery && (
              <span> matching "<span className="text-espresso font-semibold">{searchQuery}</span>"</span>
            )}
          </div>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="text-[11px] underline hover:text-gold transition-colors"
          >
            Reset Filters
          </button>
        </div>

        {/* Dishes Grid */}
        {filteredList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredList.map((dish) => (
              <article
                key={dish.id}
                onClick={() => onSelectDish(dish)}
                className="group cursor-pointer bg-white border border-soft-beige/80 p-6 flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-gold/60 transition-all duration-300"
              >
                <div>
                  {/* Photo Thumbnail */}
                  <div className="relative aspect-[4/3] overflow-hidden mb-5 bg-cream/40">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 text-[9px] uppercase tracking-widest bg-espresso/90 text-ivory font-mono font-medium">
                        {dish.categoryLabel}
                      </span>
                    </div>
                    {dish.featured && (
                      <div className="absolute bottom-3 right-3">
                        <span className="px-2 py-0.5 text-[9px] uppercase tracking-wider bg-gold text-espresso font-mono font-bold shadow-sm">
                          Signature
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Title & Price */}
                  <div className="flex items-baseline justify-between mb-2">
                    <h3 className="font-serif text-2xl text-espresso group-hover:text-gold transition-colors font-medium leading-tight">
                      {dish.name}
                    </h3>
                    <span className="font-serif text-xl text-espresso font-semibold ml-3 flex-shrink-0">
                      {dish.priceFormatted}
                    </span>
                  </div>

                  {/* Garnish Note */}
                  {dish.garnish && (
                    <div className="text-[11px] font-mono text-muted-olive flex items-center space-x-1.5 mb-2.5">
                      <Award className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                      <span className="truncate">{dish.garnish}</span>
                    </div>
                  )}

                  {/* Description Excerpt */}
                  <p className="text-xs text-dark-brown/80 font-sans font-light leading-relaxed line-clamp-3 mb-4">
                    {dish.description}
                  </p>

                  {/* Tags */}
                  {dish.tags && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {dish.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="text-[9px] uppercase tracking-widest px-2 py-0.5 border border-soft-beige bg-[#FAF7F2] text-dark-brown/70 font-mono"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer Actions */}
                <div className="pt-4 border-t border-soft-beige/50 flex items-center justify-between text-xs font-mono">
                  <span className="inline-flex items-center space-x-1 group-hover:text-gold transition-colors font-medium">
                    <Eye className="w-3.5 h-3.5 text-gold" />
                    <span>View Details</span>
                  </span>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onOpenReservationWithDish) onOpenReservationWithDish(dish);
                    }}
                    className="inline-flex items-center space-x-1 text-espresso hover:text-gold transition-colors font-semibold"
                  >
                    <Plus className="w-3.5 h-3.5 text-gold" />
                    <span>Pre-Reserve</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          /* Empty Search State */
          <div className="text-center py-20 bg-white border border-soft-beige p-10 max-w-lg mx-auto">
            <Utensils className="w-10 h-10 text-gold mx-auto mb-3" />
            <h4 className="font-serif text-2xl text-espresso mb-2">
              No Dishes Found
            </h4>
            <p className="text-xs text-dark-brown/70 mb-6">
              We couldn't find any dishes matching your current search or category filter.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-6 py-2.5 bg-espresso text-ivory text-xs uppercase tracking-widest font-mono hover:bg-gold hover:text-espresso transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* Banquet Feasts Section Inset */}
        <div className="mt-20 pt-12 border-t border-soft-beige/60">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[10px] uppercase tracking-ultra-wide text-gold font-mono block mb-1">
              For Banquets, Family Reunions & Milestone Celebrations
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-espresso">
              Celebration Buffet Options
            </h2>
            <p className="text-xs sm:text-sm text-dark-brown/70 font-sans font-light mt-1">
              Curated multi-course buffet feasts for groups of 20 to 120 guests in our Garden Pavilion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {restaurantData.buffetAndEvents.buffetOptions.map((pkg, i) => (
              <div
                key={i}
                className="bg-white border border-soft-beige p-8 flex flex-col justify-between shadow-sm hover:border-gold transition-colors"
              >
                <div>
                  <h3 className="font-serif text-2xl text-espresso mb-1">
                    {pkg.name}
                  </h3>
                  <div className="text-2xl font-serif text-gold font-semibold mb-1">
                    {pkg.price}
                  </div>
                  <div className="text-xs uppercase tracking-wider text-muted-olive font-mono mb-4">
                    {pkg.minGuests}
                  </div>

                  <div className="space-y-2 mb-6">
                    {pkg.inclusions.map((item, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-xs text-dark-brown/85 font-light">
                        <Check className="w-3.5 h-3.5 text-gold flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => onOpenReservationWithDish && onOpenReservationWithDish(null)}
                  className="w-full py-3 bg-espresso text-ivory hover:bg-gold hover:text-espresso text-xs uppercase tracking-widest font-semibold transition-colors flex items-center justify-center space-x-2 shadow-sm"
                >
                  <Calendar className="w-3.5 h-3.5 text-gold" />
                  <span>Inquire for Feast</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Return Strip */}
        <div className="mt-16 pt-8 border-t border-soft-beige/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={onBackToHome}
            className="px-8 py-3.5 bg-espresso text-ivory hover:bg-gold hover:text-espresso transition-all duration-300 text-xs uppercase tracking-widest-editorial font-semibold shadow-md flex items-center space-x-3 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-gold" />
            <span>Return to Main Restaurant Page</span>
          </button>

          <div className="text-xs font-mono text-dark-brown/60">
            Brgy. Alaguisoc, Jordan, Guimaras (Beside GSU Mosqueda) · Kozyna Culinary Catalogue
          </div>
        </div>
      </main>
      )}
    </div>
  );
}
