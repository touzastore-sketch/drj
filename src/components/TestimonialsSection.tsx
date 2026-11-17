import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import type { ClinicCopy, Language } from '../data/clinicContent';
import type { MotionPreferences } from '../hooks/useMotionPreferences';

interface TestimonialsSectionProps {
  language: Language;
  copy: ClinicCopy['testimonials'];
  motionPrefs: MotionPreferences;
}

export function TestimonialsSection({
  language,
  copy,
  motionPrefs,
}: TestimonialsSectionProps) {
  const [pageIndex, setPageIndex] = useState(0);
  const isRtl = language === 'ar';
  const itemsPerPage = motionPrefs.isMobile ? 1 : 2;
  const totalPages = Math.max(1, Math.ceil(copy.items.length / itemsPerPage));

  useEffect(() => {
    setPageIndex((prev) => (prev >= totalPages ? 0 : prev));
  }, [totalPages]);

  const start = pageIndex * itemsPerPage;
  const visibleItems = copy.items.slice(start, start + itemsPerPage);

  const handlePrev = () => {
    setPageIndex((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const handleNext = () => {
    setPageIndex((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  };

  const PrevIcon = isRtl ? ChevronRight : ChevronLeft;
  const NextIcon = isRtl ? ChevronLeft : ChevronRight;

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden border-t border-[#C7B6DF]/70 bg-[#F3EDF9] py-20 md:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(199,182,223,0.32)_0%,transparent_70%)]"
      />

      <div className="relative z-10 mx-auto max-w-[1200px] px-5 md:px-10">
        <div className="mb-10 flex flex-col justify-between gap-6 md:mb-12 md:flex-row md:items-end">
          <motion.div
            initial={motionPrefs.prefersReducedMotion ? false : { opacity: 0, y: motionPrefs.lightMotion ? 14 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: motionPrefs.lightMotion ? 0.45 : 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <p className="mb-3 text-xs font-medium tracking-[0.14em] text-[#7A57AB] md:text-sm">
              {copy.eyebrow}
            </p>
            <h2 className="font-clinic-display text-[clamp(1.85rem,3vw,2.75rem)] leading-[1.25] font-bold text-[#4B366D] [text-wrap:balance]">
              {copy.heading}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[#664E88] md:text-base">
              {copy.subtitle}
            </p>
          </motion.div>

          {/* Carousel Controls */}
          <div className="flex items-center gap-3 self-start md:self-auto">
            <button
              type="button"
              onClick={handlePrev}
              aria-label={copy.prevLabel}
              className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-[#C7B6DF] bg-[#FAF7FD] text-[#7C58B8] transition-colors hover:border-[#7C58B8] hover:bg-[#E9DFF5] hover:text-[#4B366D] cursor-pointer"
            >
              <PrevIcon className="h-5 w-5" aria-hidden="true" />
            </button>

            <span className="min-w-[44px] text-center font-mono text-xs font-medium text-[#664E88] tabular-nums">
              {String(pageIndex + 1).padStart(2, '0')} / {String(totalPages).padStart(2, '0')}
            </span>

            <button
              type="button"
              onClick={handleNext}
              aria-label={copy.nextLabel}
              className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-[#C7B6DF] bg-[#FAF7FD] text-[#7C58B8] transition-colors hover:border-[#7C58B8] hover:bg-[#E9DFF5] hover:text-[#4B366D] cursor-pointer"
            >
              <NextIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Carousel Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${language}-${itemsPerPage}-${pageIndex}`}
            initial={motionPrefs.prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={motionPrefs.prefersReducedMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: motionPrefs.lightMotion ? 0.25 : 0.36, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 gap-6 md:grid-cols-2"
          >
            {visibleItems.map((item) => (
              <article
                key={item.id}
                className="flex h-full flex-col justify-between rounded-sm border border-[#C7B6DF] bg-[#FAF7FD]/90 p-7 shadow-sm md:p-8"
              >
                <div>
                  <Quote
                    className="mb-5 h-6 w-6 text-[#9F7ED6]"
                    aria-hidden="true"
                  />
                  <blockquote className="text-base leading-[1.85] text-[#4B366D]/90 md:text-[17px]">
                    “{item.quote}”
                  </blockquote>
                </div>

                <footer className="mt-7 border-t border-[#C7B6DF]/70 pt-5">
                  <p className="font-clinic-display text-xl font-bold text-[#4B366D]">
                    {item.patientName}
                  </p>
                  <div className="mt-1 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-[#7A57AB] md:text-sm">
                    <span>{item.treatment}</span>
                    <span aria-hidden="true" className="text-[#9F7ED6]">
                      ·
                    </span>
                    <span className="text-[#664E88]">{item.visitContext}</span>
                  </div>
                </footer>
              </article>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Subtle Progress Bars */}
        <div
          className="mt-8 flex items-center justify-center gap-2"
          role="tablist"
          aria-label={copy.eyebrow}
        >
          {Array.from({ length: totalPages }).map((_, idx) => {
            const isActive = idx === pageIndex;
            return (
              <button
                key={idx}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`${copy.eyebrow} ${idx + 1}`}
                onClick={() => setPageIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'w-8 bg-[#7C58B8]'
                    : 'w-2.5 bg-[#C7B6DF] hover:bg-[#9F7ED6]'
                }`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
