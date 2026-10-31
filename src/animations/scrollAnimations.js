import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenisInstance = null;
let tickerCallback = null;

export function initSmoothScroll(onScrollProgress) {
  if (lenisInstance) {
    destroySmoothScroll();
  }

  // Initialize Lenis smooth scroll for luxury editorial feel
  lenisInstance = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 0.9,
    touchMultiplier: 1.5,
  });

  // Sync ScrollTrigger with Lenis
  lenisInstance.on('scroll', (e) => {
    ScrollTrigger.update();
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? Math.max(0, Math.min(1, e.scroll / maxScroll)) : 0;
    const velocity = Math.abs(e.velocity || 0);

    if (onScrollProgress) {
      onScrollProgress(progress, velocity);
    }
  });

  tickerCallback = (time) => {
    if (lenisInstance && typeof lenisInstance.raf === 'function') {
      lenisInstance.raf(time * 1000);
    }
  };

  gsap.ticker.add(tickerCallback);
  gsap.ticker.lagSmoothing(0);

  return lenisInstance;
}

export function scrollToProgress(progress, duration = 1.2) {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const targetY = progress * maxScroll;

  if (lenisInstance && typeof lenisInstance.scrollTo === 'function') {
    lenisInstance.scrollTo(targetY, { duration });
  } else {
    window.scrollTo({
      top: targetY,
      behavior: 'smooth',
    });
  }
}

export function scrollToElement(id) {
  if (id === 'hero-section') {
    if (lenisInstance) {
      lenisInstance.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    return;
  }
  const el = document.getElementById(id);
  if (el) {
    if (lenisInstance) {
      lenisInstance.scrollTo(el, { duration: 1.2, offset: -40 });
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

export function destroySmoothScroll() {
  if (tickerCallback) {
    gsap.ticker.remove(tickerCallback);
    tickerCallback = null;
  }
  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
  }
}
