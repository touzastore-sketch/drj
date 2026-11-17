import { useState } from 'react';
import { motion } from 'motion/react';
import { Check, Sparkles } from 'lucide-react';
import { MEDIA_ASSETS, type ClinicCopy } from '../data/clinicContent';
import type { MotionPreferences } from '../hooks/useMotionPreferences';

interface AboutSectionProps {
  copy: ClinicCopy['about'];
  motionPrefs: MotionPreferences;
}

export function AboutSection({ copy, motionPrefs }: AboutSectionProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <section
      id="about"
      className="relative overflow-hidden border-t border-[#C7B6DF]/70 bg-[#F3EDF9] py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1200px] px-5 md:px-10">
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Portrait Frame */}
          <motion.div
            initial={motionPrefs.prefersReducedMotion ? false : { opacity: 0, y: motionPrefs.lightMotion ? 16 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: motionPrefs.lightMotion ? 0.5 : 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <div className="relative h-full min-h-[360px] overflow-hidden rounded-sm border border-[#C7B6DF] bg-[#E9DFF5] shadow-sm">
              {!imgError ? (
                <img
                  src={MEDIA_ASSETS.heroPoster}
                  alt={copy.portraitAlt}
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="h-full w-full object-cover object-[72%_18%] lg:h-full"
                />
              ) : (
                <div className="flex h-full min-h-[360px] flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#E9DFF5] to-[#D6C3F0] p-8 text-center">
                  <Sparkles className="h-8 w-8 text-[#7C58B8]" aria-hidden="true" />
                  <span className="font-clinic-display text-xl text-[#4B366D]">
                    {copy.signature}
                  </span>
                </div>
              )}

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#4B366D]/30 via-transparent to-transparent"
              />
            </div>
          </motion.div>

          {/* Editorial Bio & 5 Clinical Highlights */}
          <motion.div
            initial={motionPrefs.prefersReducedMotion ? false : { opacity: 0, y: motionPrefs.lightMotion ? 16 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: motionPrefs.lightMotion ? 0.5 : 0.75,
              delay: motionPrefs.lightMotion ? 0.05 : 0.12,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex flex-col justify-center lg:col-span-7"
          >
            <p className="mb-2 text-xs font-medium tracking-[0.14em] text-[#7A57AB] md:text-sm">
              {copy.eyebrow}
            </p>

            <h2 className="font-clinic-display text-[clamp(1.85rem,3vw,2.75rem)] leading-[1.25] font-bold text-[#4B366D] [text-wrap:balance]">
              {copy.heading}
            </h2>

            <p className="mt-3 text-sm font-medium text-[#7C58B8] md:text-base">
              {copy.specialty}
            </p>

            <p className="mt-5 text-base leading-relaxed font-medium text-[#4B366D] md:text-lg">
              {copy.lead}
            </p>

            <div className="mt-3 space-y-3 text-[15px] leading-[1.8] text-[#664E88] md:text-base">
              {copy.paragraphs.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-7 border-t border-[#C7B6DF] pt-6">
              <p className="mb-4 text-xs font-medium tracking-wider text-[#7A57AB]">
                {copy.highlightsTitle}
              </p>

              <ul className="divide-y divide-[#C7B6DF]/65">
                {copy.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 py-2.5 text-sm leading-relaxed text-[#4B366D] md:text-[15px]"
                  >
                    <Check
                      className="mt-1 h-4 w-4 shrink-0 text-[#7C58B8]"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <p className="font-clinic-display mt-6 text-2xl text-[#4B366D]">
                {copy.signature}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
