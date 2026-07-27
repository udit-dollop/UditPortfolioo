import { motion } from 'framer-motion';
import { Smartphone, Zap, Layers, Gauge } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { TiltSpotlightCard } from './TiltSpotlightCard';

const PRINCIPLES = [
  {
    icon: Smartphone,
    title: 'Modern Core',
    body: 'Declarative UI design using Jetpack Compose combined with deep XML integration.',
  },
  {
    icon: Layers,
    title: 'Clean Architecture',
    body: 'MVVM & MVC structured code keeping data, domain, and presentation separated.',
  },
  {
    icon: Zap,
    title: 'Real-time & Network',
    body: 'WebSockets via Socket.io, real-time video SDKs, and type-safe API requests with Retrofit.',
  },
  {
    icon: Gauge,
    title: 'Performance Optimization',
    body: 'Profiling application performance to resolve memory leaks and stabilize frame rates.',
  },
];

const JOURNEY = [
  {
    year: '2023',
    title: 'BCA & Technical Foundations',
    company: 'MCNU, Bhopal',
    desc: 'Began Bachelor of Computer Applications, diving deep into computer science fundamentals, data structures, and algorithms.',
  },
  {
    year: '2024',
    title: 'Professional Android Dev',
    company: 'Dollop Infotech Pvt. Ltd.',
    desc: 'Joined Dollop Infotech shipping production features, optimizing application performance, and maintaining offline persistence layers.',
  },
  {
    year: 'Present',
    title: 'Building Modern Ecosystems',
    company: 'Freelance & Projects',
    desc: 'Focusing on Jetpack Compose, payment flows (Cashfree), audio/video playback (ExoPlayer), and modular clean architecture.',
  },
];

export function About() {
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
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section id="about" className="section-padding relative bg-transparent overflow-hidden border-t border-zinc-200/50 dark:border-zinc-800/50">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="About me"
          title="Building functional, reliable Android experiences"
          description="A developer dedicated to code quality, interface polish, and robust app architecture."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10%' }}
          className="mt-16 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16"
        >
          {/* Narrative & Focus */}
          <motion.div variants={itemVariants} className="flex flex-col gap-8">
            <div className="space-y-4 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
              <p>
                I am a results-driven Android Developer with hands-on experience building scalable, production-grade mobile applications. My expertise covers both Kotlin and Java, focused on implementing modular code architectures (MVVM/MVC) and high-performance user interfaces.
              </p>
              <p>
                I specialize in standard native APIs, local databases (Room/SQLite), real-time synchronization, and external API consumption. I enjoy solving hard engineering challenges like visual profiling, thread handling, and optimizing build pipelines.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 mt-4">
              {PRINCIPLES.map((item) => {
                const Icon = item.icon;
                return (
                  <TiltSpotlightCard
                    key={item.title}
                    className="group"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 group-hover:bg-accent-500/10 group-hover:text-accent-500 transition-colors">
                      <Icon size={16} />
                    </div>
                    <h3 className="mt-3 text-xs font-bold text-zinc-900 dark:text-zinc-50">{item.title}</h3>
                    <p className="mt-1 text-[11px] leading-relaxed text-zinc-400 dark:text-zinc-500">{item.body}</p>
                  </TiltSpotlightCard>
                );
              })}
            </div>
          </motion.div>

          {/* Timeline of growth */}
          <motion.div variants={itemVariants} className="flex flex-col gap-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Timeline</h3>
            
            <div className="relative border-l border-zinc-200 dark:border-zinc-800 pl-4 ml-2 space-y-8">
              {JOURNEY.map((milestone) => (
                <div key={milestone.year} className="relative group">
                  {/* indicator node */}
                  <div className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full border-2 border-bg bg-zinc-300 dark:bg-zinc-700 group-hover:bg-accent-500 dark:group-hover:bg-accent-400 transition-colors" />
                  
                  <div className="flex flex-wrap items-baseline gap-2">
                    <span className="font-mono text-xs font-semibold text-accent-500 dark:text-accent-400">
                      {milestone.year}
                    </span>
                    <span className="text-xs font-bold text-zinc-900 dark:text-zinc-50">
                      {milestone.title}
                    </span>
                    <span className="text-[10px] text-zinc-400 dark:text-zinc-500">
                      • {milestone.company}
                    </span>
                  </div>
                  <p className="mt-2 text-[11px] leading-relaxed text-zinc-400 dark:text-zinc-500">
                    {milestone.desc}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
