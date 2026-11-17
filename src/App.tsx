/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { CLINIC_CONTENT, type Language, type ServiceItem } from './data/clinicContent';
import { useMotionPreferences } from './hooks/useMotionPreferences';
import { Navbar } from './components/Navbar';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { BookingModal } from './components/BookingModal';

export default function App() {
  const [language, setLanguage] = useState<Language>('ar');
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const motionPrefs = useMotionPreferences();

  const copy = CLINIC_CONTENT[language];

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.title =
      language === 'ar'
        ? 'عيادة د. جهينة جبابلي للتجميل والجلدية | عند جهينة… سر التجميل'
        : 'Dr. Juhainah Jababili Aesthetic & Dermatology Clinic | With Juhainah… The Secret of Beauty';
  }, [language]);

  const selectedService =
    selectedServiceId !== null
      ? copy.services.items.find((item) => item.id === selectedServiceId) ?? null
      : null;

  const handleToggleLanguage = () => {
    setLanguage((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  const handleSelectService = (service: ServiceItem) => {
    setSelectedServiceId(service.id);
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({
        behavior: motionPrefs.prefersReducedMotion ? 'auto' : 'smooth',
      });
    }
  };

  const handleBookService = (service: ServiceItem) => {
    setSelectedServiceId(service.id);
    setBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#EEF7F1] text-[#254736]">
      <ScrollProgressBar
        language={language}
        prefersReducedMotion={motionPrefs.prefersReducedMotion}
      />
      <Navbar
        language={language}
        copy={copy}
        onToggleLanguage={handleToggleLanguage}
        onOpenBooking={() => setBookingModalOpen(true)}
      />

      <main>
        <HeroSection
          language={language}
          copy={copy.hero}
          motionPrefs={motionPrefs}
          onOpenBooking={() => setBookingModalOpen(true)}
        />

        <AboutSection
          copy={copy.about}
          motionPrefs={motionPrefs}
        />

        <ServicesSection
          language={language}
          copy={copy.services}
          selectedService={selectedService}
          onSelectService={handleSelectService}
          onBookService={handleBookService}
          motionPrefs={motionPrefs}
        />

        <TestimonialsSection
          language={language}
          copy={copy.testimonials}
          motionPrefs={motionPrefs}
        />
      </main>

      <ContactSection
        language={language}
        copy={copy.contact}
        footerCopy={copy.footer}
        services={copy.services.items}
        selectedService={selectedService}
        onChangeServiceId={setSelectedServiceId}
        motionPrefs={motionPrefs}
      />

      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        language={language}
        copy={copy.contact}
        services={copy.services.items}
        selectedService={selectedService}
        onChangeServiceId={setSelectedServiceId}
      />
    </div>
  );
}
