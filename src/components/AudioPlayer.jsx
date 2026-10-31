import React, { useEffect, useRef } from 'react';

export default function AudioPlayer({ isPlaying }) {
  const audioCtxRef = useRef(null);
  const gainNodeRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      // Initialize Web Audio synthesizer for warm ambient lounge soundscape
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!audioCtxRef.current) {
          audioCtxRef.current = new AudioContext();
          const masterGain = audioCtxRef.current.createGain();
          masterGain.gain.setValueAtTime(0.001, audioCtxRef.current.currentTime);
          masterGain.connect(audioCtxRef.current.destination);
          gainNodeRef.current = masterGain;

          // Ambient warm pad drone frequencies (warm acoustic resonance: F, A, C, E)
          const freqs = [174.61, 220.00, 261.63, 329.63];
          freqs.forEach((freq) => {
            const osc = audioCtxRef.current.createOscillator();
            const oscGain = audioCtxRef.current.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, audioCtxRef.current.currentTime);
            oscGain.gain.setValueAtTime(0.025, audioCtxRef.current.currentTime);
            osc.connect(oscGain);
            oscGain.connect(masterGain);
            osc.start();
          });
        }

        if (audioCtxRef.current.state === 'suspended') {
          audioCtxRef.current.resume();
        }

        // Fade in smoothly
        gainNodeRef.current.gain.linearRampToValueAtTime(
          0.14,
          audioCtxRef.current.currentTime + 2.0
        );

        // Periodically trigger a soft, organic wine-glass / bell chime harmonic
        const triggerChime = () => {
          if (!audioCtxRef.current || !isPlaying) return;
          const chimeOsc = audioCtxRef.current.createOscillator();
          const chimeGain = audioCtxRef.current.createGain();
          chimeOsc.type = 'sine';
          const chimeFreqs = [587.33, 659.25, 880.00, 1174.66];
          const pick = chimeFreqs[Math.floor(Math.random() * chimeFreqs.length)];
          chimeOsc.frequency.setValueAtTime(pick, audioCtxRef.current.currentTime);

          const now = audioCtxRef.current.currentTime;
          chimeGain.gain.setValueAtTime(0.0001, now);
          chimeGain.gain.linearRampToValueAtTime(0.02, now + 0.1);
          chimeGain.gain.exponentialRampToValueAtTime(0.00001, now + 3.5);

          chimeOsc.connect(chimeGain);
          chimeGain.connect(gainNodeRef.current);
          chimeOsc.start();
          chimeOsc.stop(now + 3.6);
        };

        timerRef.current = setInterval(triggerChime, 6500);
      } catch (e) {
        console.warn('AudioContext not permitted yet:', e);
      }
    } else {
      // Fade out
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.linearRampToValueAtTime(
          0.0001,
          audioCtxRef.current.currentTime + 1.0
        );
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying]);

  return null;
}
