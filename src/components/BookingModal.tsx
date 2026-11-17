import { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X } from 'lucide-react';
import type { ClinicCopy, Language, ServiceItem } from '../data/clinicContent';
import { BookingForm } from './BookingForm';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  copy: ClinicCopy['contact'];
  services: ServiceItem[];
  selectedService: ServiceItem | null;
  onChangeServiceId: (serviceId: string | null) => void;
}

export function BookingModal({
  isOpen,
  onClose,
  language,
  copy,
  services,
  selectedService,
  onChangeServiceId,
}: BookingModalProps) {
  const isRtl = language === 'ar';

  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          dir={isRtl ? 'rtl' : 'ltr'}
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-modal-title"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#4B366D]/45 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-sm border border-[#C7B6DF] bg-gradient-to-br from-[#FAF7FD] via-[#F3EDF9] to-[#E9DFF5] p-6 shadow-2xl md:p-8"
          >
            <div className="mb-5 flex items-start justify-between gap-4 border-b border-[#C7B6DF] pb-4">
              <div>
                <h2
                  id="booking-modal-title"
                  className="font-clinic-display text-2xl font-bold text-[#4B366D]"
                >
                  {copy.modalTitle}
                </h2>
                <p className="mt-1 text-xs leading-relaxed text-[#664E88] md:text-sm">
                  {copy.modalSubtitle}
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label={isRtl ? 'إغلاق نافذة الحجز' : 'Close booking dialog'}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-[#C7B6DF] bg-[#FAF7FD] text-[#664E88] transition-colors hover:border-[#7C58B8] hover:text-[#4B366D] cursor-pointer"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <BookingForm
              language={language}
              copy={copy}
              services={services}
              selectedService={selectedService}
              onChangeServiceId={onChangeServiceId}
              idPrefix="modal-booking"
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
