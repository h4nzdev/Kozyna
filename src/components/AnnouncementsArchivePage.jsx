import React, { useState, useMemo, useEffect } from 'react';
import {
  ArrowLeft,
  Search,
  Calendar,
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  Facebook,
  ExternalLink,
  BookOpen,
  Filter,
  X,
  Compass,
} from 'lucide-react';
import { announcements, announcementCategories } from '../data/announcements';
import { restaurantData } from '../data/restaurant';

export default function AnnouncementsArchivePage({
  onBackToHome,
  onSelectAnnouncement,
}) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Filtered & Searched announcements
  const filteredList = useMemo(() => {
    return announcements.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.content && item.content.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#F5F0E7] text-espresso selection:bg-gold selection:text-espresso font-sans">
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

          {/* Right Facebook Link */}
          <a
            href="https://facebook.com/kozyna"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1.5 text-xs font-mono text-soft-beige hover:text-gold transition-colors"
          >
            <Facebook className="w-3.5 h-3.5 text-blue-500 fill-blue-500" />
            <span className="hidden sm:inline">Official Page</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </header>

      {/* Hero Header Spread */}
      <div className="border-b border-soft-beige/70 bg-[#EFE8DD] py-16 sm:py-20 px-6 sm:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 text-[10px] uppercase tracking-ultra-wide text-muted-olive font-mono mb-3">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span>The Complete Digital Chronicle & Archives</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-espresso font-normal tracking-tight leading-[0.98]">
              All Announcements & Dispatches.
            </h1>

            <p className="font-serif italic text-xl sm:text-2xl text-dark-brown/85 mt-4 leading-snug">
              “Explore the ongoing story of Kozyna—from seasonal festival menus and acoustic evenings to holiday announcements and culinary workshops.”
            </p>

            <p className="text-xs sm:text-sm text-dark-brown/70 font-sans font-light mt-3 max-w-xl">
              Published directly from our Jordan kitchen, Brgy. Alaguisoc, Guimaras. Sourced from our official Facebook notices and kitchen reservations desk.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Area: Search, Filters & Archive Grid */}
      <main className="max-w-7xl mx-auto py-12 sm:py-16 px-6 sm:px-10 lg:px-16">
        {/* Search & Filter Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12 pb-8 border-b border-soft-beige/60">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {announcementCategories.map((cat) => (
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
              placeholder="Search announcements, dishes, festivals..."
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
            Showing <strong className="text-espresso font-semibold">{filteredList.length}</strong> archived dispatches
            {selectedCategory !== 'all' && (
              <span> under <span className="text-gold font-semibold uppercase">{selectedCategory}</span></span>
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

        {/* Archive Cards Grid */}
        {filteredList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredList.map((item) => (
              <article
                key={item.id}
                onClick={() => onSelectAnnouncement(item)}
                className="group cursor-pointer bg-white border border-soft-beige/80 p-6 flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-gold/60 transition-all duration-300"
              >
                <div>
                  {/* Photo Thumbnail */}
                  <div className="relative aspect-[16/10] overflow-hidden mb-5 bg-espresso/10">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 text-[9px] uppercase tracking-widest bg-espresso/90 text-ivory font-mono font-medium">
                        {item.categoryLabel}
                      </span>
                    </div>
                    {item.highlightBadge && (
                      <div className="absolute bottom-3 right-3">
                        <span className="px-2.5 py-1 text-[9px] uppercase tracking-wider bg-gold text-espresso font-mono font-bold shadow-sm">
                          {item.highlightBadge}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Metadata */}
                  <div className="flex items-center space-x-2 text-[11px] font-mono text-dark-brown/60 mb-2">
                    <Calendar className="w-3.5 h-3.5 text-gold" />
                    <span>{item.publishedAt}</span>
                    {item.author && (
                      <>
                        <span>·</span>
                        <span>{item.author}</span>
                      </>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-2xl text-espresso group-hover:text-gold transition-colors font-normal leading-snug mb-3">
                    {item.title}
                  </h3>

                  {/* Description Excerpt */}
                  <p className="text-xs text-dark-brown/80 font-sans font-light leading-relaxed line-clamp-3 mb-5">
                    {item.description}
                  </p>
                </div>

                {/* Footer Link */}
                <div className="pt-4 border-t border-soft-beige/50 flex items-center justify-between text-xs font-mono text-dark-brown/70">
                  <span className="inline-flex items-center space-x-1.5 group-hover:text-gold transition-colors font-semibold">
                    <span>Read Full Notice</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>

                  {item.facebookUrl && (
                    <a
                      href={item.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center space-x-1 text-[11px] text-dark-brown/50 hover:text-gold"
                    >
                      <Facebook className="w-3 h-3 text-blue-600" />
                      <span>Facebook</span>
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        ) : (
          /* Empty Search State */
          <div className="text-center py-20 bg-white border border-soft-beige p-10 max-w-lg mx-auto">
            <BookOpen className="w-10 h-10 text-gold mx-auto mb-3" />
            <h4 className="font-serif text-2xl text-espresso mb-2">
              No Archived Updates Found
            </h4>
            <p className="text-xs text-dark-brown/70 mb-6">
              We couldn't find any announcements matching your current search or category filter.
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

        {/* Bottom Navigation Return Strip */}
        <div className="mt-16 pt-8 border-t border-soft-beige/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={onBackToHome}
            className="px-8 py-3.5 bg-espresso text-ivory hover:bg-gold hover:text-espresso transition-all duration-300 text-xs uppercase tracking-widest-editorial font-semibold shadow-md flex items-center space-x-3 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-gold" />
            <span>Return to Main Restaurant Page</span>
          </button>

          <div className="text-xs font-mono text-dark-brown/60">
            Brgy. Alaguisoc, Jordan, Guimaras (Beside GSU Mosqueda) · Kozyna Restaurant Archive
          </div>
        </div>
      </main>
    </div>
  );
}
