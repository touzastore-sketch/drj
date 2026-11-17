import { motion, useScroll, useSpring } from 'motion/react';
import type { Language } from '../data/clinicContent';

interface ScrollProgressBarProps {
  language: Language;
  prefersReducedMotion: boolean;
}

export function ScrollProgressBar({
  language,
  prefersReducedMotion,
}: ScrollProgressBarProps) {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 32,
    restDelta: 0.001,
  });

  const scaleX = prefersReducedMotion ? scrollYProgress : smoothProgress;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2.5px] bg-[#BDDAC6]/40"
    >
      <motion.div
        style={{ scaleX }}
        className={`h-full w-full bg-gradient-to-r from-[#45805E] via-[#7BB895] to-[#45805E] shadow-[0_0_8px_rgba(69,128,94,0.45)] will-change-transform ${
          language === 'ar' ? 'origin-right' : 'origin-left'
        }`}
      />
    </div>
  );
}
