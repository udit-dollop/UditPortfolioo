import { Linkedin, Mail, Phone, ArrowUp } from 'lucide-react';
import { PROFILE, NAV_ITEMS } from '@/data/portfolio';

export function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="border-t border-zinc-200/50 dark:border-zinc-800/50 bg-bg">
      <div className="container-px mx-auto max-w-7xl py-10">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          <div className="text-center md:text-left">
            <p className="font-heading text-sm font-bold text-zinc-900 dark:text-zinc-50">
              Udit Gurjar
            </p>
            <p className="mt-1 text-[10px] font-badge text-zinc-400 dark:text-zinc-500 font-semibold uppercase tracking-wider">
              {PROFILE.title} • Indore, India (GMT+5:30)
            </p>
          </div>

          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-xs font-nav font-semibold text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={socialClass}>
              <Linkedin size={14} />
            </a>
            <a href={PROFILE.emailHref} aria-label="Email" className={socialClass}>
              <Mail size={14} />
            </a>
            <a href={PROFILE.phoneHref} aria-label="Phone" className={socialClass}>
              <Phone size={14} />
            </a>
            <button onClick={scrollTop} aria-label="Back to top" className={socialClass}>
              <ArrowUp size={14} />
            </button>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-zinc-200/50 dark:border-zinc-800/50 pt-6 text-center text-[10px] font-badge text-zinc-400 dark:text-zinc-500 font-semibold uppercase tracking-wider md:flex-row md:text-left">
          <p>© {new Date().getFullYear()} Udit Gurjar. All rights reserved.</p>
          <p className="inline-flex items-center gap-1">
            Built with React, TypeScript &amp; Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}

const socialClass =
  'flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-400 hover:text-zinc-950 dark:text-zinc-500 dark:hover:text-zinc-50 shadow-premium transition-all duration-200 hover:bg-zinc-50 dark:hover:bg-zinc-850/50';
