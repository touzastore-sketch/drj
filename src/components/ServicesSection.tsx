import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import {
  MEDIA_ASSETS,
  type ClinicCopy,
  type Language,
  type ServiceCategoryId,
  type ServiceItem,
} from '../data/clinicContent';
import type { MotionPreferences } from '../hooks/useMotionPreferences';
import { TiltServiceCard } from './TiltServiceCard';

interface ServicesSectionProps {
  language: Language;
  copy: ClinicCopy['services'];
  selectedService: ServiceItem | null;
  onSelectService: (service: ServiceItem) => void;
  onBookService: (service: ServiceItem) => void;
  motionPrefs: MotionPreferences;
}

export function ServicesSection({
  language,
  copy,
  selectedService,
  onSelectService,
  onBookService,
  motionPrefs,
}: ServicesSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [activeCategory, setActiveCategory] = useState<ServiceCategoryId>('all');

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bgY = useTransform(
    scrollYProgress,
    [0, 1],
    motionPrefs.prefersReducedMotion
      ? ['0%', '0%']
      : motionPrefs.lightMotion
        ? ['-2%', '2%']
        : ['-8%', '8%'],
  );

  const showVideo = !motionPrefs.preferStaticVideoFallback;

  const visibleServices =
    activeCategory === 'all'
      ? copy.items
      : copy.items.filter((item) => item.category === activeCategory);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative overflow-hidden border-t border-[#C7B6DF]/70 bg-[#EDE3F7] py-20 md:py-28"
    >
      {/* Background cosmetic tools & serums video with soft light-lavender atmospheric veil */}
      <motion.div
        style={{ y: bgY }}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 scale-[1.12] will-change-transform"
      >
        <div className="h-full w-full bg-[radial-gradient(ellipse_at_top,#F3EDF9_0%,#E9DFF5_65%,#DDD0F0_100%)]" />

        {showVideo && (
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            onCanPlay={() => setVideoReady(true)}
            onPlaying={() => setVideoReady(true)}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              videoReady ? 'opacity-45' : 'opacity-0'
            }`}
          >
            <source src={MEDIA_ASSETS.servicesVideo} type="video/mp4" />
          </video>
        )}

        {/* Measured light-lavender veil for cohesive palette & >=4.5:1 text legibility */}
        <div className="absolute inset-0 bg-[#F3EDF9]/72 backdrop-blur-[1px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#F3EDF9] via-[#EDE3F7]/45 to-[#F3EDF9]" />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-[1200px] px-5 md:px-10">
        <motion.div
          initial={motionPrefs.prefersReducedMotion ? false : { opacity: 0, y: motionPrefs.lightMotion ? 14 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: motionPrefs.lightMotion ? 0.45 : 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 max-w-2xl md:mb-10"
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

        {/* Interactive Specialty Filter Tabs */}
        <div
          role="tablist"
          aria-label={copy.eyebrow}
          className="mb-9 flex flex-wrap items-center gap-2 border-b border-[#C7B6DF] pb-5"
        >
          {copy.categories.map((category) => {
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                role="tab"
                aria-selected={isActive}
                type="button"
                onClick={() => setActiveCategory(category.id)}
                className={`min-h-[40px] rounded-sm px-4 py-2 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer md:text-sm ${
                  isActive
                    ? 'bg-[#7C58B8] text-[#FAF7FD]'
                    : 'border border-[#C7B6DF] bg-[#FAF7FD]/85 text-[#664E88] hover:border-[#7C58B8] hover:text-[#4B366D]'
                }`}
              >
                {category.label}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {visibleServices.map((service, index) => (
            <TiltServiceCard
              key={service.id}
              service={service}
              language={language}
              isSelected={selectedService?.id === service.id}
              directWhatsappHint={copy.directWhatsappHint}
              selectForFormHint={copy.selectForFormHint}
              selectedLabel={copy.selectedLabel}
              onSelect={onSelectService}
              onBookService={onBookService}
              lightMotion={motionPrefs.lightMotion}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
