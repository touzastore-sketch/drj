import type { Language } from '../data/clinicContent';

interface ShimmerHeadlineProps {
  text: string;
  language: Language;
  prefersReducedMotion: boolean;
  lightMotion: boolean;
}

export function ShimmerHeadline({
  text,
  language,
  prefersReducedMotion,
  lightMotion,
}: ShimmerHeadlineProps) {
  const isRtl = language === 'ar';

  if (prefersReducedMotion) {
    return (
      <h1
        dir={isRtl ? 'rtl' : 'ltr'}
        className="font-clinic-display text-[clamp(2.35rem,4.4vw,4rem)] leading-[1.18] font-bold tracking-tight text-[#254736] [text-wrap:balance]"
      >
        {text}
      </h1>
    );
  }

  if (isRtl) {
    const charSteps = Math.max(text.replace(/\s+/g, '').length, 18);
    const duration = lightMotion ? '1.35s' : '1.75s';

    return (
      <h1
        key={`ar-${text}`}
        dir="rtl"
        className="font-clinic-display relative inline-block text-[clamp(2.35rem,4.4vw,4rem)] leading-[1.2] font-bold text-[#254736] [text-wrap:balance]"
        aria-label={text}
      >
        <span className="opacity-0 select-none" aria-hidden="true">
          {text}
        </span>

        {/* Soft mint shimmer layer revealing ahead */}
        <span
          aria-hidden="true"
          className="absolute inset-0 text-[#66A480]"
          style={{
            textShadow: '0 0 20px rgba(123, 184, 149, 0.55)',
            animation: `reveal-rtl ${duration} steps(${charSteps}, end) 0.12s both`,
          }}
        >
          {text}
        </span>

        {/* Soft forest-sage foreground finishing each letter cleanly */}
        <span
          aria-hidden="true"
          className="absolute inset-0 text-[#254736]"
          style={{
            animation: `reveal-rtl ${duration} steps(${charSteps}, end) 0.22s both`,
          }}
        >
          {text}
        </span>

        {/* Traveling sage light beam across the headline */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <span
            className="block h-full w-1/3 bg-gradient-to-l from-transparent via-[#94CBA9]/50 to-transparent blur-md"
            style={{
              animation: `gold-beam-rtl ${lightMotion ? '1.6s' : '2.05s'} cubic-bezier(0.22, 1, 0.36, 1) 0.12s both`,
            }}
          />
        </span>
      </h1>
    );
  }

  const words = text.split(' ');
  let charCounter = 0;

  return (
    <h1
      key={`en-${text}`}
      dir="ltr"
      className="font-clinic-display text-[clamp(2.35rem,4.3vw,3.9rem)] leading-[1.12] font-semibold tracking-tight text-[#254736] [text-wrap:balance]"
      aria-label={text}
    >
      {words.map((word, wordIdx) => {
        const letters = Array.from(word);
        const wordStartIndex = charCounter;
        charCounter += letters.length + 1;

        return (
          <span key={`${word}-${wordIdx}`} className="inline-block whitespace-nowrap">
            {letters.map((char, charIdx) => {
              const globalIdx = wordStartIndex + charIdx;
              const stepDelay = lightMotion ? 0.024 : 0.036;
              return (
                <span
                  key={`${char}-${charIdx}`}
                  aria-hidden="true"
                  className="inline-block"
                  style={{
                    animation: `char-gold-glint 0.55s cubic-bezier(0.16, 1, 0.3, 1) ${(
                      0.14 +
                      globalIdx * stepDelay
                    ).toFixed(3)}s both`,
                  }}
                >
                  {char}
                </span>
              );
            })}
            {wordIdx < words.length - 1 ? (
              <span aria-hidden="true">&nbsp;</span>
            ) : null}
          </span>
        );
      })}
    </h1>
  );
}
