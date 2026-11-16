import { useRef, useState, type MouseEvent } from 'react';
import { motion } from 'motion/react';
import { Check, MessageCircle } from 'lucide-react';
import type { Language, ServiceItem } from '../data/clinicContent';

interface TiltServiceCardProps {
  service: ServiceItem;
  language: Language;
  isSelected: boolean;
  directWhatsappHint: string;
  selectForFormHint: string;
  selectedLabel: string;
  onSelect: (service: ServiceItem) => void;
  onBookService: (service: ServiceItem) => void;
  lightMotion: boolean;
  index: number;
}

export function TiltServiceCard({
  service,
  language,
  isSelected,
  directWhatsappHint,
  selectForFormHint,
  selectedLabel,
  onSelect,
  onBookService,
  lightMotion,
  index,
}: TiltServiceCardProps) {
  const cardRef = useRef<HTMLElement | null>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, glowX: 50, glowY: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
    if (lightMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    const maxTilt = 5;
    const rotateY = (x - 0.5) * (maxTilt * 2);
    const rotateX = (0.5 - y) * (maxTilt * 2);

    setTilt({
      rotateX,
      rotateY,
      glowX: x * 100,
      glowY: y * 100,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0, glowX: 50, glowY: 50 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: lightMotion ? 12 : 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: lightMotion ? 0.38 : 0.55,
        delay: lightMotion ? Math.min(index, 5) * 0.03 : Math.min(index, 5) * 0.05,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="h-full"
    >
      <article
        ref={cardRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: lightMotion
            ? undefined
            : `perspective(900px) rotateX(${tilt.rotateX.toFixed(2)}deg) rotateY(${tilt.rotateY.toFixed(2)}deg) translateZ(0)`,
          transition: isHovered
            ? 'transform 110ms cubic-bezier(0.16, 1, 0.3, 1), border-color 180ms ease, background-color 180ms ease'
            : 'transform 380ms cubic-bezier(0.16, 1, 0.3, 1), border-color 180ms ease, background-color 180ms ease',
        }}
        className={`group relative flex h-full w-full flex-col justify-between overflow-hidden rounded-sm border p-6 text-start backdrop-blur-md transition-colors md:p-7 ${
          isSelected
            ? 'border-[#C0A184] bg-[#5F492E]/80'
            : 'border-[#96805C]/30 bg-[#352A1A]/80 hover:border-[#C0A184]/75 hover:bg-[#5F492E]/55'
        }`}
      >
        {!lightMotion && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 transition-opacity duration-200"
            style={{
              opacity: isHovered ? 1 : 0,
              background: `radial-gradient(280px circle at ${tilt.glowX}% ${tilt.glowY}%, rgba(192, 161, 132, 0.16), transparent 65%)`,
            }}
          />
        )}

        <div className="relative z-10">
          <div className="mb-4 flex items-center justify-between gap-3">
            <span className="font-mono text-xs tracking-widest text-[#C0A184] tabular-nums">
              {service.number}
            </span>

            <button
              type="button"
              onClick={() => onSelect(service)}
              className={`inline-flex min-h-[32px] items-center gap-1.5 text-xs transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                isSelected
                  ? 'font-medium text-[#C0A184]'
                  : 'text-[#C0A184]/75 hover:text-[#F4EDE6]'
              }`}
            >
              {isSelected ? (
                <>
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{selectedLabel}</span>
                </>
              ) : (
                <span>{selectForFormHint}</span>
              )}
            </button>
          </div>

          <h3 className="font-clinic-display mb-2.5 text-[1.4rem] leading-snug font-bold text-[#F4EDE6]">
            {service.title}
          </h3>

          <p className="text-sm leading-relaxed text-[#F4EDE6]/80">
            {service.description}
          </p>
        </div>

        <div className="relative z-10 mt-6 border-t border-[#96805C]/25 pt-4">
          <button
            type="button"
            onClick={() => onBookService(service)}
            className="inline-flex min-h-[40px] w-full items-center justify-between gap-2 text-xs font-medium text-[#C0A184] transition-colors hover:text-[#F4EDE6] cursor-pointer md:text-sm"
          >
            <span className="inline-flex items-center gap-2 whitespace-nowrap">
              <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{directWhatsappHint}</span>
            </span>
            <span aria-hidden="true" className="text-[#96805C] transition-transform duration-200 group-hover:translate-x-0.5">
              {language === 'ar' ? '←' : '→'}
            </span>
          </button>
        </div>
      </article>
    </motion.div>
  );
}
