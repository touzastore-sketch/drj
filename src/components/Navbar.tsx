import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Globe, Instagram, MapPin, Menu, MessageCircle, Phone, X } from 'lucide-react';
import {
  CLINIC_LINKS,
  type ClinicCopy,
  type Language,
} from '../data/clinicContent';
import { GoldShimmerButton } from './GoldShimmerButton';

interface NavbarProps {
  language: Language;
  copy: ClinicCopy;
  onToggleLanguage: () => void;
  onOpenBooking: () => void;
}

export function Navbar({
  language,
  copy,
  onToggleLanguage,
  onOpenBooking,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isRtl = language === 'ar';

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 36);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, [mobileOpen]);

  const handleNavClick = (sectionId: string) => {
    setMobileOpen(false);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'home', label: copy.nav.home },
    { id: 'about', label: copy.nav.about },
    { id: 'services', label: copy.nav.services },
    { id: 'testimonials', label: copy.nav.testimonials },
    { id: 'contact', label: copy.nav.contact },
  ];

  const slideHiddenX = isRtl ? '100%' : '-100%';

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled
            ? 'border-b border-[#BDDAC6]/70 bg-[#EEF7F1]/90 backdrop-blur-md'
            : 'border-b border-transparent bg-gradient-to-b from-[#EEF7F1]/90 via-[#EEF7F1]/65 to-transparent backdrop-blur-[2px]'
        }`}
      >
        <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-5 py-3 md:gap-8 md:px-10 md:py-4">
          {/* Zone 1: Single-line brand wordmark */}
          <a
            href="#home"
            className="font-clinic-display text-xl font-bold tracking-tight text-[#254736] transition-colors hover:text-[#45805E] whitespace-nowrap shrink-0 md:text-2xl"
          >
            {copy.brand}
          </a>

          {/* Zone 2: Desktop single-line nav links */}
          <nav
            aria-label={isRtl ? 'التنقل الرئيسي' : 'Primary navigation'}
            className="hidden items-center gap-7 text-sm font-medium text-[#254736]/85 md:flex"
          >
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="relative py-1 transition-colors hover:text-[#45805E] whitespace-nowrap shrink-0"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Language switch + primary action + mobile drawer trigger */}
          <div className="flex items-center gap-2.5 shrink-0 md:gap-3">
            <button
              type="button"
              onClick={onToggleLanguage}
              aria-label={copy.nav.langAria}
              className="inline-flex min-h-[40px] items-center justify-center rounded-sm border border-[#A4CCB2] bg-[#F7FCF9]/80 px-3 py-1.5 text-xs font-medium tracking-wider text-[#466B57] transition-colors hover:border-[#45805E] hover:text-[#254736] whitespace-nowrap shrink-0 cursor-pointer"
            >
              {copy.nav.langToggle}
            </button>

            <button
              type="button"
              onClick={onOpenBooking}
              className="hidden min-h-[40px] items-center justify-center rounded-sm bg-[#45805E] px-4 py-2 text-xs font-semibold text-[#F7FCF9] transition-colors hover:bg-[#376B4D] whitespace-nowrap shrink-0 cursor-pointer md:inline-flex"
            >
              {copy.nav.bookCta}
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-sidebar"
              aria-label={isRtl ? 'فتح القائمة الجانبية' : 'Open navigation menu'}
              className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-[#A4CCB2] bg-[#F7FCF9]/85 text-[#254736] transition-colors hover:border-[#45805E] hover:text-[#45805E] md:hidden cursor-pointer"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Over Sidebar Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <div
            dir={isRtl ? 'rtl' : 'ltr'}
            className="fixed inset-0 z-[70] md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label={isRtl ? 'القائمة الجانبية' : 'Mobile menu'}
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-[#254736]/40 backdrop-blur-sm"
            />

            {/* Sidebar Panel */}
            <motion.aside
              id="mobile-sidebar"
              initial={{ x: slideHiddenX }}
              animate={{ x: 0 }}
              exit={{ x: slideHiddenX }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className={`fixed inset-y-0 ${
                isRtl ? 'right-0 border-l' : 'left-0 border-r'
              } flex w-[84vw] max-w-[330px] flex-col justify-between border-[#BDDAC6] bg-[#EEF7F1] p-6 shadow-2xl`}
            >
              <div>
                <div className="flex items-center justify-between border-b border-[#BDDAC6]/70 pb-4">
                  <span className="font-clinic-display text-xl font-bold text-[#254736]">
                    {copy.brand}
                  </span>
                  <button
                    type="button"
                    onClick={() => setMobileOpen(false)}
                    aria-label={isRtl ? 'إغلاق القائمة' : 'Close menu'}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-[#BDDAC6] bg-[#F7FCF9] text-[#466B57] transition-colors hover:border-[#45805E] hover:text-[#254736] cursor-pointer"
                  >
                    <X className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>

                <nav
                  aria-label={isRtl ? 'روابط الأقسام' : 'Section links'}
                  className="mt-6 flex flex-col divide-y divide-[#BDDAC6]/50"
                >
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleNavClick(item.id)}
                      className="flex min-h-[48px] w-full items-center justify-between py-3 text-start text-base font-medium text-[#254736] transition-colors hover:text-[#45805E] cursor-pointer"
                    >
                      <span>{item.label}</span>
                      <span aria-hidden="true" className="text-xs text-[#45805E]">
                        {isRtl ? '←' : '→'}
                      </span>
                    </button>
                  ))}
                </nav>

                <div className="mt-7 space-y-3">
                  <GoldShimmerButton
                    as="button"
                    variant="primary"
                    onClick={() => {
                      setMobileOpen(false);
                      onOpenBooking();
                    }}
                    className="w-full"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    <span>{isRtl ? 'احجزي عبر واتساب' : 'Book via WhatsApp'}</span>
                  </GoldShimmerButton>

                  <button
                    type="button"
                    onClick={() => handleNavClick('contact')}
                    className="inline-flex min-h-[44px] w-full items-center justify-center rounded-sm border border-[#A4CCB2] bg-[#E2F1E7] px-5 py-3 text-sm font-medium text-[#254736] transition-colors hover:border-[#45805E] hover:bg-[#D5EBDC] cursor-pointer"
                  >
                    {copy.nav.contact}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onToggleLanguage();
                      setMobileOpen(false);
                    }}
                    className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-sm border border-[#BDDAC6] bg-[#F7FCF9] px-4 py-2.5 text-xs font-medium text-[#466B57] transition-colors hover:border-[#45805E] hover:text-[#254736] cursor-pointer"
                  >
                    <Globe className="h-4 w-4" aria-hidden="true" />
                    <span>{isRtl ? 'Switch to English' : 'التبديل إلى العربية'}</span>
                  </button>
                </div>
              </div>

              <div className="border-t border-[#BDDAC6]/70 pt-5">
                <p className="mb-3 text-xs text-[#466B57]">
                  {isRtl ? 'تواصلي معنا مباشرة' : 'Connect directly'}
                </p>

                <div className="flex items-center gap-2.5">
                  <a
                    href={CLINIC_LINKS.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-[#BDDAC6] bg-[#F7FCF9] text-[#45805E] transition-colors hover:border-[#45805E] hover:bg-[#E2F1E7]"
                  >
                    <Instagram className="h-[18px] w-[18px]" aria-hidden="true" />
                  </a>

                  <a
                    href={CLINIC_LINKS.tiktokUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="TikTok"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-[#BDDAC6] bg-[#F7FCF9] text-[#45805E] transition-colors hover:border-[#45805E] hover:bg-[#E2F1E7]"
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
                    href={CLINIC_LINKS.phoneHref}
                    aria-label={isRtl ? 'الاتصال بالمنسقة' : 'Call coordinator'}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-[#BDDAC6] bg-[#F7FCF9] text-[#45805E] transition-colors hover:border-[#45805E] hover:bg-[#E2F1E7]"
                  >
                    <Phone className="h-[18px] w-[18px]" aria-hidden="true" />
                  </a>

                  <a
                    href={CLINIC_LINKS.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={isRtl ? 'موقع العيادة' : 'Clinic location'}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-[#BDDAC6] bg-[#F7FCF9] text-[#45805E] transition-colors hover:border-[#45805E] hover:bg-[#E2F1E7]"
                  >
                    <MapPin className="h-[18px] w-[18px]" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
