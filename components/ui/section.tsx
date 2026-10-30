import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Ph } from './ph';

export function Section({
  id,
  children,
  className,
  tone = 'canvas',
  labelledBy,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  tone?: 'canvas' | 'warm' | 'ink' | 'surface';
  labelledBy?: string;
}) {
  const tones = {
    canvas: '',
    warm: 'bg-surface-warm',
    surface: 'bg-surface',
    ink: 'on-ink bg-ink text-white',
  };
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn('section-y relative', tones[tone], className)}
    >
      <div className="container-site">{children}</div>
    </section>
  );
}

export function SectionHeading({
  id,
  title,
  sub,
  className,
  as: As = 'h2',
  align = 'left',
}: {
  id?: string;
  title: string;
  sub?: string;
  className?: string;
  as?: 'h1' | 'h2';
  align?: 'left' | 'center';
}) {
  return (
    <div
      data-reveal
      className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}
    >
      <As id={id} className={cn('font-display', As === 'h1' ? 'text-h1' : 'text-h2')}>
        <Ph>{title}</Ph>
      </As>
      {sub && (
        <p className="text-body-lg text-ink-muted [.on-ink_&]:text-ink-soft mt-5">
          <Ph>{sub}</Ph>
        </p>
      )}
    </div>
  );
}
