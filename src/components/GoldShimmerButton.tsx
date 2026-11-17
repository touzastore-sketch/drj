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
      ? 'bg-gradient-to-r from-[#7B57B5] via-[#9370CC] to-[#7450AD] text-[#FAF7FD] font-semibold shadow-[0_10px_28px_-10px_rgba(123,87,181,0.5)] hover:shadow-[0_14px_34px_-8px_rgba(123,87,181,0.7)]'
      : 'border border-[#7D5BA8]/60 bg-[#FAF7FD]/85 text-[#4B366D] hover:border-[#7D5BA8] hover:bg-[#E9DFF5]';

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
