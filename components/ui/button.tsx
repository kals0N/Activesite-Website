import type { ReactNode } from 'react';
import NextLink from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/cn';
import { WhatsAppIcon } from './icons';

type Variant = 'primary' | 'secondary' | 'ghost' | 'whatsapp' | 'inverse';
type Size = 'md' | 'lg' | 'sm';

type ButtonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  /** Show the sliding arrow (primary CTAs only, by convention) */
  arrow?: boolean;
  /** Full width below the sm breakpoint, as the brief asks for mobile CTAs */
  fullOnMobile?: boolean;
  className?: string;
  /** Analytics: delegated listener reads these (see components/integrations/analytics.tsx) */
  track?: 'cta_click' | 'whatsapp_click';
  trackLabel?: string;
} &
  /** Internal, already-localized path (use pathFor) or an external URL with `external` */
  (
    | { href: string; external?: boolean; book?: boolean }
    | { href?: undefined; type?: 'button' | 'submit'; onClick?: () => void; disabled?: boolean }
  );

const variants: Record<Variant, string> = {
  primary: 'bg-primary text-white hover:bg-primary-hover shadow-soft',
  secondary: 'bg-surface text-ink border border-border hover:border-ink/40',
  ghost: 'text-ink hover:bg-ink/5',
  whatsapp: 'bg-whatsapp text-white hover:brightness-95 shadow-soft',
  inverse: 'bg-white text-ink hover:bg-primary-tint',
};

const sizes: Record<Size, string> = {
  sm: 'h-10 px-4 text-small',
  md: 'h-12 px-6 text-[0.9375rem]',
  lg: 'h-14 px-7 text-base',
};

export function buttonClasses(
  variant: Variant = 'primary',
  size: Size = 'md',
  fullOnMobile = false,
) {
  return cn(
    'group/btn relative inline-flex min-w-11 select-none items-center justify-center gap-2 rounded-full font-medium tracking-[-0.01em] whitespace-nowrap',
    'transition-[background-color,border-color,color,transform,filter] duration-(--duration-fast) ease-(--ease-out) active:scale-[0.98]',
    'disabled:pointer-events-none disabled:opacity-60',
    variants[variant],
    sizes[size],
    fullOnMobile && 'w-full sm:w-auto',
  );
}

function Inner({
  children,
  arrow,
  variant,
}: {
  children: ReactNode;
  arrow?: boolean;
  variant: Variant;
}) {
  return (
    <>
      {variant === 'whatsapp' && <WhatsAppIcon size={18} />}
      <span>{children}</span>
      {arrow && (
        <ArrowRight
          aria-hidden
          size={18}
          className="transition-transform duration-(--duration-fast) ease-(--ease-out) group-hover/btn:translate-x-1"
        />
      )}
    </>
  );
}

export function Button(props: ButtonProps) {
  const {
    children,
    variant = 'primary',
    size = 'md',
    arrow,
    fullOnMobile,
    className,
    track,
    trackLabel,
  } = props;
  const cls = cn(buttonClasses(variant, size, fullOnMobile), className);
  const data = {
    'data-track': track,
    'data-track-label': trackLabel,
  };

  if (props.href === undefined) {
    return (
      <button
        type={props.type ?? 'button'}
        onClick={props.onClick}
        disabled={props.disabled}
        className={cls}
        {...data}
      >
        <Inner arrow={arrow} variant={variant}>
          {children}
        </Inner>
      </button>
    );
  }

  if (props.external) {
    return (
      <a href={props.href} target="_blank" rel="noopener" className={cls} {...data}>
        <Inner arrow={arrow} variant={variant}>
          {children}
        </Inner>
      </a>
    );
  }

  return (
    <NextLink
      href={props.href}
      className={cls}
      data-book={props.book ? '' : undefined}
      // Booking links usually open the Cal.com popup, so don't prefetch the contact page's JS.
      prefetch={props.book ? false : undefined}
      {...data}
    >
      <Inner arrow={arrow} variant={variant}>
        {children}
      </Inner>
    </NextLink>
  );
}
