import type { ReactNode } from 'react';
import { useReveal } from '@/hooks/useScrollAnimations';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
  once?: boolean;
  as?: keyof JSX.IntrinsicElements;
}

/**
 * Wrap children in a `.reveal` element that fades + slides up when scrolled
 * into view. `delay` is in ms and staggers groups of elements.
 */
export function Reveal({
  children,
  className = '',
  delay = 0,
  threshold = 0.15,
  once = true,
  as: Tag = 'div',
}: RevealProps) {
  const ref = useReveal<HTMLElement>({ threshold, once, delay });

  return (
    // @ts-expect-error -- dynamic tag with ref
    <Tag ref={ref} className={`reveal ${className}`} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </Tag>
  );
}
