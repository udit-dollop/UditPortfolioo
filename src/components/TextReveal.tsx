import { motion, useReducedMotion } from 'framer-motion';

interface TextRevealProps {
  text?: string;
  lines?: React.ReactNode[];
  className?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
}

export function TextReveal({ text, lines, className = '', tag: Tag = 'h2' }: TextRevealProps) {
  const reducedMotion = useReducedMotion();
  const textLines = lines || (text ? text.split('\n') : []);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.07,
      },
    },
  };

  const lineVariants = {
    hidden: { y: '100%', opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  if (reducedMotion) {
    return (
      <Tag className={className}>
        {textLines.map((line, idx) => (
          <span key={idx} className="mr-1.5 inline-block">{line}</span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag className={className}>
      <motion.span
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-5%' }}
        className="block"
      >
        {textLines.map((line, idx) => (
          <span key={idx} className="block overflow-hidden py-0.5">
            <motion.span
              variants={lineVariants}
              className="block origin-top"
            >
              {line}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
