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
      className="relative overflow-hidden border-t border-[#BDDAC6]/70 bg-[#EEF7F1] py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1200px] px-5 md:px-10">
        <div className="grid grid-cols-1 items-stretch gap-10 md:grid-cols-12 md:gap-10 lg:gap-14">
          {/* Portrait Frame */}
          <motion.div
            initial={motionPrefs.prefersReducedMotion ? false : { opacity: 0, y: motionPrefs.lightMotion ? 16 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: motionPrefs.lightMotion ? 0.5 : 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-5"
          >
            <div className="relative h-full min-h-[380px] overflow-hidden rounded-sm border border-[#BDDAC6] bg-[radial-gradient(circle_at_50%_26%,#F7FCF9_0%,#E2F1E7_58%,#CEE5D6_100%)] shadow-sm md:min-h-full">
              {/* Soft botanical mint studio glow behind transparent cutout */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute top-10 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-[#94CBA9]/25 blur-3xl"
              />

              {!imgError ? (
                <img
                  src={MEDIA_ASSETS.aboutPortrait}
                  alt={copy.portraitAlt}
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="relative z-10 h-full w-full object-cover object-[71%_20%] md:h-full"
                />
              ) : (
                <div className="relative z-10 flex h-full min-h-[380px] flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#E2F1E7] to-[#CFE6D7] p-8 text-center">
                  <Sparkles className="h-8 w-8 text-[#45805E]" aria-hidden="true" />
                  <span className="font-clinic-display text-xl text-[#254736]">
                    {copy.signature}
                  </span>
                </div>
              )}

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-[#CEE5D6]/45 via-transparent to-transparent"
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
            className="flex flex-col justify-center md:col-span-7"
          >
            <p className="mb-2 text-xs font-medium tracking-[0.14em] text-[#4B7A60] md:text-sm">
              {copy.eyebrow}
            </p>

            <h2 className="font-clinic-display text-[clamp(1.85rem,3vw,2.75rem)] leading-[1.25] font-bold text-[#254736] [text-wrap:balance]">
              {copy.heading}
            </h2>

            <p className="mt-3 text-sm font-medium text-[#45805E] md:text-base">
              {copy.specialty}
            </p>

            <p className="mt-5 text-base leading-relaxed font-medium text-[#254736] md:text-lg">
              {copy.lead}
            </p>

            <div className="mt-3 space-y-3 text-[15px] leading-[1.8] text-[#466B57] md:text-base">
              {copy.paragraphs.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-7 border-t border-[#BDDAC6] pt-6">
              <p className="mb-4 text-xs font-medium tracking-wider text-[#4B7A60]">
                {copy.highlightsTitle}
              </p>

              <ul className="divide-y divide-[#BDDAC6]/65">
                {copy.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 py-2.5 text-sm leading-relaxed text-[#254736] md:text-[15px]"
                  >
                    <Check
                      className="mt-1 h-4 w-4 shrink-0 text-[#45805E]"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <p className="font-clinic-display mt-6 text-2xl text-[#254736]">
                {copy.signature}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
