import React from 'react';
import { X, Sparkles, Utensils, Check } from 'lucide-react';

export default function DishModal({ dish, onClose, onAddToReservation }) {
  if (!dish) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-espresso/80 backdrop-blur-md pointer-events-auto animate-fadeIn">
      <div
        className="relative w-full max-w-2xl bg-dark-brown/95 border border-cream/20 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-espresso/60 border border-cream/20 text-ivory hover:text-gold hover:border-gold transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Dish Photography */}
          <div className="relative h-64 md:h-full min-h-[260px] overflow-hidden">
            <img
              src={dish.image}
              alt={dish.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-brown via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-4 left-4">
              <span className="px-2.5 py-1 text-[10px] uppercase tracking-widest-editorial bg-gold/90 text-espresso font-semibold">
                {dish.categoryLabel}
              </span>
            </div>
          </div>

          {/* Dish Editorial Details */}
          <div className="p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2 text-gold text-[10px] tracking-ultra-wide uppercase font-mono mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Featured Dish</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-ivory leading-tight mb-2">
                {dish.name}
              </h3>

              <div className="text-xl font-serif text-gold-light mb-4 font-semibold">
                {dish.priceFormatted}
              </div>

              <p className="text-sm text-soft-beige/90 leading-relaxed font-sans mb-5 font-light">
                {dish.description}
              </p>

              {/* Culinary Accents */}
              {dish.garnish && (
                <div className="border-t border-cream/10 pt-4 mb-4">
                  <span className="text-[10px] uppercase tracking-widest-editorial text-soft-beige/60 block mb-1">
                    Garnish & Technique:
                  </span>
                  <p className="text-xs text-ivory/80 italic font-serif">
                    {dish.garnish}
                  </p>
                </div>
              )}

              {/* Tags */}
              {dish.tags && (
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {dish.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[9px] uppercase tracking-widest px-2 py-0.5 border border-cream/15 text-soft-beige/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  if (onAddToReservation) onAddToReservation(dish);
                  onClose();
                }}
                className="flex-1 py-3 px-4 bg-gold text-espresso hover:bg-gold-light text-xs uppercase tracking-widest-editorial font-semibold transition-colors flex items-center justify-center space-x-2"
              >
                <Utensils className="w-3.5 h-3.5" />
                <span>Include in Reservation</span>
              </button>
              <button
                onClick={onClose}
                className="py-3 px-4 border border-cream/20 text-ivory hover:text-gold text-xs uppercase tracking-widest-editorial transition-colors"
              >
                Back to Table
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
