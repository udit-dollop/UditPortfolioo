import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Smartphone, Building2, Network, Database, Wrench, type LucideIcon } from 'lucide-react';
import { SKILL_GROUPS } from '@/data/portfolio';
import { SectionHeading } from './SectionHeading';
import { TechBadge } from './TechBadge';
import { Magnetic } from './Magnetic';

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  Code2,
  Smartphone,
  Building2,
  Network,
  Database,
  Wrench,
};

const SKILL_LEVELS: Record<string, number> = {
  'Kotlin': 95,
  'Java': 85,
  'C': 75,
  'Jetpack Compose': 95,
  'XML': 90,
  'ViewPager2': 80,
  'ExoPlayer': 85,
  'Data Binding': 85,
  'MVVM': 95,
  'MVC': 85,
  'Clean Architecture': 90,
  'Retrofit': 90,
  'REST API': 95,
  'JSON': 90,
  'Postman': 85,
  'SQLite': 80,
  'Room': 90,
  'Android Studio': 95,
  'Git / GitHub': 90,
  'Firebase Auth': 85,
  'Gradle': 80,
  'Socket.io': 85,
  'Stream SDK': 80,
  'Cashfree': 80,
};

export function Skills() {
  const [activeCategory, setActiveCategory] = useState(SKILL_GROUPS[0]?.category || '');

  const activeGroup = SKILL_GROUPS.find((g) => g.category === activeCategory) || SKILL_GROUPS[0];

  const sidebarVariants = {
    hidden: { opacity: 0, x: -12 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  };

  return (
    <section id="skills" className="section-padding relative bg-transparent border-t border-zinc-200/50 dark:border-zinc-800/50">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Tech Stack"
          title="My engineering tools"
          description="Click on any category to explore specific tool integrations and my familiarity levels."
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-[250px_1fr] lg:gap-12">
          {/* LEFT - Categories Navigation */}
          <motion.div
            variants={sidebarVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-row overflow-x-auto gap-2 pb-3 lg:flex-col lg:overflow-x-visible lg:pb-0 lg:border-r lg:border-zinc-200/50 lg:dark:border-zinc-800/50 lg:pr-6 scrollbar-none"
          >
            {SKILL_GROUPS.map((group) => {
              const Icon = CATEGORY_ICONS[group.icon] || Code2;
              const isSelected = group.category === activeCategory;

              return (
                <Magnetic key={group.category}>
                  <button
                    onClick={() => setActiveCategory(group.category)}
                    className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                      isSelected
                        ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 shadow-premium'
                        : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-zinc-50 dark:hover:bg-zinc-900/50'
                    }`}
                  >
                    <Icon size={14} />
                    <span>{group.category}</span>
                  </button>
                </Magnetic>
              );
            })}
          </motion.div>

          {/* RIGHT - Skills Showcase */}
          <div className="min-h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {activeGroup.skills.map((skill) => {
                  const level = SKILL_LEVELS[skill.name] || 80;
                  return (
                    <div
                      key={skill.name}
                      className="group rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white/50 dark:bg-zinc-900/10 p-5 shadow-premium hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-200"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <TechBadge name="" icon={skill.icon} size={36} />
                          <span className="text-xs font-bold text-zinc-900 dark:text-zinc-50">
                            {skill.name}
                          </span>
                        </div>
                        <span className="font-mono text-[10px] font-semibold text-zinc-400 dark:text-zinc-500">
                          {level}%
                        </span>
                      </div>

                      {/* Animated Progress Bar */}
                      <div className="mt-4 h-1 w-full rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${level}%` }}
                          transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
                          className="h-full bg-accent-500 dark:bg-accent-400 rounded-full"
                        />
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Infinite Horizontal Marquee */}
        <div className="mt-20 border-y border-zinc-200/40 dark:border-zinc-800/40 py-8 overflow-hidden relative select-none">
          {/* Left gradient overlay */}
          <div className="absolute left-0 inset-y-0 w-24 sm:w-48 bg-gradient-to-r from-zinc-50 via-zinc-50/80 to-transparent dark:from-zinc-950 dark:via-zinc-950/80 pointer-events-none z-10" />
          
          {/* Right gradient overlay */}
          <div className="absolute right-0 inset-y-0 w-24 sm:w-48 bg-gradient-to-l from-zinc-50 via-zinc-50/80 to-transparent dark:from-zinc-950 dark:via-zinc-950/80 pointer-events-none z-10" />

          <div className="flex gap-12 sm:gap-20 w-max animate-marquee hover:[animation-play-state:paused] whitespace-nowrap text-base sm:text-2xl font-black text-zinc-400/50 dark:text-zinc-600/40 items-center">
            {[
              'Kotlin', 'Java', 'Android Studio', 'Jetpack Compose', 'MVVM', 'Room DB',
              'Retrofit', 'Firebase', 'Git & GitHub', 'ExoPlayer', 'Socket.io', 'Gradle'
            ].concat([
              'Kotlin', 'Java', 'Android Studio', 'Jetpack Compose', 'MVVM', 'Room DB',
              'Retrofit', 'Firebase', 'Git & GitHub', 'ExoPlayer', 'Socket.io', 'Gradle'
            ], [
              'Kotlin', 'Java', 'Android Studio', 'Jetpack Compose', 'MVVM', 'Room DB',
              'Retrofit', 'Firebase', 'Git & GitHub', 'ExoPlayer', 'Socket.io', 'Gradle'
            ], [
              'Kotlin', 'Java', 'Android Studio', 'Jetpack Compose', 'MVVM', 'Room DB',
              'Retrofit', 'Firebase', 'Git & GitHub', 'ExoPlayer', 'Socket.io', 'Gradle'
            ]).map((item, idx) => (
              <div key={idx} className="flex items-center gap-12 sm:gap-20">
                <span className="hover:text-accent-500 dark:hover:text-accent-400 hover:scale-105 transition-all duration-300 cursor-pointer">
                  {item}
                </span>
                <span className="text-accent-500/20 dark:text-accent-400/20 font-bold select-none text-sm sm:text-xl">✦</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
