import { cn } from '@/lib/cn';
import { Ph } from './ph';
import { ArcField } from '@/components/sections/arc-art';

/**
 * Browser + phone mockup frames, ready to receive real screenshots: pass `src` once
 * the client approves images. Until then a branded placeholder canvas is drawn.
 */
export function DeviceFrame({
  tone = 'blue',
  label,
  src,
  alt = '',
}: {
  tone?: 'blue' | 'navy' | 'gold';
  label?: string;
  src?: string;
  alt?: string;
}) {
  const bg = {
    blue: 'bg-[radial-gradient(120%_90%_at_80%_10%,#2e78ff_0%,#0058FB_40%,#00237a_100%)]',
    navy: 'bg-[radial-gradient(120%_90%_at_20%_0%,#1f3a8a_0%,#0b1b55_45%,#000B30_100%)]',
    gold: 'bg-[radial-gradient(120%_90%_at_70%_0%,#f6d48c_0%,#E8B04B_45%,#a8741c_100%)]',
  }[tone];

  return (
    <div className={cn('relative size-full', bg)}>
      <ArcField tone="light" still className="absolute -top-1/4 -left-1/4 w-[90%] opacity-10 mix-blend-overlay" />
      {/* Desktop browser */}
      <div className="absolute top-[12%] left-[8%] w-[72%] overflow-hidden rounded-[10px] bg-white shadow-float">
        <div className="flex h-5 items-center gap-1 border-b border-border px-2">
          <span className="size-1.5 rounded-full bg-border" />
          <span className="size-1.5 rounded-full bg-border" />
          <span className="size-1.5 rounded-full bg-border" />
        </div>
        <div className="relative aspect-[16/10] bg-canvas">
          {src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={src} alt={alt} className="size-full object-cover object-top" loading="lazy" />
          ) : (
            <div className="flex size-full flex-col justify-center gap-2 p-[8%]">
              <span className="h-[9%] w-2/3 rounded-sm bg-ink/80" />
              <span className="h-[9%] w-1/2 rounded-sm bg-ink/80" />
              <span className="mt-2 h-[5%] w-3/4 rounded-sm bg-ink/15" />
              <span className="h-[5%] w-2/3 rounded-sm bg-ink/15" />
              <span className="mt-3 h-[12%] w-1/4 rounded-full bg-primary" />
              {label && (
                <span className="mt-3 text-[10px] leading-tight text-ink-muted sm:text-xs">
                  <Ph>{label}</Ph>
                </span>
              )}
            </div>
          )}
        </div>
      </div>
      {/* Phone */}
      <div className="absolute right-[7%] bottom-[-8%] w-[24%] overflow-hidden rounded-[14px] border-[3px] border-ink bg-white shadow-float">
        <div className="aspect-[9/19] bg-canvas p-[12%]">
          <span className="block h-[5%] w-3/4 rounded-sm bg-ink/80" />
          <span className="mt-[8%] block h-[3%] w-full rounded-sm bg-ink/15" />
          <span className="mt-[5%] block h-[3%] w-4/5 rounded-sm bg-ink/15" />
          <span className="mt-[14%] block h-[7%] w-full rounded-full bg-primary" />
          <span className="mt-[6%] block h-[7%] w-full rounded-full bg-whatsapp" />
        </div>
      </div>
    </div>
  );
}
