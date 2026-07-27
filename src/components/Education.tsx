import { motion } from 'framer-motion';
import { GraduationCap, Calendar, BookOpen } from 'lucide-react';
import { EDUCATION } from '@/data/portfolio';
import { SectionHeading } from './SectionHeading';
import { TiltSpotlightCard } from './TiltSpotlightCard';

export function Education() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
    <section id="education" className="section-padding relative bg-transparent border-t border-zinc-200/50 dark:border-zinc-800/50">
      <div className="container-px mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Education"
          title="Academic Foundations"
          description="Developing the technical depth and software engineering practices behind my development work."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10%' }}
          className="mt-16 grid gap-6 sm:grid-cols-2"
        >
          {EDUCATION.map((edu) => (
            <motion.div
              key={edu.degree}
              variants={itemVariants}
            >
              <TiltSpotlightCard className="group h-full">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 group-hover:bg-accent-500/10 group-hover:text-accent-500 transition-colors">
                    <GraduationCap size={16} />
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-2.5 py-1 font-mono text-[9px] text-zinc-400 dark:text-zinc-500 shadow-premium">
                    <Calendar size={10} />
                    {edu.period}
                  </span>
                </div>

                <h3 className="mt-5 text-sm font-bold leading-snug text-zinc-900 dark:text-zinc-50">
                  {edu.degree}
                </h3>
                
                <p className="mt-1.5 inline-flex items-center gap-1.5 text-xs font-semibold text-accent-500 dark:text-accent-400">
                  <BookOpen size={12} />
                  {edu.org}
                </p>
                
                <p className="mt-3 text-[11px] leading-relaxed text-zinc-500 dark:text-zinc-400">
                  {edu.detail}
                </p>
              </TiltSpotlightCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
