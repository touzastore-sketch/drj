import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

type BaseProps = {
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'outline';
};

type ButtonProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: 'button';
  };

type AnchorProps = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    as: 'a';
  };

export type GoldShimmerButtonProps = ButtonProps | AnchorProps;

export function GoldShimmerButton(props: GoldShimmerButtonProps) {
  const { children, className = '', variant = 'primary', ...rest } = props;

  const variantClasses =
    variant === 'primary'
      ? 'bg-gradient-to-r from-[#45805E] via-[#599873] to-[#3E7655] text-[#F7FCF9] font-semibold shadow-[0_10px_28px_-10px_rgba(69,128,94,0.48)] hover:shadow-[0_14px_34px_-8px_rgba(69,128,94,0.65)]'
      : 'border border-[#45805E]/55 bg-[#F7FCF9]/85 text-[#254736] hover:border-[#45805E] hover:bg-[#E2F1E7]';

  const baseClasses = `gold-shimmer-btn inline-flex min-h-[44px] items-center justify-center gap-2.5 rounded-sm px-7 py-3.5 text-sm md:text-base whitespace-nowrap shrink-0 cursor-pointer active:scale-[0.985] ${variantClasses} ${className}`;

  if (props.as === 'a') {
    const { as: _as, children: _c, className: _cl, variant: _v, ...anchorRest } = props;
    return (
      <a className={baseClasses} {...anchorRest}>
        {children}
      </a>
    );
  }

  const { as: _as, children: _c, className: _cl, variant: _v, ...buttonRest } = rest as ButtonProps;
  return (
    <button type="button" className={baseClasses} {...buttonRest}>
      {children}
    </button>
  );
}
