import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowDown, Instagram, MapPin, MessageCircle } from 'lucide-react';
import {
  buildWhatsAppBookingUrl,
  CLINIC_LINKS,
  MEDIA_ASSETS,
  type ClinicCopy,
  type Language,
} from '../data/clinicContent';
import type { MotionPreferences } from '../hooks/useMotionPreferences';
import { GoldenParticles } from './GoldenParticles';
import { ShimmerHeadline } from './ShimmerHeadline';
import { GoldShimmerButton } from './GoldShimmerButton';

interface HeroSectionProps {
  language: Language;
  copy: ClinicCopy['hero'];
  motionPrefs: MotionPreferences;
  onOpenBooking: () => void;
}

export function HeroSection({
  language,
  copy,
  motionPrefs,
  onOpenBooking,
}: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [posterError, setPosterError] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Background moves slower than text on scroll (lighter on mobile)
  const bgY = useTransform(
    scrollYProgress,
    [0, 1],
    motionPrefs.prefersReducedMotion
      ? ['0%', '0%']
      : motionPrefs.lightMotion
        ? ['0%', '5%']
        : ['0%', '14%'],
  );

  const textY = useTransform(
    scrollYProgress,
    [0, 1],
    motionPrefs.prefersReducedMotion
      ? ['0px', '0px']
      : motionPrefs.lightMotion
        ? ['0px', '-14px']
        : ['0px', '-48px'],
  );

  const textOpacity = useTransform(
    scrollYProgress,
    [0, 0.85],
    motionPrefs.prefersReducedMotion ? [1, 1] : [1, 0.35],
  );

  const isRtl = language === 'ar';
  const showVideo = !motionPrefs.preferStaticVideoFallback;

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-[100svh] w-full items-end overflow-hidden bg-[#352A1A] md:items-center"
    >
      {/* Parallax Media Layer: Static image underneath until video loads */}
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute inset-0 scale-[1.06] will-change-transform"
      >
        {!posterError ? (
          <img
            src={MEDIA_ASSETS.heroPoster}
            alt={copy.doctorAlt}
            referrerPolicy="no-referrer"
            onError={() => setPosterError(true)}
            className="h-full w-full object-cover object-[72%_18%] md:object-[68%_center]"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-[#5F492E] via-[#352A1A] to-[#261E12]" />
        )}

        {showVideo && (
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster={MEDIA_ASSETS.heroPoster}
            onCanPlay={() => setVideoReady(true)}
            onPlaying={() => setVideoReady(true)}
            className={`absolute inset-0 h-full w-full object-cover object-[72%_18%] transition-opacity duration-700 md:object-[68%_center] ${
              videoReady ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <source src={MEDIA_ASSETS.heroVideo} type="video/mp4" />
          </video>
        )}

        {/* Measured warm scrims: strong on physical left (behind text) & mobile bottom, clear on right (Dr. Johaina) */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#352A1A] via-[#352A1A]/65 to-[#352A1A]/20 md:hidden"
        />
        <div
          aria-hidden="true"
          className="hidden md:block absolute inset-0 bg-gradient-to-r from-[#352A1A]/92 via-[#352A1A]/62 via-45% to-transparent"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#352A1A] to-transparent"
        />
      </motion.div>

      {/* Physical Left-Anchored Content Grid so Dr. Johaina on the right always stays unobstructed */}
      <div
        dir="ltr"
        className="relative z-10 mx-auto w-full max-w-[1280px] px-5 pt-28 pb-14 md:px-10 md:py-24"
      >
        <div className="relative max-w-xl md:w-[54%] lg:w-[50%]">
          {/* Subtle floating golden dust particles behind the text area */}
          <GoldenParticles
            lightMotion={motionPrefs.lightMotion}
            prefersReducedMotion={motionPrefs.prefersReducedMotion}
          />

          <motion.div
            dir={isRtl ? 'rtl' : 'ltr'}
            style={{ y: textY, opacity: textOpacity }}
            className="relative z-10 text-start will-change-transform"
          >
            <motion.p
              initial={motionPrefs.prefersReducedMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="mb-4 text-xs font-medium tracking-[0.14em] text-[#C0A184] md:text-sm"
            >
              {copy.eyebrow}
            </motion.p>

            <ShimmerHeadline
              text={copy.headline}
              language={language}
              prefersReducedMotion={motionPrefs.prefersReducedMotion}
              lightMotion={motionPrefs.lightMotion}
            />

            <motion.p
              initial={motionPrefs.prefersReducedMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.75,
                delay: motionPrefs.lightMotion ? 0.45 : 0.75,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mt-5 max-w-lg text-base leading-relaxed text-[#F4EDE6]/90 md:mt-6 md:text-xl md:leading-[1.75]"
            >
              {copy.subheadline}
            </motion.p>

            <motion.div
              initial={motionPrefs.prefersReducedMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.75,
                delay: motionPrefs.lightMotion ? 0.6 : 0.95,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mt-8 flex flex-wrap items-center gap-5 md:mt-10"
            >
              <GoldShimmerButton as="button" onClick={onOpenBooking} variant="primary">
                {copy.cta}
              </GoldShimmerButton>

              <a
                href="#about"
                className="inline-flex min-h-[44px] items-center gap-2 text-sm text-[#C0A184] transition-colors hover:text-[#F4EDE6] whitespace-nowrap shrink-0"
              >
                <span>{copy.scrollHint}</span>
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </a>
            </motion.div>

            {/* Social Media Icons in the open hero space */}
            <motion.div
              initial={motionPrefs.prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: motionPrefs.lightMotion ? 0.72 : 1.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mt-8 flex items-center gap-3 border-t border-[#96805C]/30 pt-6"
            >
              <a
                href={CLINIC_LINKS.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={isRtl ? 'إنستجرام د. جهينة جبابلي' : 'Instagram — Dr. Juhainah Jababili'}
                title="@dr.juhainah"
                className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-[#96805C]/45 bg-[#352A1A]/55 text-[#C0A184] backdrop-blur-sm transition-colors duration-200 hover:border-[#C0A184] hover:bg-[#5F492E]/70 hover:text-[#F4EDE6]"
              >
                <Instagram className="h-[18px] w-[18px]" aria-hidden="true" />
              </a>

              <a
                href={CLINIC_LINKS.tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={isRtl ? 'تيك توك د. جهينة جبابلي' : 'TikTok — Dr. Juhainah Jababili'}
                title="@juhainahjababili"
                className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-[#96805C]/45 bg-[#352A1A]/55 text-[#C0A184] backdrop-blur-sm transition-colors duration-200 hover:border-[#C0A184] hover:bg-[#5F492E]/70 hover:text-[#F4EDE6]"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-[18px] w-[18px]"
                  aria-hidden="true"
                >
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
              </a>

              <a
                href={buildWhatsAppBookingUrl({ language })}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={isRtl ? 'واتساب الحجز والتنسيق' : 'WhatsApp Booking'}
                title="+966 57 056 0580"
                className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-[#96805C]/45 bg-[#352A1A]/55 text-[#C0A184] backdrop-blur-sm transition-colors duration-200 hover:border-[#C0A184] hover:bg-[#5F492E]/70 hover:text-[#F4EDE6]"
              >
                <MessageCircle className="h-[18px] w-[18px]" aria-hidden="true" />
              </a>

              <a
                href={CLINIC_LINKS.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={isRtl ? 'موقع العيادة على خرائط جوجل' : 'Clinic Location on Google Maps'}
                title={isRtl ? 'عيادة اللمسة الطبي — الرياض' : 'Touch Medical Clinic — Riyadh'}
                className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-[#96805C]/45 bg-[#352A1A]/55 text-[#C0A184] backdrop-blur-sm transition-colors duration-200 hover:border-[#C0A184] hover:bg-[#5F492E]/70 hover:text-[#F4EDE6]"
              >
                <MapPin className="h-[18px] w-[18px]" aria-hidden="true" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
