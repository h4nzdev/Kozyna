import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  Sparkles,
  Calendar,
  ArrowRight,
  ArrowUpRight,
  Facebook,
  Tag,
  ExternalLink,
  Clock,
  Bell,
  BookOpen,
  Layers,
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { announcements, announcementCategories } from '../data/announcements';

gsap.registerPlugin(ScrollTrigger);

export default function AnnouncementsSection({
  onSelectAnnouncement,
  onViewMoreAnnouncements,
}) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  // Sort announcements newest first
  const sortedAnnouncements = useMemo(() => {
    return [...announcements].sort(
      (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
    );
  }, []);

  // Filtered by category
  const filteredAnnouncements = useMemo(() => {
    if (selectedCategory === 'all') return sortedAnnouncements;
    return sortedAnnouncements.filter((item) => item.category === selectedCategory);
  }, [selectedCategory, sortedAnnouncements]);

  // Featured announcement
  const featuredItem = useMemo(() => {
    return filteredAnnouncements.find((item) => item.featured) || filteredAnnouncements[0];
  }, [filteredAnnouncements]);

  // Primary grid items (capped at 5 to maintain balanced 3x2 grid with the 6th View More card)
  const remainingItems = useMemo(() => {
    if (!featuredItem) return [];
    const rest = filteredAnnouncements.filter((item) => item.id !== featuredItem.id);
    return rest.slice(0, 5);
  }, [filteredAnnouncements, featuredItem]);

  // Total count for badge
  const totalCount = announcements.length;

  // GSAP Entrance Animation on scroll
  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.announcement-bento-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
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
  }, [selectedCategory]);

  return (
    <section
      ref={sectionRef}
      id="announcements-section"
      className="py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-[#F4EEE5] text-espresso border-b border-soft-beige/60"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-8 border-b border-soft-beige/70 gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 text-[10px] uppercase tracking-ultra-wide text-muted-olive font-mono mb-2">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span>Section 02 · Announcements & Updates</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-6xl text-espresso font-normal tracking-tight">
              The Kozyna Chronicle.
            </h2>
            <p className="font-serif italic text-xl sm:text-2xl text-dark-brown/80 mt-2">
              “Live updates, weekend acoustic schedules, and seasonal notices directly from our Jordan kitchen.”
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-dark-brown/70">
            {/* View More Options Quick Link in Header */}
            {onViewMoreAnnouncements && (
              <button
                onClick={onViewMoreAnnouncements}
                className="inline-flex items-center space-x-2 px-4 py-2.5 bg-espresso text-ivory hover:bg-gold hover:text-espresso transition-colors shadow-sm cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5 text-gold" />
                <span>View More Options</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            <a
              href="https://facebook.com/kozyna"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-4 py-2.5 border border-dark-brown/30 hover:border-gold hover:text-gold transition-colors bg-white/70 shadow-sm"
            >
              <Facebook className="w-4 h-4 text-blue-600 fill-blue-600" />
              <span>Official Facebook</span>
              <ExternalLink className="w-3.5 h-3.5 ml-1" />
            </a>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
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

        {/* ============================================================== */}
        {/* BENTO GRID COMPOSITION: FEATURED + ASYMMETRIC TILES             */}
        {/* ============================================================== */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          {/* Tile 1: LARGE HERO BENTO CARD (Span 8) */}
          {featuredItem && (
            <article
              onClick={() => onSelectAnnouncement(featuredItem)}
              className="announcement-bento-card md:col-span-12 lg:col-span-8 bg-white border border-soft-beige shadow-sm hover:shadow-xl hover:border-gold/60 transition-all duration-300 overflow-hidden cursor-pointer flex flex-col md:flex-row group"
            >
              <div className="md:w-1/2 relative aspect-[16/10] md:aspect-auto min-h-[280px] bg-espresso overflow-hidden">
                <img
                  src={featuredItem.image}
                  alt={featuredItem.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-gold text-espresso text-[10px] uppercase tracking-widest-editorial font-bold font-mono shadow-md">
                    {featuredItem.highlightBadge || 'Featured Announcement'}
                  </span>
                </div>
              </div>

              <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-2 text-xs font-mono text-muted-olive mb-2.5">
                    <span className="uppercase tracking-widest text-gold font-semibold">
                      {featuredItem.categoryLabel}
                    </span>
                    <span>·</span>
                    <span className="text-dark-brown/60">{featuredItem.publishedAt}</span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl text-espresso font-normal leading-snug mb-3 group-hover:text-gold transition-colors">
                    {featuredItem.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-dark-brown/80 font-sans font-light leading-relaxed line-clamp-3 mb-4">
                    {featuredItem.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-soft-beige/60 flex items-center justify-between text-xs font-mono">
                  <span className="inline-flex items-center space-x-1.5 font-semibold text-espresso group-hover:text-gold transition-colors">
                    <span>Read Full Update</span>
                    <ArrowRight className="w-3.5 h-3.5 text-gold group-hover:translate-x-1 transition-transform" />
                  </span>

                  {featuredItem.facebookUrl && (
                    <a
                      href={featuredItem.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center space-x-1 text-dark-brown/60 hover:text-gold transition-colors"
                    >
                      <Facebook className="w-3.5 h-3.5 text-blue-600" />
                      <span className="text-[10px]">Facebook</span>
                    </a>
                  )}
                </div>
              </div>
            </article>
          )}

          {/* Tile 2: EDITORIAL QUICK NOTICE / OPERATING SUMMARY BENTO CARD (Span 4) */}
          <div className="announcement-bento-card md:col-span-12 lg:col-span-4 bg-[#EFE7DC] border border-soft-beige p-6 sm:p-8 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center space-x-2 text-muted-olive text-[10px] uppercase tracking-ultra-wide font-mono mb-3">
                <Bell className="w-3.5 h-3.5 text-gold" />
                <span>Noticeboard Alert</span>
              </div>
              <h4 className="font-serif text-2xl text-espresso font-normal leading-snug mb-2">
                Long Weekend & Holiday Schedules
              </h4>
              <p className="text-xs text-dark-brown/80 font-sans font-light leading-relaxed mb-4">
                Welcoming traveling guests from Iloilo and Western Visayas. Open continuously from 10:00 AM to 10:00 PM on holidays with full al fresco and pavilion seating.
              </p>
            </div>

            <div className="bg-white/80 border border-soft-beige/80 p-4 space-y-2 text-xs font-mono">
              <div className="flex items-center justify-between text-dark-brown">
                <span className="flex items-center space-x-1.5">
                  <Clock className="w-3.5 h-3.5 text-gold" />
                  <span>Pavilion Seating</span>
                </span>
                <span className="text-gold font-semibold">10 AM – 10 PM</span>
              </div>
              <div className="text-[11px] text-dark-brown/70 pt-1 border-t border-soft-beige/60">
                Advance reservations advised for groups of 6 or more.
              </div>
            </div>
          </div>

          {/* Remaining Asymmetric Bento Grid Cards (Span 4 each) */}
          {remainingItems.map((item) => (
            <article
              key={item.id}
              onClick={() => onSelectAnnouncement(item)}
              className="announcement-bento-card md:col-span-6 lg:col-span-4 bg-white border border-soft-beige/80 p-6 flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-gold/60 transition-all duration-300 group cursor-pointer"
            >
              <div>
                {/* Poster Thumbnail */}
                <div className="relative aspect-[16/10] overflow-hidden mb-4 bg-espresso/10">
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
                      <span className="px-2 py-0.5 text-[9px] uppercase tracking-wider bg-gold text-espresso font-mono font-bold">
                        {item.highlightBadge}
                      </span>
                    </div>
                  )}
                </div>

                {/* Metadata */}
                <div className="flex items-center space-x-2 text-[11px] font-mono text-dark-brown/60 mb-2">
                  <Calendar className="w-3 h-3 text-gold" />
                  <span>{item.publishedAt}</span>
                  {item.author && (
                    <>
                      <span>·</span>
                      <span>{item.author}</span>
                    </>
                  )}
                </div>

                {/* Title */}
                <h4 className="font-serif text-xl sm:text-2xl text-espresso group-hover:text-gold transition-colors font-normal leading-snug mb-2">
                  {item.title}
                </h4>

                {/* Excerpt */}
                <p className="text-xs text-dark-brown/80 font-sans font-light leading-relaxed line-clamp-3 mb-4">
                  {item.description}
                </p>
              </div>

              {/* Card Footer Link */}
              <div className="pt-4 border-t border-soft-beige/50 flex items-center justify-between text-xs font-mono text-dark-brown/70">
                <span className="inline-flex items-center space-x-1 group-hover:text-gold transition-colors font-medium">
                  <span>Read update</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>

                {item.facebookUrl && (
                  <span className="text-[10px] text-dark-brown/50">Facebook Post</span>
                )}
              </div>
            </article>
          ))}

          {/* ============================================================== */}
          {/* TILE 6: DEDICATED "VIEW MORE OPTIONS" INTERACTIVE BENTO CARD   */}
          {/* Occupies the 6th slot shown empty in the user's screenshot!    */}
          {/* ============================================================== */}
          <div
            onClick={onViewMoreAnnouncements}
            className="announcement-bento-card md:col-span-6 lg:col-span-4 bg-gradient-to-br from-espresso via-dark-brown to-charcoal text-ivory border-2 border-gold/40 hover:border-gold p-7 sm:p-8 flex flex-col justify-between shadow-xl hover:shadow-2xl transition-all duration-300 group cursor-pointer relative overflow-hidden"
          >
            {/* Ambient Background Accent Glow */}
            <div className="absolute -right-10 -bottom-10 w-36 h-36 bg-gold/10 rounded-full blur-2xl pointer-events-none group-hover:bg-gold/20 transition-all duration-500" />

            <div>
              {/* Badge & Icon */}
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-gold text-espresso text-[10px] uppercase tracking-widest-editorial font-bold font-mono shadow-sm">
                  Chronicle Archive
                </span>
                <Layers className="w-5 h-5 text-gold group-hover:rotate-12 transition-transform duration-300" />
              </div>

              {/* Headline */}
              <h4 className="font-serif text-2xl sm:text-3xl text-ivory font-normal leading-snug mb-3 group-hover:text-gold-light transition-colors">
                View More Options & Past Updates
              </h4>

              {/* Description */}
              <p className="text-xs text-soft-beige/85 font-sans font-light leading-relaxed mb-6">
                Looking for festival announcements, culinary masterclasses, past seasonal specials, or holiday schedules? Step into our complete chronicle archive.
              </p>

              {/* Feature Tags */}
              <div className="space-y-2 text-[11px] font-mono text-soft-beige/70 mb-6">
                <div className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
                  <span>{totalCount}+ Archived Dispatches</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
                  <span>Manggahan Festival & Holiday Specials</span>
                </div>
              </div>
            </div>

            {/* Action Button: View More Options */}
            <div className="pt-4 border-t border-cream/15">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (onViewMoreAnnouncements) onViewMoreAnnouncements();
                }}
                className="w-full py-3.5 px-4 bg-gold hover:bg-gold-light text-espresso font-semibold text-xs uppercase tracking-widest-editorial transition-all duration-300 flex items-center justify-center space-x-2 shadow-md group-hover:shadow-gold/30 cursor-pointer"
              >
                <span>View More Options</span>
                <ArrowRight className="w-4 h-4 text-espresso group-hover:translate-x-1.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* BOTTOM EDITORIAL BANNER FOR "VIEW MORE OPTIONS"                */}
        {/* ============================================================== */}
        <div className="mt-12 bg-white border border-soft-beige p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full border border-gold/40 flex items-center justify-center text-gold bg-cream/30 flex-shrink-0">
              <BookOpen className="w-5 h-5 text-gold" />
            </div>
            <div>
              <h4 className="font-serif text-xl sm:text-2xl text-espresso font-normal">
                Looking for more notices, past seasonal menus, or holiday dates?
              </h4>
              <p className="text-xs text-dark-brown/70 font-sans font-light mt-0.5">
                Explore our dedicated Chronicle Archive page with search and category filters.
              </p>
            </div>
          </div>

          <div className="flex-shrink-0 w-full sm:w-auto">
            <button
              onClick={onViewMoreAnnouncements}
              className="w-full sm:w-auto px-8 py-3.5 bg-espresso text-ivory hover:bg-gold hover:text-espresso transition-all duration-300 text-xs uppercase tracking-widest-editorial font-semibold shadow-md flex items-center justify-center space-x-2.5 cursor-pointer"
            >
              <span>View More Options (All Updates)</span>
              <ArrowRight className="w-4 h-4 text-gold hover:text-espresso" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
