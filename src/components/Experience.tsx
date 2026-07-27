import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { EXPERIENCE } from '@/data/portfolio';
import { SectionHeading } from './SectionHeading';

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end center'],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    <section id="experience" className="section-padding relative bg-transparent border-t border-zinc-200/50 dark:border-zinc-800/50">
      <div className="container-px mx-auto max-w-4xl">
        <SectionHeading
          eyebrow="Experience"
          title="Work History"
          description="My professional history of building and stabilizing mobile products."
        />

        <motion.div
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10%' }}
          className="relative mt-16 pl-6 sm:pl-10 ml-2 space-y-12"
        >
          {/* Animated vertical line */}
          <motion.div
            style={{ scaleY }}
            className="absolute left-2 top-0 bottom-0 w-[1px] bg-zinc-200 dark:bg-zinc-800 origin-top"
          />

          {EXPERIENCE.map((exp) => {
            const companyInitials = exp.company.slice(0, 1);

            return (
              <motion.div
                key={exp.company}
                variants={itemVariants}
                className="relative group"
              >
                {/* Custom timeline badge placeholder */}
                <motion.div
                  variants={{
                    hidden: { scale: 0.5, opacity: 0 },
                    visible: { 
                      scale: 1, 
                      opacity: 1,
                      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
                    }
                  }}
                  className="absolute -left-[45px] sm:-left-[61px] top-1.5 z-10 flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs font-black tracking-tight text-zinc-900 dark:text-zinc-50 shadow-premium transition-transform duration-200 group-hover:scale-105"
                >
                  {companyInitials}
                </motion.div>

                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">
                        {exp.role}
                      </h3>
                      <p className="text-xs font-semibold text-accent-500 dark:text-accent-400">
                        {exp.company}
                      </p>
                    </div>
                    
                    <div className="flex flex-col items-end gap-1 text-[10px] font-mono text-zinc-400 dark:text-zinc-500">
                      <span>{exp.period}</span>
                      <span className="flex items-center gap-1">
                        <MapPin size={10} /> {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Achievement items */}
                  <ul className="space-y-2">
                    {exp.points.map((point, pi) => (
                      <li
                        key={pi}
                        className="relative pl-3.5 text-[11px] leading-relaxed text-zinc-500 dark:text-zinc-400 before:absolute before:left-0 before:top-2 before:h-1 before:w-1 before:rounded-full before:bg-zinc-300 dark:before:bg-zinc-700"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
