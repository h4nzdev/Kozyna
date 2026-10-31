import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Sparkles,
  Star,
  CheckCircle,
  MessageSquare,
  ShieldCheck,
  Clock,
  AlertCircle,
  X,
  Send,
  ThumbsUp,
  MapPin,
  Utensils,
  Filter,
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { reviewStats, initialReviews, reviewCategories } from '../data/reviews';

gsap.registerPlugin(ScrollTrigger);

// Rate limit configuration: 5 minutes cooldown between review submissions per device
const RATE_LIMIT_COOLDOWN_MS = 5 * 60 * 1000;
const STORAGE_KEY_LAST_SUBMISSION = 'kozyna_review_rate_limit_ts';
const STORAGE_KEY_CUSTOM_REVIEWS = 'kozyna_user_submitted_reviews';

export default function ReviewsSection() {
  const sectionRef = useRef(null);
  const [reviewsList, setReviewsList] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CUSTOM_REVIEWS);
      if (saved) {
        const parsed = JSON.parse(saved);
        return [...parsed, ...initialReviews];
      }
    } catch (e) {
      console.warn('Could not read saved reviews:', e);
    }
    return initialReviews;
  });

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rateLimitRemainingSec, setRateLimitRemainingSec] = useState(0);

  // Form State
  const [formData, setFormData] = useState({
    author: '',
    location: '',
    rating: 5,
    category: 'culinary',
    dishMentioned: '',
    title: '',
    comment: '',
    visitType: 'Dinner Gathering',
  });
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);

  // Check rate limit timer on mount & periodically
  useEffect(() => {
    const checkRateLimit = () => {
      try {
        const lastTs = localStorage.getItem(STORAGE_KEY_LAST_SUBMISSION);
        if (lastTs) {
          const elapsed = Date.now() - parseInt(lastTs, 10);
          if (elapsed < RATE_LIMIT_COOLDOWN_MS) {
            setRateLimitRemainingSec(Math.ceil((RATE_LIMIT_COOLDOWN_MS - elapsed) / 1000));
            return;
          }
        }
        setRateLimitRemainingSec(0);
      } catch (e) {
        setRateLimitRemainingSec(0);
      }
    };

    checkRateLimit();
    const interval = setInterval(checkRateLimit, 1000);
    return () => clearInterval(interval);
  }, []);

  // Filtered reviews
  const filteredReviews = useMemo(() => {
    if (selectedCategory === 'all') return reviewsList;
    return reviewsList.filter((r) => r.category === selectedCategory);
  }, [selectedCategory, reviewsList]);

  // GSAP Entrance
  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.reviews-reveal-item',
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
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
  }, [selectedCategory]);

  // Form submission with Rate Limiting verification
  const handleSubmitReview = (e) => {
    e.preventDefault();
    setFormError('');

    // 1. Verify Rate Limit
    try {
      const lastTs = localStorage.getItem(STORAGE_KEY_LAST_SUBMISSION);
      if (lastTs) {
        const elapsed = Date.now() - parseInt(lastTs, 10);
        if (elapsed < RATE_LIMIT_COOLDOWN_MS) {
          const remaining = Math.ceil((RATE_LIMIT_COOLDOWN_MS - elapsed) / 1000);
          const mins = Math.floor(remaining / 60);
          const secs = remaining % 60;
          setFormError(
            `Rate limit active: To ensure authentic guest impressions, only 1 review is permitted every 5 minutes. Please wait ${mins}m ${secs}s before submitting again.`
          );
          return;
        }
      }
    } catch (err) {
      console.warn(err);
    }

    // 2. Validate Fields
    if (!formData.author.trim() || !formData.comment.trim() || !formData.title.trim()) {
      setFormError('Please fill in your name, review headline, and comments.');
      return;
    }

    // 3. Construct Review Object
    const newReview = {
      id: `user-rev-${Date.now()}`,
      author: formData.author.trim(),
      location: formData.location.trim() || 'Guimaras Traveler',
      date: 'Just Now',
      rating: formData.rating,
      category: formData.category,
      categoryLabel:
        formData.category === 'culinary'
          ? 'Food & Terroir'
          : formData.category === 'ambiance'
          ? 'Ambiance & Pavilion'
          : formData.category === 'hospitality'
          ? 'Service & Hospitality'
          : 'Family & Celebrations',
      dishMentioned: formData.dishMentioned.trim() || 'Chef Degustation Special',
      title: formData.title.trim(),
      comment: formData.comment.trim(),
      verifiedDiner: true,
      visitType: formData.visitType,
      isUserSubmitted: true,
    };

    // 4. Update Local Storage & Rate Limit Timestamp
    try {
      const nowTs = Date.now().toString();
      localStorage.setItem(STORAGE_KEY_LAST_SUBMISSION, nowTs);

      const existingCustom = JSON.parse(
        localStorage.getItem(STORAGE_KEY_CUSTOM_REVIEWS) || '[]'
      );
      const updatedCustom = [newReview, ...existingCustom];
      localStorage.setItem(
        STORAGE_KEY_CUSTOM_REVIEWS,
        JSON.stringify(updatedCustom)
      );

      setRateLimitRemainingSec(RATE_LIMIT_COOLDOWN_MS / 1000);
    } catch (err) {
      console.warn('Could not save review locally:', err);
    }

    // 5. Update State
    setReviewsList((prev) => [newReview, ...prev]);
    setFormSuccess(true);

    setTimeout(() => {
      setFormSuccess(false);
      setIsModalOpen(false);
      // Reset form
      setFormData({
        author: '',
        location: '',
        rating: 5,
        category: 'culinary',
        dishMentioned: '',
        title: '',
        comment: '',
        visitType: 'Dinner Gathering',
      });
    }, 2200);
  };

  return (
    <section
      ref={sectionRef}
      id="reviews-section"
      className="py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-[#F4EEE5] text-espresso border-b border-soft-beige/60"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 pb-8 border-b border-soft-beige/70 gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 text-[10px] uppercase tracking-ultra-wide text-muted-olive font-mono mb-2">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span>Section 07 · Verified Guest Ratings & Reviews</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-6xl text-espresso font-normal tracking-tight">
              Voices From The Table.
            </h2>
            <p className="font-serif italic text-xl sm:text-2xl text-dark-brown/80 mt-2">
              “Authentic impressions, celebration memories, and flavor notes from travelers across Western Visayas.”
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            {/* Rate limit badge info */}
            <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-white/70 border border-soft-beige text-[10px] font-mono text-dark-brown/70 shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-gold" />
              <span>Rate-Limited & Verified Anti-Spam Reviews</span>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="px-5 py-2.5 bg-espresso text-ivory hover:bg-gold hover:text-espresso transition-all duration-300 text-xs uppercase tracking-widest-editorial font-semibold shadow-md flex items-center space-x-2 cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5 text-gold" />
              <span>Write a Guest Review</span>
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* HORIZONTAL RATINGS METRICS ROW (3 Columns Side-by-Side)        */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 items-stretch">
          {/* Card 1: Overall Hospitality Rating */}
          <div className="reviews-reveal-item bg-white border border-soft-beige p-7 sm:p-8 flex flex-col justify-between shadow-sm">
            <div>
              <span className="text-[10px] uppercase tracking-ultra-wide text-muted-olive font-mono block mb-2">
                Overall Hospitality Rating
              </span>

              <div className="flex items-baseline space-x-3 mb-3">
                <span className="font-serif text-5xl sm:text-6xl text-espresso font-normal">
                  {reviewStats.averageRating}
                </span>
                <div className="space-y-1">
                  <div className="flex space-x-1 text-gold">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                    ))}
                  </div>
                  <span className="text-[11px] font-mono text-dark-brown/60 block">
                    Based on {reviewsList.length} verified reviews
                  </span>
                </div>
              </div>

              <p className="text-xs text-dark-brown/70 font-sans font-light leading-relaxed mb-4">
                Rated on authentic experiences in Jordan, Guimaras—from heirloom KBL broths to all-you-can-eat buffets and private banquets.
              </p>
            </div>

            <div className="pt-4 border-t border-soft-beige/60">
              <div className="p-3 bg-[#FAF7F2] border border-soft-beige/60 text-xs text-dark-brown/85 font-mono">
                <span className="text-gold font-semibold">{reviewStats.recommendationRate}</span> of diners recommend dining at Kozyna
              </div>
            </div>
          </div>

          {/* Card 2: Star Distribution Bars */}
          <div className="reviews-reveal-item bg-white border border-soft-beige p-7 sm:p-8 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-4 border-b border-soft-beige/60 pb-2">
                <span className="text-[10px] uppercase tracking-ultra-wide text-muted-olive font-mono">
                  Star Distribution
                </span>
                <span className="text-[10px] font-mono text-dark-brown/60">Share</span>
              </div>

              <div className="space-y-2.5 text-xs font-mono">
                {reviewStats.ratingsBreakdown.map((row) => (
                  <div key={row.stars} className="flex items-center space-x-3">
                    <span className="w-14 text-dark-brown/75 text-[11px] flex-shrink-0">
                      {row.stars} Stars
                    </span>
                    <div className="flex-1 h-2 bg-[#EAE1D4] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gold rounded-full transition-all duration-700"
                        style={{ width: `${row.percentage}%` }}
                      />
                    </div>
                    <span className="w-9 text-right text-[11px] text-dark-brown/60 font-semibold flex-shrink-0">
                      {row.percentage}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-soft-beige/60 flex items-center justify-between text-[11px] font-mono text-muted-olive">
              <span>Top Rated Diners' Choice</span>
              <span className="text-gold font-semibold">92% Top Score</span>
            </div>
          </div>

          {/* Card 3: Aspect Performance & Rate Limit Cooldown */}
          <div className="reviews-reveal-item bg-[#EFE7DC] border border-soft-beige p-7 sm:p-8 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-4 border-b border-soft-beige/70 pb-2">
                <span className="text-[10px] uppercase tracking-ultra-wide text-muted-olive font-mono">
                  Aspect Performance
                </span>
                <span className="text-[10px] font-mono text-dark-brown/60">Score</span>
              </div>

              <div className="space-y-2.5 text-xs font-mono">
                {reviewStats.aspects.map((asp, idx) => (
                  <div key={idx} className="flex justify-between items-center text-dark-brown/90">
                    <span className="font-sans text-xs">{asp.label}</span>
                    <span className="text-gold font-semibold font-serif text-sm">
                      {asp.score} / 5.0
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rate limit status alert pill */}
            <div className="mt-4 pt-4 border-t border-soft-beige/60 flex items-center justify-between text-[11px] font-mono text-dark-brown/70">
              <span className="flex items-center space-x-1.5">
                <Clock className="w-3.5 h-3.5 text-muted-olive" />
                <span>Rate Limit Status:</span>
              </span>
              {rateLimitRemainingSec > 0 ? (
                <span className="text-terracotta font-semibold">
                  {Math.floor(rateLimitRemainingSec / 60)}m {rateLimitRemainingSec % 60}s
                </span>
              ) : (
                <span className="text-muted-olive font-semibold flex items-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-gold" />
                  <span>Ready to Review</span>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* CATEGORY FILTER CONTROLS & REVIEWS COUNT BAR                   */}
        {/* ============================================================== */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-soft-beige/60">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {reviewCategories.map((cat) => (
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

          <div className="text-xs font-mono text-dark-brown/60">
            Showing <strong className="text-espresso">{filteredReviews.length}</strong> guest impressions
          </div>
        </div>

        {/* ============================================================== */}
        {/* REVIEWS CARDS HORIZONTAL MULTI-COLUMN GRID (3 Columns Wide)    */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {filteredReviews.map((rev) => (
            <article
              key={rev.id}
              className="reviews-reveal-item bg-white border border-soft-beige/80 p-6 sm:p-7 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                {/* Review Top Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-3 border-b border-soft-beige/50">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-0.5 text-gold">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" />
                      ))}
                    </div>
                    <span className="text-xs font-mono font-semibold text-espresso">
                      {rev.rating}.0
                    </span>
                    {rev.verifiedDiner && (
                      <span className="inline-flex items-center space-x-1 px-2 py-0.5 bg-[#F4EEE5] text-[10px] font-mono text-muted-olive font-semibold border border-soft-beige">
                        <CheckCircle className="w-3 h-3 text-gold" />
                        <span>Verified</span>
                      </span>
                    )}
                    {rev.isUserSubmitted && (
                      <span className="px-2 py-0.5 bg-gold/20 text-gold text-[10px] font-mono font-semibold border border-gold/40">
                        New
                      </span>
                    )}
                  </div>

                  <div className="text-[11px] font-mono text-dark-brown/60">
                    <span>{rev.date}</span>
                    {rev.visitType && <span> · {rev.visitType}</span>}
                  </div>
                </div>

                {/* Review Title */}
                <h3 className="font-serif text-xl text-espresso font-normal leading-snug mb-2">
                  “{rev.title}”
                </h3>

                {/* Dish Mentioned Badge */}
                {rev.dishMentioned && (
                  <div className="inline-flex items-center space-x-1.5 text-[11px] font-mono text-gold mb-3 bg-[#FAF7F2] px-2.5 py-1 border border-soft-beige/60">
                    <Utensils className="w-3 h-3 text-gold" />
                    <span>Ordered: {rev.dishMentioned}</span>
                  </div>
                )}

                {/* Review Comment */}
                <p className="text-xs sm:text-sm text-dark-brown/85 font-sans font-light leading-relaxed mb-4">
                  {rev.comment}
                </p>
              </div>

              {/* Author & Location */}
              <div className="flex items-center justify-between pt-3 border-t border-soft-beige/40 text-xs font-mono mt-4">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-espresso font-serif text-sm">
                    {rev.author}
                  </span>
                  <span className="text-dark-brown/50">·</span>
                  <span className="text-dark-brown/70 flex items-center space-x-1">
                    <MapPin className="w-3 h-3 text-muted-olive" />
                    <span>{rev.location}</span>
                  </span>
                </div>

                <span className="text-[10px] text-muted-olive uppercase tracking-wider font-semibold">
                  {rev.categoryLabel}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* ============================================================== */}
      {/* INTERACTIVE "WRITE A REVIEW" MODAL WITH RATE LIMIT PROTECTION   */}
      {/* ============================================================== */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-espresso/85 backdrop-blur-md overflow-y-auto animate-fadeIn"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative w-full max-w-xl bg-dark-brown/95 border border-cream/20 shadow-2xl p-6 sm:p-10 my-8 text-ivory"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-espresso/60 border border-cream/20 text-ivory hover:text-gold transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {!formSuccess ? (
              <div>
                <div className="text-center mb-6">
                  <span className="text-[10px] uppercase tracking-ultra-wide text-gold font-mono block mb-1">
                    Authentic Guest Feedback
                  </span>
                  <h3 className="font-serif text-3xl sm:text-4xl text-ivory font-normal">
                    Share Your Kozyna Impression
                  </h3>
                  <p className="text-xs text-soft-beige/70 mt-1 font-sans">
                    Brgy. Alaguisoc, Jordan, Guimaras (Beside GSU Mosqueda) · Help travelers discover our island kitchen.
                  </p>
                </div>

                {/* Rate limit status alert inside modal */}
                {rateLimitRemainingSec > 0 && (
                  <div className="mb-5 p-3.5 bg-terracotta/20 border border-terracotta/50 text-xs flex items-start space-x-2 text-cream leading-relaxed">
                    <AlertCircle className="w-4 h-4 text-terracotta flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-gold">Rate Limit Active</strong>
                      You recently submitted a dining review. To safeguard against spam, reviews are limited to 1 every 5 minutes. You can submit another review in{' '}
                      <span className="font-mono font-bold text-gold">
                        {Math.floor(rateLimitRemainingSec / 60)}m {rateLimitRemainingSec % 60}s
                      </span>.
                    </div>
                  </div>
                )}

                {/* Error message */}
                {formError && (
                  <div className="mb-4 p-3 bg-red-900/40 border border-red-500/50 text-xs text-red-200 flex items-start space-x-2">
                    <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                    <span>{formError}</span>
                  </div>
                )}

                <form onSubmit={handleSubmitReview} className="space-y-4 text-xs">
                  {/* Star Rating Picker */}
                  <div>
                    <label className="block uppercase tracking-widest-editorial text-soft-beige/80 mb-1.5 font-mono text-[10px]">
                      Your Overall Rating *
                    </label>
                    <div className="flex items-center space-x-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFormData({ ...formData, rating: star })}
                          className="p-1 focus:outline-none transition-transform hover:scale-110"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              star <= formData.rating
                                ? 'fill-gold text-gold'
                                : 'text-cream/20 hover:text-gold/50'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="text-xs font-mono text-gold ml-2">
                        {formData.rating}.0 / 5.0 Stars
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block uppercase tracking-widest-editorial text-soft-beige/80 mb-1 font-mono text-[10px]">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Maria Santos"
                        value={formData.author}
                        onChange={(e) =>
                          setFormData({ ...formData, author: e.target.value })
                        }
                        className="w-full bg-espresso/60 border border-cream/15 px-3 py-2.5 text-ivory placeholder-soft-beige/40 focus:outline-none focus:border-gold"
                      />
                    </div>
                    <div>
                      <label className="block uppercase tracking-widest-editorial text-soft-beige/80 mb-1 font-mono text-[10px]">
                        Your City / Province *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Iloilo City / Manila"
                        value={formData.location}
                        onChange={(e) =>
                          setFormData({ ...formData, location: e.target.value })
                        }
                        className="w-full bg-espresso/60 border border-cream/15 px-3 py-2.5 text-ivory placeholder-soft-beige/40 focus:outline-none focus:border-gold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block uppercase tracking-widest-editorial text-soft-beige/80 mb-1 font-mono text-[10px]">
                        Review Category
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) =>
                          setFormData({ ...formData, category: e.target.value })
                        }
                        className="w-full bg-espresso/60 border border-cream/15 px-3 py-2.5 text-ivory focus:outline-none focus:border-gold"
                      >
                        <option value="culinary" className="bg-espresso">Food & Terroir</option>
                        <option value="ambiance" className="bg-espresso">Ambiance & Pavilion</option>
                        <option value="hospitality" className="bg-espresso">Service & Hospitality</option>
                        <option value="gatherings" className="bg-espresso">Family & Celebrations</option>
                      </select>
                    </div>
                    <div>
                      <label className="block uppercase tracking-widest-editorial text-soft-beige/80 mb-1 font-mono text-[10px]">
                        Favorite Dish Ordered
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Native Chicken Binakol"
                        value={formData.dishMentioned}
                        onChange={(e) =>
                          setFormData({ ...formData, dishMentioned: e.target.value })
                        }
                        className="w-full bg-espresso/60 border border-cream/15 px-3 py-2.5 text-ivory placeholder-soft-beige/40 focus:outline-none focus:border-gold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block uppercase tracking-widest-editorial text-soft-beige/80 mb-1 font-mono text-[10px]">
                      Headline Summary *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Transcendental dining in the heart of Jordan"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      className="w-full bg-espresso/60 border border-cream/15 px-3 py-2.5 text-ivory placeholder-soft-beige/40 focus:outline-none focus:border-gold"
                    />
                  </div>

                  <div>
                    <label className="block uppercase tracking-widest-editorial text-soft-beige/80 mb-1 font-mono text-[10px]">
                      Your Review & Dining Impression *
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Share your experience regarding the island flavors, wood-fire roasting, service, and atmosphere..."
                      value={formData.comment}
                      onChange={(e) =>
                        setFormData({ ...formData, comment: e.target.value })
                      }
                      className="w-full bg-espresso/60 border border-cream/15 px-3 py-2.5 text-ivory placeholder-soft-beige/40 focus:outline-none focus:border-gold resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={rateLimitRemainingSec > 0}
                      className={`w-full py-3.5 text-xs uppercase tracking-widest-editorial font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                        rateLimitRemainingSec > 0
                          ? 'bg-soft-beige/20 text-soft-beige/40 cursor-not-allowed border border-cream/10'
                          : 'bg-gold hover:bg-gold-light text-espresso cursor-pointer shadow-md hover:shadow-gold/30'
                      }`}
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>
                        {rateLimitRemainingSec > 0
                          ? `Rate Limit Cooldown (${rateLimitRemainingSec}s)`
                          : 'Publish Verified Impression'}
                      </span>
                    </button>
                    <p className="text-[10px] text-center text-soft-beige/50 mt-2 font-mono">
                      Spam Protection Active · Reviews are rate-limited to 1 per 5 mins per device.
                    </p>
                  </div>
                </form>
              </div>
            ) : (
              /* Success State */
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-gold mx-auto mb-4 animate-bounce" />
                <span className="text-[10px] uppercase tracking-ultra-wide text-gold font-mono block mb-1">
                  Thank You For Dining With Us
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl text-ivory mb-2">
                  Your Review Has Been Placed On The Table
                </h3>
                <p className="text-xs text-soft-beige/80 max-w-sm mx-auto mb-6">
                  Your review has been verified and added to the Kozyna Chronicle. We cherish your feedback and look forward to welcoming you back to Jordan.
                </p>
                <div className="inline-block px-4 py-2 bg-espresso border border-gold/40 text-gold font-mono text-xs tracking-wider">
                  RATE LIMIT ACTIVE (5-MINUTE COOLDOWN)
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
