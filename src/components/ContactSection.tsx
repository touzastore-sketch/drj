import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Check,
  Clock,
  Copy,
  ExternalLink,
  Instagram,
  MapPin,
  Phone,
} from 'lucide-react';
import {
  CLINIC_LINKS,
  type ClinicCopy,
  type Language,
  type ServiceItem,
} from '../data/clinicContent';
import type { MotionPreferences } from '../hooks/useMotionPreferences';
import { BookingForm } from './BookingForm';

interface ContactSectionProps {
  language: Language;
  copy: ClinicCopy['contact'];
  footerCopy: ClinicCopy['footer'];
  services: ServiceItem[];
  selectedService: ServiceItem | null;
  onChangeServiceId: (serviceId: string | null) => void;
  motionPrefs: MotionPreferences;
}

export function ContactSection({
  language,
  copy,
  footerCopy,
  services,
  selectedService,
  onChangeServiceId,
  motionPrefs,
}: ContactSectionProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyPhone = async () => {
    try {
      await navigator.clipboard.writeText(copy.phoneValue);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      // Clipboard API fallback ignored safely
    }
  };

  return (
    <footer
      id="contact"
      className="relative border-t border-[#96805C]/25 bg-[#352A1A] pt-20 pb-10 md:pt-28 md:pb-12"
    >
      <div className="mx-auto max-w-[1200px] px-5 md:px-10">
        <motion.div
          initial={motionPrefs.prefersReducedMotion ? false : { opacity: 0, y: motionPrefs.lightMotion ? 16 : 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: motionPrefs.lightMotion ? 0.45 : 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-sm border border-[#96805C]/30 bg-gradient-to-br from-[#5F492E]/50 via-[#352A1A]/90 to-[#352A1A] p-6 md:p-12"
        >
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start lg:gap-12">
            {/* Left/Start Column: Validated WhatsApp Patient Booking Form + Social Links */}
            <div className="lg:col-span-7">
              <p className="mb-3 text-xs font-medium tracking-[0.14em] text-[#C0A184] md:text-sm">
                {copy.eyebrow}
              </p>

              <h2 className="font-clinic-display text-[clamp(1.85rem,3vw,2.75rem)] leading-[1.25] font-bold text-[#F4EDE6] [text-wrap:balance]">
                {copy.heading}
              </h2>

              <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-[#F4EDE6]/80 md:text-base">
                {copy.subtitle}
              </p>

              <div className="mt-7">
                <BookingForm
                  language={language}
                  copy={copy}
                  services={services}
                  selectedService={selectedService}
                  onChangeServiceId={onChangeServiceId}
                  idPrefix="footer-booking"
                />

                <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-[#96805C]/20 pt-5">
                  <a
                    href={CLINIC_LINKS.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-sm border border-[#96805C]/45 bg-[#352A1A]/60 px-4 py-2.5 text-sm text-[#F4EDE6] transition-colors hover:border-[#C0A184] hover:text-[#C0A184] whitespace-nowrap shrink-0"
                  >
                    <Instagram className="h-4 w-4 text-[#C0A184]" aria-hidden="true" />
                    <span>{copy.instagramLabel}</span>
                    <span className="text-xs text-[#C0A184]" dir="ltr">
                      {copy.instagramHandle}
                    </span>
                  </a>

                  <a
                    href={CLINIC_LINKS.tiktokUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-sm border border-[#96805C]/45 bg-[#352A1A]/60 px-4 py-2.5 text-sm text-[#F4EDE6] transition-colors hover:border-[#C0A184] hover:text-[#C0A184] whitespace-nowrap shrink-0"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 text-[#C0A184]"
                      aria-hidden="true"
                    >
                      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                    </svg>
                    <span>{copy.tiktokLabel}</span>
                    <span className="text-xs text-[#C0A184]" dir="ltr">
                      {copy.tiktokHandle}
                    </span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right/End Column: Structured Clinic Details + Embedded Map */}
            <div className="border-t border-[#96805C]/25 pt-6 lg:col-span-5 lg:border-t-0 lg:border-s lg:pt-0 lg:ps-10">
              <div className="divide-y divide-[#96805C]/25">
                <div className="flex items-start gap-4 pb-5">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#C0A184]" aria-hidden="true" />
                  <div>
                    <p className="text-xs font-medium tracking-wider text-[#C0A184]">
                      {copy.addressLabel}
                    </p>
                    <p className="mt-1.5 text-base leading-relaxed text-[#F4EDE6]">
                      {copy.addressValue}
                    </p>
                    <a
                      href={CLINIC_LINKS.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-[#C0A184] underline decoration-[#96805C]/60 underline-offset-4 transition-colors hover:text-[#F4EDE6]"
                    >
                      <span>{copy.openMapsLabel}</span>
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  </div>
                </div>

                <div className="flex items-start justify-between gap-4 py-5">
                  <div className="flex items-start gap-4">
                    <Phone className="mt-0.5 h-5 w-5 shrink-0 text-[#C0A184]" aria-hidden="true" />
                    <div>
                      <p className="text-xs font-medium tracking-wider text-[#C0A184]">
                        {copy.phoneLabel}
                      </p>
                      <a
                        href={CLINIC_LINKS.phoneHref}
                        dir="ltr"
                        className="mt-1.5 inline-block text-lg font-medium text-[#F4EDE6] tabular-nums transition-colors hover:text-[#C0A184]"
                      >
                        {copy.phoneValue}
                      </a>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyPhone}
                    className="inline-flex min-h-[40px] items-center gap-1.5 rounded-sm border border-[#96805C]/35 px-3 py-1.5 text-xs text-[#C0A184] transition-colors hover:border-[#C0A184] hover:text-[#F4EDE6] whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>{copy.copiedPhone}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>{copy.copyPhone}</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-start gap-4 py-5">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-[#C0A184]" aria-hidden="true" />
                  <div>
                    <p className="text-xs font-medium tracking-wider text-[#C0A184]">
                      {copy.hoursLabel}
                    </p>
                    <p className="mt-1.5 text-base leading-relaxed text-[#F4EDE6]">
                      {copy.hoursValue}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-3 overflow-hidden rounded-sm border border-[#96805C]/35 bg-[#352A1A]">
                <div className="relative h-48 w-full">
                  <iframe
                    title={copy.mapTitle}
                    src={CLINIC_LINKS.mapsEmbedUrl}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="h-full w-full border-0 brightness-95 contrast-105 sepia-[0.22]"
                  />
                </div>
                <a
                  href={CLINIC_LINKS.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[40px] items-center justify-between border-t border-[#96805C]/25 bg-[#5F492E]/40 px-4 py-2 text-xs font-medium text-[#C0A184] transition-colors hover:bg-[#5F492E]/70 hover:text-[#F4EDE6]"
                >
                  <span>{copy.openMapsLabel}</span>
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        <div
          dir={language === 'ar' ? 'rtl' : 'ltr'}
          className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-[#96805C]/20 pt-6 text-xs text-[#C0A184]/80 sm:flex-row"
        >
          <p dir="ltr" className="text-[#C0A184]/90">
            All Copyright{' '}
            <a
              href="https://instagram.com/solimanmedia"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[#F4EDE6] underline decoration-[#96805C]/60 underline-offset-4 transition-colors hover:text-[#C0A184]"
            >
              SolimanMedia
            </a>{' '}
            2026
          </p>
          <p>{footerCopy.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
