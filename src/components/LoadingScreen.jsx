import React, { useEffect, useState } from 'react';
import { restaurantData } from '../data/restaurant';

export default function LoadingScreen({ onLoaded, onFinished }) {
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsReady(true);
          return 100;
        }
        // Smooth progressive increments
        return prev + Math.floor(Math.random() * 14) + 10;
      });
    }, 90);

    return () => clearInterval(timer);
  }, []);

  const handleEnter = () => {
    if (isExiting) return;
    setIsExiting(true);

    // Notify parent immediately so HeroSection transition starts in sync with curtain lift
    if (onLoaded) onLoaded();

    // After the curtain transition completes, unmount loading screen
    setTimeout(() => {
      if (onFinished) onFinished();
    }, 750);
  };

  return (
    <div
      className={`fixed inset-0 z-[99] bg-espresso flex flex-col items-center justify-center px-6 transition-all duration-700 ease-out ${
        isExiting
          ? 'opacity-0 -translate-y-6 scale-[1.01] pointer-events-none'
          : 'opacity-100 translate-y-0 pointer-events-auto'
      }`}
    >
      <div className="max-w-md w-full text-center flex flex-col items-center">
        {/* Real Kozyna Brand Logo Emblem with spinning gold border accent */}
        <div className="w-20 h-20 rounded-full border border-gold/50 flex items-center justify-center mb-6 relative overflow-hidden shadow-2xl p-1 bg-dark-brown/60">
          {restaurantData.logo ? (
            <img
              src={restaurantData.logo}
              alt="Kozyna Restaurant"
              className="w-full h-full object-contain rounded-full"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gold/20" />
          )}
          <div className="absolute inset-0 rounded-full border border-t-gold border-r-transparent border-b-transparent border-l-transparent animate-spin" />
        </div>

        {/* Wordmark */}
        <h1 className="font-serif text-4xl sm:text-5xl text-ivory tracking-widest-editorial font-normal mb-2">
          {restaurantData.name}
        </h1>

        <p className="text-[10px] sm:text-xs uppercase tracking-ultra-wide text-soft-beige/80 mb-8 font-sans">
          Jordan · Guimaras · Philippines
        </p>

        {/* Progress or Enter Button */}
        {progress < 100 ? (
          <div className="w-48 flex flex-col items-center space-y-3">
            <div className="w-full h-0.5 bg-cream/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gold transition-all duration-200 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-[10px] tracking-widest font-mono text-soft-beige/60">
              Setting the table... {progress}%
            </span>
          </div>
        ) : (
          <button
            onClick={handleEnter}
            className="group px-8 py-3.5 border border-gold bg-gold/15 hover:bg-gold text-ivory hover:text-espresso text-xs uppercase tracking-widest-editorial font-semibold transition-all duration-500 shadow-xl hover:shadow-gold/30 animate-fadeIn cursor-pointer"
          >
            Enter The Experience
          </button>
        )}

        <div className="mt-14 text-[9px] uppercase tracking-ultra-wide text-soft-beige/40 font-mono">
          An Artisanal Island Dining Journey
        </div>
      </div>
    </div>
  );
}
