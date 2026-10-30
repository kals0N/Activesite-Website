import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { BookButton, WhatsAppButton } from '@/components/ui/cta-buttons';
import { Faq } from '@/components/ui/faq';
import { Stat } from '@/components/ui/stat';
import { Logo } from '@/components/ui/logo';
import { Mark } from '@/components/ui/icons';
import { NewsletterForm } from '@/components/integrations/newsletter-form';

export const metadata: Metadata = { title: 'Styleguide', robots: { index: false, follow: false } };

const colors = [
  ['primary', '#0058FB', 'Buttons, links, focus. If it is blue, it is clickable.'],
  ['primary-hover', '#0047CC', 'Hover and pressed state of primary'],
  ['primary-tint', '#E8EFFF', 'Soft blue backgrounds, selected states'],
  ['ink', '#000B30', 'Headings, body text, dark sections'],
  ['ink-muted', '#4A5170', 'Secondary text, captions'],
  ['ink-soft', '#C9CDE0', 'Body text on ink sections'],
  ['canvas', '#FAF8F4', 'Page background'],
  ['surface', '#FFFFFF', 'Cards on canvas'],
  ['surface-warm', '#F2EEE7', 'Alternate warm sections'],
  ['border', '#E4DED3', 'Hairlines, dividers'],
  ['border-ink', '#1F2A52', 'Hairlines on ink'],
  ['accent', '#E8B04B', 'Gold: badges, icons on ink. Never text on light.'],
  ['success', '#12805C', 'Success messages'],
  ['error', '#D92D20', 'Errors'],
  ['warning', '#B54708', 'Warnings'],
  ['whatsapp', '#128C4B', 'WhatsApp actions (AA with white text)'],
] as const;

const type = [
  ['text-display font-display', 'Display · Instrument Serif · 48→120px / 0.95'],
  ['text-h1 font-display', 'H1 · Instrument Serif · 40→80px / 1.0'],
  ['text-h2 font-display', 'H2 · Instrument Serif · 32→56px / 1.05'],
  ['text-h3 font-semibold', 'H3 · Inter 600 · 24→32px / 1.15 · −3%'],
  ['text-h4 font-semibold', 'H4 · Inter 600 · 20px / 1.3 · −3%'],
  ['text-body-lg', 'Body large · Inter 400 · 18→20px / 1.55'],
  ['text-body', 'Body · Inter 400 · 16→17px / 1.6'],
  ['text-small font-medium', 'Small / label · Inter 500 · 14px / 1.45'],
] as const;

const motion = [
  ['duration-fast', '150ms', 'Hover, press, focus'],
  ['duration-base', '300ms', 'Menus, accordions, toasts'],
  ['duration-slow', '600ms', 'Section reveals'],
  ['duration-story', '1000ms', 'Hero intro'],
  ['ease-out', 'cubic-bezier(0.16, 1, 0.3, 1)', 'Entrances'],
  ['ease-in-out', 'cubic-bezier(0.65, 0, 0.35, 1)', 'Transitions, toggles'],
  ['stagger', '70ms', 'Lists, cards, words'],
] as const;

export default async function Styleguide({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="container-site pt-32 pb-24">
      <h1 className="font-display text-h1">Activesite styleguide</h1>
      <p className="mt-4 max-w-2xl text-body-lg text-ink-muted">
        Design tokens live in <code>app/globals.css</code> (Tailwind v4 <code>@theme</code>). Components use semantic names only. This page is not indexed.
      </p>

      <Block title="Brand">
        <div className="flex flex-wrap items-center gap-10">
          <Logo className="h-24 w-auto" />
          <div className="rounded-card bg-ink p-6"><Logo tone="white" className="h-24 w-auto" /></div>
          <Mark size={64} />
        </div>
      </Block>

      <Block title="Colour">
        <p className="mb-6 text-ink-muted">60-30-10: canvas and surfaces 60%, ink 30%, primary blue 10%. Gold under 5%.</p>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {colors.map(([name, hex, role]) => (
            <li key={name} className="overflow-hidden rounded-card border border-border bg-surface">
              <div className="h-20" style={{ background: hex }} />
              <div className="p-4 text-small">
                <p className="font-semibold">--color-{name}</p>
                <p className="text-ink-muted tabular">{hex}</p>
                <p className="mt-1 text-ink-muted">{role}</p>
              </div>
            </li>
          ))}
        </ul>
      </Block>

      <Block title="Typography">
        <div className="space-y-6">
          {type.map(([cls, label]) => (
            <div key={label} className="border-b border-border pb-6">
              <p className="text-small text-ink-muted">{label}</p>
              <p className={cls}>Websites that sell</p>
            </div>
          ))}
        </div>
      </Block>

      <Block title="Spacing and radius">
        <div className="flex flex-wrap items-end gap-4">
          {[4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160].map((s) => (
            <div key={s} className="text-center text-small text-ink-muted">
              <div className="bg-primary-tint" style={{ width: s, height: s }} />
              {s}
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-4 text-small">
          <div className="rounded-input border border-border bg-surface p-6">8px input</div>
          <div className="rounded-card border border-border bg-surface p-6">16px card</div>
          <div className="rounded-panel border border-border bg-surface p-6">28px panel</div>
          <div className="rounded-full border border-border bg-surface px-6 py-3">full button/chip</div>
        </div>
      </Block>

      <Block title="Motion">
        <table className="w-full text-left text-small">
          <tbody>
            {motion.map(([n, v, u]) => (
              <tr key={n} className="border-b border-border">
                <td className="py-3 pr-4 font-semibold">{n}</td>
                <td className="py-3 pr-4 tabular">{v}</td>
                <td className="py-3 text-ink-muted">{u}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Block>

      <Block title="Buttons">
        <div className="flex flex-wrap gap-3">
          <BookButton location="styleguide" fullOnMobile={false} />
          <WhatsAppButton location="styleguide" fullOnMobile={false} />
          <WhatsAppButton location="styleguide" variant="whatsapp" fullOnMobile={false} />
          <Button href="#" variant="secondary">Secondary</Button>
          <Button href="#" variant="ghost">Ghost</Button>
          <span className="rounded-full bg-ink p-3"><Button href="#" variant="inverse">Inverse</Button></span>
        </div>
      </Block>

      <Block title="Stat, accordion, newsletter">
        <div className="grid gap-8 lg:grid-cols-3">
          <Stat value="120+" label="Counts up when in view" />
          <div className="lg:col-span-2">
            <Faq schema={false} items={[{ q: 'Accordion question', a: 'Answer text. Icon rotates 45°, height animates.' }]} />
          </div>
        </div>
        <div className="mt-8 max-w-lg">
          <NewsletterForm location="styleguide" />
        </div>
      </Block>
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-20">
      <h2 className="mb-8 font-display text-h2">{title}</h2>
      {children}
    </section>
  );
}
