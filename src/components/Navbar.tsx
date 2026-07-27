import { useEffect, useState } from 'react';
import { Menu, X, Moon, Sun, ArrowRight } from 'lucide-react';
import { NAV_ITEMS, SECTION_IDS } from '@/data/portfolio';
import { useActiveSection, useScrollProgress } from '@/hooks/useScrollAnimations';
import { useTheme } from '@/hooks/useTheme';
import { Magnetic } from './Magnetic';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(SECTION_IDS);
  const progress = useScrollProgress();
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const handleNav = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header className="fixed top-4 inset-x-0 z-50 flex justify-center px-4 w-full pointer-events-none">
        <nav className="flex h-14 w-full max-w-5xl items-center justify-between rounded-2xl border border-zinc-200/30 dark:border-zinc-800/40 bg-white/70 dark:bg-zinc-950/40 backdrop-blur-md px-6 shadow-premium transition-all duration-300 pointer-events-auto relative">
          
          {/* LEFT - BRAND SECTION */}
          <div className="flex items-center">
            <Magnetic>
              <a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  handleNav('#home');
                }}
                className="group flex items-center gap-3"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-accent-500/30 bg-accent-500/10 text-accent-500 font-display font-extrabold text-sm shadow-premium transition-transform duration-200 group-hover:scale-[1.03]">
                  U
                </span>
                <div className="flex flex-col text-left">
                  <span className="font-display text-sm font-bold tracking-tight text-zinc-900 dark:text-zinc-50 leading-none">
                    Udit
                  </span>
                  <span className="text-[9px] font-badge text-zinc-400 dark:text-zinc-500 font-medium mt-1 leading-none">
                    Android Developer
                  </span>
                </div>
              </a>
            </Magnetic>
          </div>

          <div className="h-8 w-[1px] bg-zinc-200/50 dark:bg-zinc-800/50 mx-4 md:block hidden" />

          {/* CENTER - NAVIGATION LINKS */}
          <ul className="hidden items-center gap-1 md:flex-1 md:flex md:justify-center">
            {NAV_ITEMS.map((item) => {
              const isActive = active === item.href.slice(1);
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNav(item.href);
                    }}
                    className={`relative rounded-md px-3 py-1.5 text-xs font-nav font-medium transition-colors duration-200 ${
                      isActive ? 'text-accent-500 dark:text-accent-400 font-semibold' : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute inset-x-2 -bottom-[19px] h-[2px] bg-accent-500 rounded-full flex items-center justify-center">
                        <span className="absolute w-1.5 h-1.5 rounded-full bg-accent-400 shadow-[0_0_8px_rgba(34,197,94,1)]" />
                      </span>
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="h-8 w-[1px] bg-zinc-200/50 dark:bg-zinc-800/50 mx-4 md:block hidden" />

          {/* RIGHT - ACTIONS SECTION */}
          <div className="flex items-center gap-3">
            <Magnetic>
              <button
                onClick={toggle}
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200/50 dark:border-zinc-800/40 bg-white/50 dark:bg-zinc-900/50 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 shadow-premium hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-all duration-200"
              >
                {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
              </button>
            </Magnetic>
            <Magnetic>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleNav('#contact');
                }}
                className="inline-flex items-center justify-center rounded-full bg-accent-500 hover:bg-accent-600 text-zinc-950 px-5 h-9 text-xs hidden md:inline-flex font-nav font-bold transition-all duration-200 shadow-[0_0_12px_rgba(34,197,94,0.25)] hover:scale-[1.01] active:scale-[0.99] gap-1.5"
              >
                Contact Me
                <ArrowRight size={14} strokeWidth={2.5} />
              </a>
            </Magnetic>
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 md:hidden"
            >
              <Menu size={14} />
            </button>
          </div>

          {/* scroll progress bar */}
          <div className="absolute inset-x-0 bottom-0 h-[1.5px] origin-left bg-accent-500 rounded-b-2xl" style={{ transform: `scaleX(${progress})` }} />
        </nav>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-[60] md:hidden transition-all duration-300 ${open ? 'visible' : 'invisible'}`}
        aria-hidden={!open}
      >
        <div
          className={`absolute inset-0 bg-zinc-950/40 backdrop-blur-sm transition-opacity duration-300 ${
            open ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setOpen(false)}
        />
        <aside
          className={`absolute right-0 top-0 flex h-full w-[75%] max-w-xs flex-col border-l border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 transition-transform duration-300 ${
            open ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-display text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              Udit
            </span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50"
            >
              <X size={14} />
            </button>
          </div>

          <ul className="mt-8 flex flex-col gap-1">
            {NAV_ITEMS.map((item, i) => {
              const isActive = active === item.href.slice(1);
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNav(item.href);
                    }}
                    className={`flex items-center justify-between rounded-lg px-3.5 py-2 text-sm font-nav font-medium transition-colors ${
                      isActive
                        ? 'bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50'
                        : 'text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-900/40 dark:text-zinc-400 dark:hover:text-zinc-50'
                    }`}
                    style={{ transitionDelay: `${i * 20}ms` }}
                  >
                    {item.label}
                    <span className="font-mono text-[10px] text-zinc-400">{`0${i + 1}`}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </aside>
      </div>
    </>
  );
}
