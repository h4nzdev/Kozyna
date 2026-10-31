import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu as MenuIcon, X, Calendar, MapPin } from 'lucide-react';
import { restaurantData } from '../data/restaurant';

export default function Navigation({
  onScrollToSection,
  onOpenReservation,
  isAudioPlaying,
  onToggleAudio,
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Announcements', id: 'announcements-section' },
    { label: 'Menu Showcase', id: 'menu-section' },
    { label: 'Our Story', id: 'story-section' },
    { label: 'Head Chef', id: 'chef-section' },
    { label: 'Dining Experience', id: 'experience-section' },
    { label: 'Visit Us', id: 'visit-section' },
  ];

  const handleNavClick = (id) => {
    onScrollToSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 pointer-events-auto ${
          isScrolled
            ? 'py-3.5 bg-espresso/95 backdrop-blur-md border-b border-cream/15 shadow-2xl text-ivory'
            : 'py-5 bg-ivory/85 backdrop-blur-sm border-b border-soft-beige/40 text-espresso'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between">
          {/* Brand Logo & Wordmark */}
          <button
            onClick={() => handleNavClick('hero-section')}
            className="group flex items-center space-x-3 text-left focus:outline-none cursor-pointer"
          >
            {restaurantData.logo && (
              <img
                src={restaurantData.logo}
                alt="Kozyna Logo"
                className="w-10 h-10 object-contain rounded-full border border-gold/50 shadow-sm p-0.5 group-hover:scale-105 transition-transform bg-espresso/20"
              />
            )}
            <div className="flex flex-col items-start">
              <span
                className={`font-serif text-2xl sm:text-3xl tracking-widest-editorial font-medium transition-colors ${
                  isScrolled ? 'text-ivory group-hover:text-gold' : 'text-espresso group-hover:text-gold'
                }`}
              >
                {restaurantData.name}
              </span>
              <span
                className={`text-[9px] tracking-ultra-wide uppercase font-sans mt-0.5 transition-colors ${
                  isScrolled ? 'text-soft-beige/70' : 'text-dark-brown/70'
                }`}
              >
                Jordan · Guimaras
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7">
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleNavClick(item.id)}
                className={`text-xs uppercase tracking-widest-editorial transition-colors py-1 cursor-pointer font-medium ${
                  isScrolled
                    ? 'text-ivory/80 hover:text-gold'
                    : 'text-espresso/80 hover:text-gold'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Action Icons: Audio & Reservation */}
          <div className="hidden sm:flex items-center space-x-4">
            {/* Audio Soundscape Toggle */}
            <button
              onClick={onToggleAudio}
              className={`p-2.5 rounded-full border transition-all backdrop-blur-sm cursor-pointer ${
                isScrolled
                  ? 'border-cream/20 text-ivory/80 hover:text-gold bg-espresso/60'
                  : 'border-espresso/20 text-espresso hover:text-gold hover:border-gold bg-white/60'
              }`}
              title={isAudioPlaying ? 'Mute restaurant ambience' : 'Play restaurant ambience'}
              aria-label="Toggle ambient sound"
            >
              {isAudioPlaying ? (
                <Volume2 className="w-4 h-4 text-gold animate-pulse" />
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
            </button>

            {/* Reserve a Table CTA */}
            <button
              onClick={onOpenReservation}
              className="flex items-center space-x-2 px-6 py-2.5 bg-gold hover:bg-gold-light text-espresso transition-all duration-300 text-xs uppercase tracking-widest-editorial font-semibold shadow-sm hover:shadow-gold/30 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Reserve Table</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center space-x-3">
            <button
              onClick={onToggleAudio}
              className={`p-2 rounded-full border ${
                isScrolled ? 'border-cream/20 text-ivory' : 'border-espresso/30 text-espresso'
              }`}
              aria-label="Toggle ambient sound"
            >
              {isAudioPlaying ? (
                <Volume2 className="w-4 h-4 text-gold" />
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 focus:outline-none cursor-pointer ${
                isScrolled ? 'text-ivory' : 'text-espresso'
              }`}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-espresso/95 backdrop-blur-xl flex flex-col justify-center px-10 py-16 pointer-events-auto lg:hidden animate-fadeIn">
          <div className="text-center mb-8 flex flex-col items-center">
            {restaurantData.logo && (
              <img
                src={restaurantData.logo}
                alt="Kozyna"
                className="w-16 h-16 object-contain rounded-full border border-gold/40 mb-3 p-1 bg-dark-brown"
              />
            )}
            <h2 className="font-serif text-3xl text-ivory tracking-widest-editorial">KOZYNA</h2>
            <p className="text-xs uppercase tracking-ultra-wide text-gold mt-1 font-mono">Jordan · Guimaras</p>
          </div>

          <div className="flex flex-col space-y-4 items-center">
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleNavClick(item.id)}
                className="text-base uppercase tracking-widest-editorial text-ivory/90 hover:text-gold transition-colors font-serif py-1 cursor-pointer"
              >
                {item.label}
              </button>
            ))}

            <div className="pt-6 w-full max-w-xs">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenReservation();
                }}
                className="w-full py-3.5 bg-gold text-espresso text-xs uppercase tracking-widest-editorial font-semibold cursor-pointer shadow-md"
              >
                Reserve Your Table
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
