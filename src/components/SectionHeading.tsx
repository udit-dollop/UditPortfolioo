import { Reveal } from './Reveal';
import { TextReveal } from './TextReveal';

interface SectionHeadingProps {
  eyebrow: string;
  title?: string;
  titleLines?: React.ReactNode[];
  description?: string;
  align?: 'left' | 'center';
}

export function SectionHeading({ eyebrow, title, titleLines, description, align = 'center' }: SectionHeadingProps) {
  const alignment = align === 'center' ? 'items-center text-center' : 'items-start text-left';
  return (
    <Reveal className={`flex flex-col ${alignment}`}>
      <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 px-3 py-1 font-badge text-[10px] uppercase tracking-wider text-zinc-600 dark:text-zinc-400 shadow-premium">
        <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
        {eyebrow}
      </span>
      {titleLines ? (
        <TextReveal
          lines={titleLines}
          tag="h2"
          className="mt-4 font-heading text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl lg:text-4xl"
        />
      ) : (
        <TextReveal
          text={title}
          tag="h2"
          className="mt-4 font-heading text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl lg:text-4xl"
        />
      )}
      {description && (
        <p className="mt-3 max-w-xl text-xs leading-relaxed text-zinc-500 dark:text-zinc-400 text-balance">{description}</p>
      )}
    </Reveal>
  );
}
