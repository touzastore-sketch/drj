import { useRef, useState, type MouseEvent } from 'react';
import { CheckCircle2, MessageCircle } from 'lucide-react';
import {
  buildWhatsAppBookingUrl,
  type ClinicCopy,
  type Language,
  type ServiceItem,
} from '../data/clinicContent';
import { GoldShimmerButton } from './GoldShimmerButton';

interface BookingFormProps {
  language: Language;
  copy: ClinicCopy['contact'];
  services: ServiceItem[];
  selectedService: ServiceItem | null;
  onChangeServiceId: (serviceId: string | null) => void;
  idPrefix?: string;
}

export function BookingForm({
  language,
  copy,
  services,
  selectedService,
  onChangeServiceId,
  idPrefix = 'booking',
}: BookingFormProps) {
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTimeIdx, setPreferredTimeIdx] = useState<number>(0);
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [submitted, setSubmitted] = useState(false);

  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const phoneInputRef = useRef<HTMLInputElement | null>(null);

  const preferredTime = copy.timeOptions[preferredTimeIdx] ?? copy.timeOptions[0];
  const serviceTitle = selectedService?.title ?? copy.servicePlaceholder;

  const todayIso = new Date().toISOString().split('T')[0];

  const whatsappHref = buildWhatsAppBookingUrl({
    language,
    serviceTitle,
    patientName,
    patientPhone,
    preferredDate,
    preferredTime,
    notes,
  });

  const validate = () => {
    const nextErrors: { name?: string; phone?: string } = {};
    if (patientName.trim().length < 2) {
      nextErrors.name = copy.nameRequiredError;
    }
    const digitsOnly = patientPhone.replace(/\D/g, '');
    if (digitsOnly.length < 8) {
      nextErrors.phone = copy.phoneRequiredError;
    }
    setErrors(nextErrors);

    if (nextErrors.name) {
      nameInputRef.current?.focus();
      return false;
    }
    if (nextErrors.phone) {
      phoneInputRef.current?.focus();
      return false;
    }
    return true;
  };

  const handleWhatsAppClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!validate()) {
      event.preventDefault();
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-sm border border-[#7C58B8]/60 bg-[#FAF7FD] p-5 text-start md:p-6">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#7C58B8]" aria-hidden="true" />
          <div>
            <h3 className="font-clinic-display text-xl font-bold text-[#4B366D]">
              {copy.confirmedTitle}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-[#664E88]">
              {copy.confirmedBody}
            </p>
          </div>
        </div>

        <dl className="mt-4 space-y-1.5 border-t border-[#C7B6DF] pt-4 text-xs text-[#4B366D] md:text-sm">
          <div className="flex flex-wrap gap-2">
            <dt className="font-medium text-[#7A57AB]">{copy.serviceLabel}:</dt>
            <dd className="font-semibold">{serviceTitle}</dd>
          </div>
          <div className="flex flex-wrap gap-2">
            <dt className="font-medium text-[#7A57AB]">{copy.nameLabel.replace(' *', '')}:</dt>
            <dd>{patientName}</dd>
          </div>
          <div className="flex flex-wrap gap-2">
            <dt className="font-medium text-[#7A57AB]">{copy.patientPhoneLabel.replace(' *', '')}:</dt>
            <dd dir="ltr" className="tabular-nums">
              {patientPhone}
            </dd>
          </div>
          {preferredDate && (
            <div className="flex flex-wrap gap-2">
              <dt className="font-medium text-[#7A57AB]">{copy.dateLabel}:</dt>
              <dd dir="ltr" className="tabular-nums">
                {preferredDate}
              </dd>
            </div>
          )}
          <div className="flex flex-wrap gap-2">
            <dt className="font-medium text-[#7A57AB]">{copy.timeLabel}:</dt>
            <dd>{preferredTime}</dd>
          </div>
        </dl>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <GoldShimmerButton
            as="a"
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            <span>{copy.reopenWhatsapp}</span>
          </GoldShimmerButton>

          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="inline-flex min-h-[44px] items-center justify-center rounded-sm border border-[#B49FD3] bg-[#F3EDF9] px-4 py-2.5 text-xs font-medium text-[#664E88] transition-colors hover:border-[#7C58B8] hover:text-[#4B366D] cursor-pointer"
          >
            {copy.editBooking}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor={`${idPrefix}-name`}
            className="mb-1.5 block text-xs font-medium text-[#664E88]"
          >
            {copy.nameLabel}
          </label>
          <input
            ref={nameInputRef}
            id={`${idPrefix}-name`}
            type="text"
            required
            value={patientName}
            onChange={(e) => {
              setPatientName(e.target.value);
              if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
            }}
            placeholder={copy.namePlaceholder}
            aria-invalid={Boolean(errors.name)}
            className={`min-h-[44px] w-full rounded-sm border bg-[#FAF7FD] px-3.5 py-2.5 text-sm text-[#4B366D] placeholder:text-[#664E88]/50 transition-colors focus:outline-none ${
              errors.name
                ? 'border-[#B43B5C] focus:border-[#B43B5C]'
                : 'border-[#C7B6DF] focus:border-[#7C58B8]'
            }`}
          />
          {errors.name && (
            <p className="mt-1 text-xs font-medium text-[#B43B5C]">{errors.name}</p>
          )}
        </div>

        <div>
          <label
            htmlFor={`${idPrefix}-phone`}
            className="mb-1.5 block text-xs font-medium text-[#664E88]"
          >
            {copy.patientPhoneLabel}
          </label>
          <input
            ref={phoneInputRef}
            id={`${idPrefix}-phone`}
            type="tel"
            dir="ltr"
            required
            value={patientPhone}
            onChange={(e) => {
              setPatientPhone(e.target.value);
              if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
            }}
            placeholder={copy.patientPhonePlaceholder}
            aria-invalid={Boolean(errors.phone)}
            className={`min-h-[44px] w-full rounded-sm border bg-[#FAF7FD] px-3.5 py-2.5 text-sm text-[#4B366D] placeholder:text-[#664E88]/50 transition-colors focus:outline-none ${
              errors.phone
                ? 'border-[#B43B5C] focus:border-[#B43B5C]'
                : 'border-[#C7B6DF] focus:border-[#7C58B8]'
            }`}
          />
          {errors.phone && (
            <p className="mt-1 text-xs font-medium text-[#B43B5C]">{errors.phone}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor={`${idPrefix}-service`}
            className="mb-1.5 block text-xs font-medium text-[#664E88]"
          >
            {copy.serviceLabel}
          </label>
          <select
            id={`${idPrefix}-service`}
            value={selectedService?.id ?? ''}
            onChange={(e) => onChangeServiceId(e.target.value ? e.target.value : null)}
            className="min-h-[44px] w-full rounded-sm border border-[#C7B6DF] bg-[#FAF7FD] px-3.5 py-2.5 text-sm text-[#4B366D] transition-colors focus:border-[#7C58B8] focus:outline-none"
          >
            <option value="">{copy.servicePlaceholder}</option>
            {services.map((item) => (
              <option key={item.id} value={item.id}>
                {item.number} · {item.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor={`${idPrefix}-date`}
            className="mb-1.5 block text-xs font-medium text-[#664E88]"
          >
            {copy.dateLabel}
          </label>
          <input
            id={`${idPrefix}-date`}
            type="date"
            dir="ltr"
            min={todayIso}
            value={preferredDate}
            onChange={(e) => setPreferredDate(e.target.value)}
            className="min-h-[44px] w-full rounded-sm border border-[#C7B6DF] bg-[#FAF7FD] px-3.5 py-2.5 text-sm text-[#4B366D] transition-colors focus:border-[#7C58B8] focus:outline-none [color-scheme:light]"
          />
        </div>
      </div>

      <div>
        <span className="mb-2 block text-xs font-medium text-[#664E88]">
          {copy.timeLabel}
        </span>
        <div className="flex flex-wrap gap-2">
          {copy.timeOptions.map((option, idx) => {
            const active = preferredTimeIdx === idx;
            return (
              <button
                key={option}
                type="button"
                onClick={() => setPreferredTimeIdx(idx)}
                className={`min-h-[40px] rounded-sm px-3.5 py-2 text-xs transition-colors cursor-pointer ${
                  active
                    ? 'border border-[#7C58B8] bg-[#7C58B8] text-[#FAF7FD] font-medium'
                    : 'border border-[#C7B6DF] bg-[#FAF7FD] text-[#664E88] hover:border-[#7C58B8] hover:text-[#4B366D]'
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label
          htmlFor={`${idPrefix}-notes`}
          className="mb-1.5 block text-xs font-medium text-[#664E88]"
        >
          {copy.notesLabel}
        </label>
        <input
          id={`${idPrefix}-notes`}
          type="text"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder={copy.notesPlaceholder}
          className="min-h-[44px] w-full rounded-sm border border-[#C7B6DF] bg-[#FAF7FD] px-3.5 py-2.5 text-sm text-[#4B366D] placeholder:text-[#664E88]/50 transition-colors focus:border-[#7C58B8] focus:outline-none"
        />
      </div>

      <div className="pt-1">
        <GoldShimmerButton
          as="a"
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          variant="primary"
          onClick={handleWhatsAppClick}
          className="w-full sm:w-auto"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          <span>{copy.whatsappCta}</span>
        </GoldShimmerButton>
      </div>
    </div>
  );
}
