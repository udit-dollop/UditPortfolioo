import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useReducedMotion, animate } from 'framer-motion';

const SECTIONS = [
  { id: 'home', type: 'bg' },
  { id: 'about', type: 'soft' },
  { id: 'skills', type: 'bg' },
  { id: 'experience', type: 'soft' },
  { id: 'projects', type: 'bg' },
  { id: 'education', type: 'soft' },
  { id: 'contact', type: 'bg' },
];

export function AmbientBackground() {
  const { scrollY } = useScroll();
  const reducedMotion = useReducedMotion();
  const [scrollMap, setScrollMap] = useState<number[]>([0, 1000]);
  const [progressMap, setProgressMap] = useState<number[]>([0, 0]);

  // Dynamic calculation of scroll offset map based on section positions
  useEffect(() => {
    const calculateMap = () => {
      const offsets: number[] = [];
      const progress: number[] = [];

      SECTIONS.forEach((section) => {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const offsetTop = rect.top + window.scrollY;
          offsets.push(offsetTop);
          progress.push(section.type === 'soft' ? 100 : 0);
        }
      });

      if (offsets.length > 0) {
        // Ensure mapping starts at scroll 0
        if (offsets[0] !== 0) {
          offsets.unshift(0);
          progress.unshift(progress[0] || 0);
        }
        setScrollMap(offsets);
        setProgressMap(progress);
      }
    };

    calculateMap();
    window.addEventListener('resize', calculateMap);
    
    // Recalculate once after a short delay to account for dynamic layout shifts
    const t = setTimeout(calculateMap, 1000);

    return () => {
      window.removeEventListener('resize', calculateMap);
      clearTimeout(t);
    };
  }, []);

  // Interpolated progress of bg color shift
  const bgProgress = useTransform(scrollY, scrollMap, progressMap);

  // Scroll-synced vignette opacity
  const vignetteOpacity = useTransform(scrollY, (latest) => {
    // breathing wave tied to physical scrolling position
    return Math.sin(latest / 150) * 0.015 + 0.035;
  });

  // Floating gradient orbs positions
  const orb1X = useMotionValue(15);
  const orb1Y = useMotionValue(20);
  const orb2X = useMotionValue(85);
  const orb2Y = useMotionValue(65);

  useEffect(() => {
    if (reducedMotion) return;

    const controls = [
      animate(orb1X, [15, 38, 22, 45, 15], {
        duration: 32,
        repeat: Infinity,
        repeatType: 'mirror',
        ease: 'easeInOut',
      }),
      animate(orb1Y, [20, 55, 32, 68, 20], {
        duration: 38,
        repeat: Infinity,
        repeatType: 'mirror',
        ease: 'easeInOut',
      }),
      animate(orb2X, [85, 50, 72, 42, 85], {
        duration: 35,
        repeat: Infinity,
        repeatType: 'mirror',
        ease: 'easeInOut',
      }),
      animate(orb2Y, [65, 32, 58, 22, 65], {
        duration: 40,
        repeat: Infinity,
        repeatType: 'mirror',
        ease: 'easeInOut',
      }),
    ];

    // Visibility-based pause logic
    const handleVisibility = () => {
      if (document.hidden) {
        document.body.classList.add('paused-bg-animations');
        controls.forEach((c) => c.pause());
      } else {
        document.body.classList.remove('paused-bg-animations');
        controls.forEach((c) => c.play());
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      controls.forEach((c) => c.stop());
      document.removeEventListener('visibilitychange', handleVisibility);
      document.body.classList.remove('paused-bg-animations');
    };
  }, [reducedMotion, orb1X, orb1Y, orb2X, orb2Y]);

  const progressPercent = useTransform(bgProgress, (v) => `${v}%`);
  const finalVignetteOpacity = reducedMotion ? 0.03 : vignetteOpacity;

  return (
    <motion.div
      className="fixed inset-0 -z-50 pointer-events-none overflow-hidden"
      style={{
        backgroundColor: 'rgb(var(--bg))', // Fallback
        backgroundImage: 'radial-gradient(circle, transparent, transparent)', // dummy
        // Native CSS variables mixing color transition:
        ...({
          '--bg-progress': progressPercent,
          backgroundColor: 'color-mix(in srgb, rgb(var(--bg-soft)) var(--bg-progress, 0%), rgb(var(--bg)))',
        } as any),
      }}
    >
      {/* 32px panning CSS grid */}
      <div className="absolute inset-0 bg-grid opacity-100" />

      {/* Floating Gradient Orbs */}
      {!reducedMotion && (
        <>
          <motion.div
            className="absolute rounded-full bg-accent-500/5 dark:bg-accent-400/5 blur-[120px] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px]"
            style={{
              left: useTransform(orb1X, (v) => `${v}%`),
              top: useTransform(orb1Y, (v) => `${v}%`),
              transform: 'translate(-50%, -50%)',
            }}
          />
          <motion.div
            className="absolute rounded-full bg-accent-500/4 dark:bg-accent-400/4 blur-[120px] w-[45vw] h-[45vw] max-w-[500px] max-h-[500px]"
            style={{
              left: useTransform(orb2X, (v) => `${v}%`),
              top: useTransform(orb2Y, (v) => `${v}%`),
              transform: 'translate(-50%, -50%)',
            }}
          />
        </>
      )}

      {/* Breathing Noise Texture overlay */}
      <div className="absolute inset-0 bg-noise animate-noise-pulse" />

      {/* Viewport Vignette */}
      <motion.div
        className="absolute inset-0 vignette-overlay"
        style={{
          opacity: finalVignetteOpacity,
        }}
      />
    </motion.div>
  );
}
