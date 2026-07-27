import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

interface TiltSpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
}

export function TiltSpotlightCard({ children, className = '', maxTilt = 4.5 }: TiltSpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [isTouch, setIsTouch] = useState(true);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotlightOpacity = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const rotateXSpring = useSpring(rotateX, springConfig);
  const rotateYSpring = useSpring(rotateY, springConfig);
  const spotlightOpacitySpring = useSpring(spotlightOpacity, springConfig);

  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current || reducedMotion || isTouch) return;

    const el = cardRef.current;
    const rect = el.getBoundingClientRect();

    const localX = e.clientX - rect.left;
    const localY = e.clientY - rect.top;

    mouseX.set(localX);
    mouseY.set(localY);
    spotlightOpacity.set(1);

    const normalizedX = (localX / rect.width) - 0.5;
    const normalizedY = (localY / rect.height) - 0.5;

    rotateX.set(-normalizedY * maxTilt);
    rotateY.set(normalizedX * maxTilt);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    spotlightOpacity.set(0);
  };

  // Convert Motion Values to CSS Variables for background style hook
  useEffect(() => {
    if (reducedMotion || isTouch) return;

    const unsubX = mouseX.on('change', (latest) => {
      cardRef.current?.style.setProperty('--mouse-x', `${latest}px`);
    });
    const unsubY = mouseY.on('change', (latest) => {
      cardRef.current?.style.setProperty('--mouse-y', `${latest}px`);
    });
    return () => {
      unsubX();
      unsubY();
    };
  }, [mouseX, mouseY, reducedMotion, isTouch]);

  const spotlightStyle = {
    background: `radial-gradient(160px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(34, 197, 94, 0.05) 0%, transparent 100%)`,
    opacity: spotlightOpacitySpring,
  };

  if (reducedMotion || isTouch) {
    return (
      <div className={`card-premium relative ${className}`}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: rotateXSpring,
        rotateY: rotateYSpring,
        transformStyle: 'preserve-3d',
      }}
      className={`card-premium relative overflow-hidden ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 z-10 mix-blend-screen dark:mix-blend-normal"
        style={spotlightStyle}
      />
      <div className="relative z-20 h-full w-full pointer-events-auto" style={{ transform: 'translateZ(8px)' }}>
        {children}
      </div>
    </motion.div>
  );
}
