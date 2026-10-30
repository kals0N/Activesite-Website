import { ARC_BOTTOM, ARC_TOP } from '@/components/ui/icons';
import { cn } from '@/lib/cn';

/**
 * The brand's signature: the two arcs of the Activesite mark — the blue arc reaches out,
 * the navy arc answers it. Used large and cropped as section art; drifts very slowly.
 * On ink backgrounds the navy arc is drawn as a gold hairline so it stays visible.
 */
export function ArcField({
  className,
  tone = 'ink',
  still = false,
}: {
  className?: string;
  tone?: 'ink' | 'light';
  still?: boolean;
}) {
  return (
    <svg viewBox="0 0 40 40" className={cn(className)} aria-hidden focusable={false}>
      <g
        className={cn('origin-center', !still && 'motion-safe:animate-arc-spin')}
        style={{ transformBox: 'view-box' }}
      >
        <path d={ARC_TOP} fill="var(--color-primary)" opacity={tone === 'ink' ? 0.9 : 1} />
        {tone === 'ink' ? (
          <path
            d={ARC_BOTTOM}
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth={0.12}
            opacity={0.7}
          />
        ) : (
          <path d={ARC_BOTTOM} fill="var(--color-ink)" />
        )}
      </g>
    </svg>
  );
}
