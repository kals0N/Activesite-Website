'use client';

import { useState } from 'react';
import NextLink from 'next/link';
import { ArrowRight, Check, Clock } from 'lucide-react';
import { whatsappUrl } from '@/lib/whatsapp';
import { cn } from '@/lib/cn';
import { buttonClasses } from '@/components/ui/button';
import { WhatsAppIcon } from '@/components/ui/icons';

export type Need = 'website' | 'store' | 'app' | 'brand' | 'grow';
export type When = 'asap' | '1-3' | 'exploring';

export type PlannerCopy = {
  title: string;
  sub: string;
  needLabel: string;
  whenLabel: string;
  needs: Record<Need, string>;
  needPhrases: Record<Need, string>;
  whens: Record<When, string>;
  whenPhrases: Record<When, string>;
  resultLabel: string;
  includes: string;
  timeline: string;
  timelines: Record<Need, string>;
  book: string;
  whatsapp: string;
  waMessage: string;
  note: string;
};

export type PlannerService = { key: string; name: string; href: string };

const NEEDS: Need[] = ['website', 'store', 'app', 'brand', 'grow'];
const WHENS: When[] = ['asap', '1-3', 'exploring'];
/** Contact form timeline values for each choice. */
const FORM_TIMELINE: Record<When, string> = { asap: 'asap', '1-3': '1-3', exploring: 'exploring' };

/**
 * Hero project planner: two taps turn a visitor's need into a plan (services + timeline) and a
 * pre-filled next step, so the call to action feels like continuing, not starting over.
 * Server-rendered with a default selection, so it reads correctly before JS loads.
 */
export function ProjectPlanner({
  copy,
  plans,
  contactHref,
}: {
  copy: PlannerCopy;
  plans: Record<Need, { primary: string; services: PlannerService[] }>;
  contactHref: string;
}) {
  const [need, setNeed] = useState<Need>('website');
  const [when, setWhen] = useState<When>('1-3');
  const plan = plans[need];

  const message = copy.waMessage
    .replace('{need}', copy.needPhrases[need])
    .replace('{when}', copy.whenPhrases[when]);
  const bookHref = `${contactHref}?service=${plan.primary}&timeline=${FORM_TIMELINE[when]}#book`;

  return (
    <div
      data-planner
      className="rounded-panel border-border bg-surface shadow-lift mx-auto mt-14 w-full max-w-5xl border p-2 text-left lg:mt-20"
    >
      {/* Plain data for no-JS/static previews of the planner (the React state is the source of truth). */}
      <script
        type="application/json"
        data-planner-data
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({ copy, plans, contactHref }).replace(/</g, '\\u003c'),
        }}
      />
      <div className="grid gap-2 lg:grid-cols-[1.25fr_1fr]">
        <div className="p-5 sm:p-7">
          <h2 className="text-h3 font-semibold">{copy.title}</h2>
          <p className="text-ink-muted mt-2 max-w-md">{copy.sub}</p>

          <fieldset className="mt-7">
            <legend className="text-small text-ink-muted font-medium">{copy.needLabel}</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {NEEDS.map((n) => (
                <Chip key={n} kind="need" value={n} active={need === n} onClick={() => setNeed(n)}>
                  {copy.needs[n]}
                </Chip>
              ))}
            </div>
          </fieldset>

          <fieldset className="mt-6">
            <legend className="text-small text-ink-muted font-medium">{copy.whenLabel}</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {WHENS.map((w) => (
                <Chip key={w} kind="when" value={w} active={when === w} onClick={() => setWhen(w)}>
                  {copy.whens[w]}
                </Chip>
              ))}
            </div>
          </fieldset>
        </div>

        <div
          className="rounded-card bg-surface-warm flex flex-col p-5 sm:p-7"
          aria-live="polite"
          aria-atomic="true"
        >
          <p className="text-small text-ink-muted font-medium">{copy.resultLabel}</p>
          <p data-pl-title className="text-h4 mt-1 font-semibold">
            {copy.needs[need]}
          </p>

          <p className="text-small text-ink-muted mt-5">{copy.includes}</p>
          <ul data-pl-services className="mt-2 space-y-2">
            {plan.services.map((s) => (
              <li key={s.key}>
                <NextLink href={s.href} className="group/s inline-flex items-center gap-2">
                  <Check aria-hidden size={16} className="text-success shrink-0" />
                  <span className="link-draw">{s.name}</span>
                </NextLink>
              </li>
            ))}
          </ul>

          <p className="text-small mt-5 inline-flex items-center gap-2">
            <Clock aria-hidden size={16} className="text-ink-muted" />
            <span className="text-ink-muted">{copy.timeline}:</span>
            <span data-pl-timeline className="font-semibold">
              {copy.timelines[need]}
            </span>
          </p>

          <div className="mt-6 grid gap-2 pt-1 lg:mt-auto">
            <a
              href={bookHref}
              data-pl-book
              data-book=""
              data-track="cta_click"
              data-track-label={`planner_${need}_${when}`}
              className={cn(buttonClasses('primary', 'md'), 'w-full')}
            >
              <span>{copy.book}</span>
              <ArrowRight aria-hidden size={18} />
            </a>
            <a
              href={whatsappUrl(message)}
              data-pl-wa
              target="_blank"
              rel="noopener"
              data-track="whatsapp_click"
              data-track-label={`planner_${need}_${when}`}
              className={cn(buttonClasses('whatsapp', 'md'), 'w-full')}
            >
              <WhatsAppIcon size={18} />
              <span>{copy.whatsapp}</span>
            </a>
            <p className="text-small text-ink-muted mt-1 text-center">{copy.note}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Chip({
  kind,
  value,
  active,
  onClick,
  children,
}: {
  kind: 'need' | 'when';
  value: string;
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      data-pl-kind={kind}
      data-pl-value={value}
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        'text-small inline-flex min-h-11 items-center rounded-full border px-4 font-medium transition-[background-color,border-color,color] duration-(--duration-fast)',
        active ? 'border-ink bg-ink text-white' : 'border-border bg-surface hover:border-ink/40',
      )}
    >
      {children}
    </button>
  );
}
