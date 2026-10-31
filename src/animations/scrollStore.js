/**
 * High-performance mutable scroll store with smoothed velocity tracking
 * Supports real-time cinematic motion blur and shutter speed dynamics.
 */

export const scrollStore = {
  progress: 0,
  velocity: 0,
  smoothedVelocity: 0,
  currentScene: 0,
};

const listeners = new Set();

export function updateScrollProgress(p, vel = 0) {
  scrollStore.progress = p;
  scrollStore.velocity = Math.abs(vel);

  const newScene = Math.min(7, Math.floor(p * 8));
  if (newScene !== scrollStore.currentScene) {
    scrollStore.currentScene = newScene;
  }

  listeners.forEach((fn) => fn(p, scrollStore.currentScene, scrollStore.velocity));
}

export function subscribeScroll(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
