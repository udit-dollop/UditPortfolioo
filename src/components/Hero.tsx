import { motion, useMotionValue, useTransform, animate, useInView, useSpring, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowRight, Download, Github, Linkedin, Mail } from 'lucide-react';
import { PROFILE, STATS } from '@/data/portfolio';
import { useTypewriter } from '@/hooks/useScrollAnimations';
import { useEffect, useRef } from 'react';
import { Magnetic } from './Magnetic';
import { TextReveal } from './TextReveal';

function scrollTo(href: string) {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
}

export function Hero() {
  const typed = useTypewriter(PROFILE.roles);
  const heroRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotlightOpacity = useMotionValue(0);
  const spotlightOpacitySpring = useSpring(spotlightOpacity, { damping: 25, stiffness: 200 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!heroRef.current || reducedMotion) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x);
    mouseY.set(y);
    spotlightOpacity.set(1);
  };

  const handleMouseLeave = () => {
    spotlightOpacity.set(0);
  };

  useEffect(() => {
    if (reducedMotion) return;
    const unsubX = mouseX.on('change', (latest) => {
      heroRef.current?.style.setProperty('--hero-mouse-x', `${latest}px`);
    });
    const unsubY = mouseY.on('change', (latest) => {
      heroRef.current?.style.setProperty('--hero-mouse-y', `${latest}px`);
    });
    return () => {
      unsubX();
      unsubY();
    };
  }, [mouseX, mouseY, reducedMotion]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section
      id="home"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex min-h-screen items-center justify-center overflow-hidden py-24 md:py-32 bg-transparent"
    >
      {/* Subtle overlay gradients for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg/10" />

      {/* Cursor spotlight overlay */}
      {!reducedMotion && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-0 mix-blend-screen dark:mix-blend-normal"
          style={{
            opacity: spotlightOpacitySpring,
            background: 'radial-gradient(600px circle at var(--hero-mouse-x, 0px) var(--hero-mouse-y, 0px), rgba(var(--accent), 0.04) 0%, transparent 100%)',
          }}
        />
      )}

      <div className="container-px relative z-10 mx-auto w-full max-w-7xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center"
        >
          {/* LEFT COLUMN - Information */}
          <div className="flex flex-col items-start text-left">
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-1.5 rounded-full border border-accent-500/20 bg-accent-500/10 dark:bg-accent-500/5 px-3.5 py-1.5 text-[11px] font-badge font-bold text-accent-500 dark:text-accent-400 shadow-premium"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-500 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-500" />
              </span>
              Available for Android projects
            </motion.div>

            <TextReveal
              lines={[
                <span>Hi, I&apos;m</span>,
                <span key="name" className="text-accent-500 dark:text-accent-400">Udit Gurjar</span>
              ]}
              tag="h1"
              className="mt-6 font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl lg:text-6xl"
            />

            <motion.div
              variants={itemVariants}
              className="mt-4 flex min-h-[2.5rem] items-center gap-1.5 font-nav text-lg text-zinc-800 dark:text-zinc-200 sm:text-xl font-semibold"
            >
              <span>{typed}</span>
              <span className="inline-block h-5 w-[2px] animate-pulse bg-accent-500 dark:bg-accent-400" />
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="mt-6 max-w-lg text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 sm:text-base"
            >
              {PROFILE.tagline}
            </motion.p>

            <motion.div variants={itemVariants} className="mt-8 flex flex-wrap items-center gap-3">
              <Magnetic>
                <button
                  onClick={() => scrollTo('#projects')}
                  className="btn-primary flex items-center gap-2 text-xs h-10 px-5 bg-accent-500 hover:bg-accent-600 text-zinc-950 hover:scale-[1.01] active:scale-[0.99] font-nav font-bold rounded-xl transition-all shadow-[0_0_12px_rgba(34,197,94,0.2)]"
                >
                  View My Work
                  <ArrowRight size={14} />
                </button>
              </Magnetic>
              <Magnetic>
                <a
                  href="/Udit-Gurjar-Resume.pdf"
                  download
                  onClick={(e) => {
                    e.preventDefault();
                    window.open(PROFILE.linkedin, '_blank', 'noopener');
                  }}
                  className="btn-ghost flex items-center gap-2 text-xs h-10 px-5 border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/10 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 hover:scale-[1.01] active:scale-[0.99] font-nav font-bold rounded-xl transition-all shadow-premium"
                >
                  <Download size={14} />
                  Download Resume
                </a>
              </Magnetic>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-8 flex items-center gap-4 text-xs font-badge font-semibold text-zinc-500 dark:text-zinc-400"
            >
              <span>Find me on</span>
              <div className="flex items-center gap-2">
                <SocialIcon href="https://github.com" label="GitHub">
                  <Github size={15} />
                </SocialIcon>
                <SocialIcon href={PROFILE.linkedin} label="LinkedIn">
                  <Linkedin size={15} />
                </SocialIcon>
                <SocialIcon href={PROFILE.emailHref} label="Email">
                  <Mail size={15} />
                </SocialIcon>
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN - Photo & Stats */}
          <div className="flex flex-col gap-8 lg:items-end relative">
            <motion.div
              variants={itemVariants}
              className="relative self-center lg:self-auto group z-10"
            >
              {/* Dot Grid Pattern */}
              <div className="absolute -left-6 -top-6 -z-10 w-24 h-24 text-accent-500/20 dark:text-accent-500/10 pointer-events-none opacity-80 sm:block hidden">
                <svg width="96" height="96" viewBox="0 0 96 96" fill="currentColor">
                  <pattern id="dot-pattern" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1.5" />
                  </pattern>
                  <rect width="96" height="96" fill="url(#dot-pattern)" />
                </svg>
              </div>

              {/* Glowing Organic Background Blobs */}
              <div className="absolute -right-12 top-12 -z-10 w-64 h-64 bg-accent-500/10 dark:bg-accent-500/5 blur-[50px] rounded-full pointer-events-none" />
              <div className="absolute -left-12 bottom-6 -z-10 w-48 h-48 bg-accent-500/8 dark:bg-accent-500/4 blur-[40px] rounded-full pointer-events-none" />

              <div className="relative overflow-hidden rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-950 p-2 shadow-premium max-w-xs sm:max-w-sm transition-all duration-300 group-hover:border-zinc-300 dark:group-hover:border-zinc-700">
                <img
                  src="/profile.png"
                  alt="Udit Gurjar - Android App Developer"
                  className="h-80 w-80 rounded-2xl object-cover grayscale opacity-90 transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-[1.02]"
                />
              </div>
            </motion.div>

            {/* Consolidate Stats Card */}
            <motion.div
              variants={itemVariants}
              className="rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/40 dark:bg-zinc-950/80 p-6 md:p-8 shadow-premium w-full max-w-md self-center lg:self-auto backdrop-blur-sm relative z-20"
            >
              <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                {STATS.map((stat) => {
                  const displayLabel = stat.label === 'Crash-Rate Improvement' ? 'Crash Rate Improved' : stat.label;
                  return (
                    <div key={stat.label} className="flex flex-col">
                      <div className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 font-mono">
                        <StatCounter value={String(stat.value)} prefix={stat.prefix} suffix={stat.suffix} />
                      </div>
                      <div className="mt-1.5 text-[10px] sm:text-[11px] font-badge font-semibold text-zinc-400 dark:text-zinc-500 leading-normal uppercase tracking-wider">
                        {displayLabel}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <button
        onClick={() => scrollTo('#about')}
        aria-label="Scroll to about"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
      >
        <span className="text-[9px] uppercase tracking-[0.25em] font-semibold">Scroll</span>
        <ArrowDown size={14} className="animate-bounce" />
      </button>
    </section>
  );
}

function SocialIcon({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <Magnetic>
      <a
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel="noopener noreferrer"
        aria-label={label}
        className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50 shadow-premium transition-all duration-200 hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
      >
        {children}
      </a>
    </Magnetic>
  );
}

function StatCounter({ value, prefix = '', suffix = '' }: { value: string; prefix?: string; suffix?: string }) {
  const numericValue = parseInt(value.replace(/\D/g, ''), 10);
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => Math.round(latest));
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-5%' });

  useEffect(() => {
    if (inView) {
      const controls = animate(motionValue, numericValue, {
        duration: 1.0,
        ease: [0.16, 1, 0.3, 1],
      });
      return controls.stop;
    }
  }, [inView, numericValue, motionValue]);

  useEffect(() => {
    return rounded.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${latest}${suffix}`;
      }
    });
  }, [rounded, prefix, suffix]);

  return <span ref={ref} className="font-mono">{prefix}0{suffix}</span>;
}
