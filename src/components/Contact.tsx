import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Linkedin, MapPin, Send, CheckCircle2, Loader2, ArrowUpRight } from 'lucide-react';
import { PROFILE } from '@/data/portfolio';
import { SectionHeading } from './SectionHeading';
import { Magnetic } from './Magnetic';
import { TiltSpotlightCard } from './TiltSpotlightCard';

type Status = 'idle' | 'submitting' | 'success';

const SOCIALS = [
  { label: 'Email', value: PROFILE.email, href: PROFILE.emailHref, icon: Mail },
  { label: 'Phone', value: PROFILE.phone, href: PROFILE.phoneHref, icon: Phone },
  { label: 'LinkedIn', value: PROFILE.linkedinLabel, href: PROFILE.linkedin, icon: Linkedin, external: true },
];

export function Contact() {
  const [status, setStatus] = useState<Status>('idle');
  const [wasFallback, setWasFallback] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      setWasFallback(false);
      const response = await fetch('http://localhost:3001/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus('idle');
        alert(result.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      // Fallback to mailto link if backend server is not running
      setWasFallback(true);
      const subject = encodeURIComponent(`Portfolio enquiry from ${form.name || 'a visitor'}`);
      const body = encodeURIComponent(
        `${form.message}\n\n— ${form.name}\n${form.email}`,
      );
      window.setTimeout(() => {
        window.location.href = `${PROFILE.emailHref}?subject=${subject}&body=${body}`;
        setStatus('success');
      }, 500);
    }
  };

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

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
    <section id="contact" className="section-padding relative overflow-hidden bg-transparent border-t border-zinc-200/50 dark:border-zinc-800/50">
      <div className="container-px mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build together"
          description="Interested in collaborating, hiring, or talking shop? Reach out directly or fill in the quick form below."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10%' }}
          className="mt-16 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12"
        >
          {/* Social direct links side */}
          <motion.div variants={itemVariants} className="flex flex-col gap-6">
            <TiltSpotlightCard className="h-full">
              <h3 className="text-xs font-badge font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                Reach Me Directly
              </h3>
              
              <div className="mt-4 flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-500 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-500" />
                </span>
                <span>Active availability status: open to remote or local roles</span>
              </div>

              <div className="mt-6 space-y-3">
                {SOCIALS.map((s) => (
                  <Magnetic key={s.label} className="w-full block">
                    <a
                      href={s.href}
                      target={s.external ? '_blank' : undefined}
                      rel={s.external ? 'noopener noreferrer' : undefined}
                      className="group flex items-center gap-4 rounded-xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white/50 dark:bg-zinc-900/10 p-4 transition-all duration-200 hover:border-zinc-300 dark:hover:border-zinc-700 shadow-premium"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 group-hover:bg-accent-500/10 group-hover:text-accent-500 transition-colors">
                        <s.icon size={15} />
                      </span>
                      <div className="min-w-0">
                        <p className="text-[10px] font-badge uppercase tracking-wider font-semibold text-zinc-400 dark:text-zinc-500">{s.label}</p>
                        <p className="truncate text-xs font-nav font-bold text-zinc-900 dark:text-zinc-50">{s.value}</p>
                      </div>
                      <ArrowUpRight size={14} className="ml-auto shrink-0 text-zinc-400 dark:text-zinc-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  </Magnetic>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-2 rounded-xl bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200/50 dark:border-zinc-800/50 p-4 text-xs text-zinc-500 dark:text-zinc-400 shadow-premium">
                <MapPin size={14} className="shrink-0 text-zinc-400 dark:text-zinc-500" />
                <span>Indore, Madhya Pradesh, India</span>
              </div>
            </TiltSpotlightCard>
          </motion.div>

          {/* Contact form side */}
          <motion.div variants={itemVariants}>
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/20 p-6 sm:p-8 shadow-premium space-y-4"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Your name" htmlFor="name">
                  <input
                    id="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={update('name')}
                    placeholder="Jane Doe"
                    className={inputClass}
                  />
                </Field>
                <Field label="Your email" htmlFor="email">
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={update('email')}
                    placeholder="jane@company.com"
                    className={inputClass}
                  />
                </Field>
              </div>

              <div>
                <Field label="Message" htmlFor="message">
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={update('message')}
                    placeholder="Tell me about the role or project details…"
                    className={`${inputClass} resize-none`}
                  />
                </Field>
              </div>

              <Magnetic className="w-full block">
                <button
                  type="submit"
                  disabled={status !== 'idle'}
                  className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-85 flex items-center justify-center gap-2 h-9 text-xs font-nav font-bold shadow-premium"
                >
                  {status === 'idle' && (
                    <>
                      <Send size={12} /> Send message
                    </>
                  )}
                  {status === 'submitting' && (
                    <>
                      <Loader2 size={12} className="animate-spin" /> Sending…
                    </>
                  )}
                  {status === 'success' && (
                    <>
                      <CheckCircle2 size={12} /> {wasFallback ? 'Opening mail client...' : 'Message sent!'}
                    </>
                  )}
                </button>
              </Magnetic>

              {status === 'success' && (
                <p className="mt-3 text-center text-[10px] text-zinc-400 dark:text-zinc-500">
                  {wasFallback ? (
                    <>
                      Mail client not opening?{' '}
                      <a href={PROFILE.emailHref} className="text-accent-500 hover:underline">
                        Email me directly
                      </a>.
                    </>
                  ) : (
                    "Thank you! Your message was sent securely and I'll get back to you shortly."
                  )}
                </p>
              )}
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

const inputClass =
  'w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/20 px-3.5 py-2.5 text-xs text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 transition-all duration-200 focus:border-zinc-400 dark:focus:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-accent-500/10';

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="mb-1.5 block text-[10px] font-badge font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">{label}</span>
      {children}
    </label>
  );
}
