import React from 'react';
import { X, Calendar, User, ExternalLink, Sparkles, Share2, Facebook } from 'lucide-react';

export default function AnnouncementModal({ announcement, onClose, onOpenReservation }) {
  if (!announcement) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-espresso/85 backdrop-blur-md pointer-events-auto animate-fadeIn overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-dark-brown/95 border border-cream/20 shadow-2xl my-8 text-ivory overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-espresso/70 border border-cream/20 text-ivory hover:text-gold hover:border-gold transition-colors"
          aria-label="Close announcement"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Featured Image Banner */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-espresso">
          <img
            src={announcement.image}
            alt={announcement.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-brown via-transparent to-transparent opacity-85" />
          <div className="absolute bottom-4 left-6">
            <span className="px-3 py-1 text-[10px] uppercase tracking-widest-editorial bg-gold text-espresso font-semibold font-mono">
              {announcement.categoryLabel}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-10 space-y-6">
          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-soft-beige/70 pb-3 border-b border-cream/10">
            <div className="flex items-center space-x-1.5">
              <Calendar className="w-3.5 h-3.5 text-gold" />
              <span>Published {announcement.publishedAt}</span>
            </div>
            {announcement.author && (
              <div className="flex items-center space-x-1.5">
                <User className="w-3.5 h-3.5 text-gold" />
                <span>{announcement.author}</span>
              </div>
            )}
            {announcement.expiresAt && (
              <span className="text-gold/90 bg-gold/10 px-2 py-0.5 border border-gold/30">
                Valid until {announcement.expiresAt}
              </span>
            )}
          </div>

          {/* Headline */}
          <h2 className="font-serif text-2xl sm:text-3xl text-ivory leading-tight font-normal">
            {announcement.title}
          </h2>

          {/* Full Narrative Content */}
          <div className="text-xs sm:text-sm text-soft-beige/90 font-sans font-light leading-relaxed space-y-4">
            <p className="font-medium text-ivory">
              {announcement.description}
            </p>
            <p>
              {announcement.content}
            </p>
          </div>

          {/* Action Row */}
          <div className="pt-6 border-t border-cream/15 flex flex-col sm:flex-row gap-3">
            {announcement.facebookUrl && (
              <a
                href={announcement.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-5 bg-gold text-espresso hover:bg-gold-light text-xs uppercase tracking-widest-editorial font-semibold transition-colors flex items-center justify-center space-x-2 shadow-sm"
              >
                <Facebook className="w-4 h-4 fill-espresso" />
                <span>View On Facebook</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1" />
              </a>
            )}

            <button
              onClick={() => {
                onClose();
                if (onOpenReservation) onOpenReservation();
              }}
              className="py-3 px-5 border border-cream/30 hover:border-gold hover:text-gold text-ivory text-xs uppercase tracking-widest-editorial font-semibold transition-colors flex items-center justify-center space-x-2"
            >
              <span>Reserve Table For Event</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
