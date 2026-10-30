import { cn } from '@/lib/cn';
import { Ph } from './ph';

/**
 * Browser + phone mockup frames, ready to receive real screenshots: pass `src` once
 * the client approves images. Until then a neutral placeholder layout is drawn.
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
  // Flat, quiet grounds so the screenshot is the only thing that draws the eye.
  const bg = { blue: 'bg-[#EEF1F6]', navy: 'bg-surface-warm', gold: 'bg-[#F3F2EF]' }[tone];

  return (
    <div className={cn('relative size-full', bg)}>
      {/* Desktop browser */}
      <div className="shadow-lift border-border absolute top-[12%] left-[8%] w-[72%] overflow-hidden rounded-[10px] border bg-white">
        <div className="border-border flex h-5 items-center gap-1 border-b px-2">
          <span className="bg-border size-1.5 rounded-full" />
          <span className="bg-border size-1.5 rounded-full" />
          <span className="bg-border size-1.5 rounded-full" />
        </div>
        <div className="bg-canvas relative aspect-[16/10]">
          {src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={src} alt={alt} className="size-full object-cover object-top" loading="lazy" />
          ) : (
            <div className="flex size-full flex-col justify-center gap-2 p-[8%]">
              <span className="bg-ink/85 h-[9%] w-2/3 rounded-sm" />
              <span className="bg-ink/85 h-[9%] w-1/2 rounded-sm" />
              <span className="bg-ink/15 mt-2 h-[5%] w-3/4 rounded-sm" />
              <span className="bg-ink/15 h-[5%] w-2/3 rounded-sm" />
              <span className="bg-primary mt-3 h-[12%] w-1/4 rounded-full" />
              {label && (
                <span className="text-ink-muted mt-3 text-[10px] leading-tight sm:text-xs">
                  <Ph>{label}</Ph>
                </span>
              )}
            </div>
          )}
        </div>
      </div>
      {/* Phone */}
      <div className="border-ink shadow-lift absolute right-[7%] bottom-[-8%] w-[24%] overflow-hidden rounded-[14px] border-[3px] bg-white">
        <div className="bg-canvas aspect-[9/19] p-[12%]">
          <span className="bg-ink/80 block h-[5%] w-3/4 rounded-sm" />
          <span className="bg-ink/15 mt-[8%] block h-[3%] w-full rounded-sm" />
          <span className="bg-ink/15 mt-[5%] block h-[3%] w-4/5 rounded-sm" />
          <span className="bg-primary mt-[14%] block h-[7%] w-full rounded-full" />
          <span className="bg-whatsapp mt-[6%] block h-[7%] w-full rounded-full" />
        </div>
      </div>
    </div>
  );
}
