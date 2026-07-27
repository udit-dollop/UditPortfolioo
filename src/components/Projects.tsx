import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Github } from 'lucide-react';
import { PROJECTS, PROFILE } from '@/data/portfolio';
import { SectionHeading } from './SectionHeading';
import { Magnetic } from './Magnetic';

export function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Autoplay functionality
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % PROJECTS.length);
    }, 5000); // changes project every 5 seconds
    return () => clearInterval(interval);
  }, [isHovered]);

  const activeProject = PROJECTS[activeIndex];

  return (
    <section id="projects" className="section-padding relative bg-transparent border-t border-zinc-200/50 dark:border-zinc-800/50">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Portfolio"
          titleLines={[
            <span key="featured">Featured </span>,
            <span key="projects" className="text-accent-500 dark:text-accent-400">Projects</span>
          ]}
          description="A showcase of production-grade Android applications, built from the ground up."
        />

        <div className="mt-16 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="w-full grid gap-12 lg:grid-cols-2 bg-white/30 dark:bg-zinc-900/10 rounded-3xl border border-zinc-200/50 dark:border-zinc-800/50 p-8 sm:p-12 lg:p-16 shadow-premium backdrop-blur-sm relative overflow-hidden"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* LEFT COLUMN - COPY */}
              <div className="flex flex-col items-start justify-center relative z-10">
                <span className="rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 px-3.5 py-1 text-[10px] font-badge font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  {activeProject.category}
                </span>

                <h3 className="mt-6 font-heading text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
                  {activeProject.name}
                </h3>
                
                <p className="mt-2 text-sm sm:text-base font-semibold text-accent-500 dark:text-accent-400">
                  {activeProject.tagline}
                </p>

                <p className="mt-4 text-xs sm:text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                  {activeProject.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {activeProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 px-3 py-1.5 text-[10px] font-semibold text-zinc-500 dark:text-zinc-400 font-mono select-none"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Magnetic>
                    <a
                      href={PROFILE.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary flex items-center gap-2 text-xs h-10 px-5 bg-accent-500 hover:bg-accent-600 text-white rounded-xl shadow-premium hover:scale-[1.01] active:scale-[0.99] font-nav font-semibold transition-all"
                    >
                      Live Demo
                      <ArrowRight size={14} />
                    </a>
                  </Magnetic>
                  <Magnetic>
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-ghost flex items-center gap-2 text-xs h-10 px-5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900 shadow-premium hover:scale-[1.01] active:scale-[0.99] font-nav font-semibold transition-all"
                    >
                      <Github size={14} />
                      Source Code
                    </a>
                  </Magnetic>
                </div>
              </div>

              {/* RIGHT COLUMN - DEVICE MOCKUP */}
              <div className="flex justify-center items-center relative min-h-[360px] lg:min-h-[440px] select-none overflow-hidden lg:overflow-visible">
                {/* Orbit Glowing Background */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  {/* Inner dashed ring */}
                  <div className="absolute rounded-full border border-dashed border-accent-500/20 dark:border-accent-400/10 w-[240px] h-[240px] animate-[spin_60s_linear_infinite]" />
                  {/* Middle solid ring */}
                  <div className="absolute rounded-full border border-zinc-200/50 dark:border-zinc-800/40 w-[340px] h-[340px]" />
                  {/* Outer solid ring */}
                  <div className="absolute rounded-full border border-zinc-200/30 dark:border-zinc-800/20 w-[440px] h-[440px]" />
                  
                  {/* Glow effect */}
                  <div className="absolute rounded-full bg-accent-500/10 dark:bg-accent-500/5 blur-[80px] w-[260px] h-[260px]" />
                  
                  {/* Orbital indicator dots */}
                  <div className="absolute w-[340px] h-[340px] animate-[spin_40s_linear_infinite] pointer-events-none">
                    <div className="absolute top-[12%] right-[12%] h-2 w-2 rounded-full bg-accent-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
                  </div>
                  <div className="absolute w-[440px] h-[440px] animate-[spin_55s_linear_infinite_reverse] pointer-events-none">
                    <div className="absolute bottom-[20%] left-[10%] h-1.5 w-1.5 rounded-full bg-accent-500/60" />
                    <div className="absolute top-[30%] right-[5%] h-2 w-2 rounded-full bg-accent-400/80 shadow-[0_0_6px_rgba(52,211,153,0.5)]" />
                  </div>
                </div>

                {/* Mockup image */}
                <motion.div
                  key={activeIndex}
                  initial={{ scale: 0.9, opacity: 0, rotate: -2 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="relative z-10 w-[180px] sm:w-[200px] lg:w-[220px] drop-shadow-[0_20px_50px_rgba(0,0,0,0.35)] hover:scale-[1.03] transition-transform duration-300"
                >
                  <img
                    src={
                      activeProject.name === 'Open Network'
                        ? '/open_network_mockup.png'
                        : activeProject.name === 'NinjaMap'
                        ? '/ninja_map_mockup.png'
                        : activeProject.name === 'Carguu'
                        ? '/carguu_mockup.png'
                        : '/vestorgrow_mockup.png'
                    }
                    alt={`${activeProject.name} App Screenshot`}
                    className="w-full h-auto"
                  />
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pagination Indicators */}
        <div className="flex justify-center items-center gap-3 mt-10">
          {PROJECTS.map((_, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={idx}
                onClick={() => {
                  setActiveIndex(idx);
                }}
                className={`transition-all duration-300 h-2.5 rounded-full ${
                  isActive
                    ? 'w-8 bg-accent-500 dark:bg-accent-400'
                    : 'w-2.5 bg-zinc-300 dark:bg-zinc-800 hover:bg-zinc-400 dark:hover:bg-zinc-700'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
