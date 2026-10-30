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
  ['primary-tint', '#EEF3FF', 'Soft blue backgrounds, selected states'],
  ['ink', '#111318', 'Graphite: headings and body text'],
  ['ink-muted', '#5B6170', 'Secondary text, captions'],
  ['canvas', '#FFFFFF', 'Page background'],
  ['surface', '#FFFFFF', 'Cards on canvas'],
  ['surface-warm', '#F6F6F7', 'Soft grey sections and footer'],
  ['border', '#E7E8EB', 'Hairlines, dividers'],
  ['success', '#12805C', 'Success messages'],
  ['error', '#D92D20', 'Errors'],
  ['warning', '#B54708', 'Warnings'],
  ['whatsapp', '#0E7D42', 'WhatsApp actions (AA with white text)'],
] as const;

const type = [
  ['text-display font-display', 'Display · Geist 600 · 44→100px / 1.0'],
  ['text-h1 font-display', 'H1 · Geist 600 · 40→72px / 1.04'],
  ['text-h2 font-display', 'H2 · Geist 600 · 32→52px / 1.08'],
  ['text-h3 font-semibold', 'H3 · Geist 600 · 24→32px / 1.15 · −3%'],
  ['text-h4 font-semibold', 'H4 · Geist 600 · 20px / 1.3 · −3%'],
  ['text-body-lg', 'Body large · Geist 400 · 18→20px / 1.55'],
  ['text-body', 'Body · Geist 400 · 16→17px / 1.6'],
  ['text-small font-medium', 'Small / label · Geist 500 · 14px / 1.45'],
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
      <p className="text-body-lg text-ink-muted mt-4 max-w-2xl">
        Design tokens live in <code>app/globals.css</code> (Tailwind v4 <code>@theme</code>).
        Components use semantic names only. This page is not indexed.
      </p>

      <Block title="Brand">
        <div className="flex flex-wrap items-center gap-10">
          <Logo className="h-24 w-auto" />
          <Mark size={64} />
        </div>
      </Block>

      <Block title="Colour">
        <p className="text-ink-muted mb-6">
          White and soft grey surfaces, graphite text, logo blue only for actions.
        </p>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {colors.map(([name, hex, role]) => (
            <li key={name} className="rounded-card border-border bg-surface overflow-hidden border">
              <div className="h-20" style={{ background: hex }} />
              <div className="text-small p-4">
                <p className="font-semibold">--color-{name}</p>
                <p className="text-ink-muted tabular">{hex}</p>
                <p className="text-ink-muted mt-1">{role}</p>
              </div>
            </li>
          ))}
        </ul>
      </Block>

      <Block title="Typography">
        <div className="space-y-6">
          {type.map(([cls, label]) => (
            <div key={label} className="border-border border-b pb-6">
              <p className="text-small text-ink-muted">{label}</p>
              <p className={cls}>Websites that sell</p>
            </div>
          ))}
        </div>
      </Block>

      <Block title="Spacing and radius">
        <div className="flex flex-wrap items-end gap-4">
          {[4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160].map((s) => (
            <div key={s} className="text-small text-ink-muted text-center">
              <div className="bg-primary-tint" style={{ width: s, height: s }} />
              {s}
            </div>
          ))}
        </div>
        <div className="text-small mt-8 flex flex-wrap gap-4">
          <div className="rounded-input border-border bg-surface border p-6">8px input</div>
          <div className="rounded-card border-border bg-surface border p-6">16px card</div>
          <div className="rounded-panel border-border bg-surface border p-6">28px panel</div>
          <div className="border-border bg-surface rounded-full border px-6 py-3">
            full button/chip
          </div>
        </div>
      </Block>

      <Block title="Motion">
        <table className="text-small w-full text-left">
          <tbody>
            {motion.map(([n, v, u]) => (
              <tr key={n} className="border-border border-b">
                <td className="py-3 pr-4 font-semibold">{n}</td>
                <td className="tabular py-3 pr-4">{v}</td>
                <td className="text-ink-muted py-3">{u}</td>
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
          <Button href="#" variant="secondary">
            Secondary
          </Button>
          <Button href="#" variant="ghost">
            Ghost
          </Button>
          <span className="bg-ink rounded-full p-3">
            <Button href="#" variant="inverse">
              Inverse
            </Button>
          </span>
        </div>
      </Block>

      <Block title="Stat, accordion, newsletter">
        <div className="grid gap-8 lg:grid-cols-3">
          <Stat value="120+" label="Counts up when in view" />
          <div className="lg:col-span-2">
            <Faq
              schema={false}
              items={[
                { q: 'Accordion question', a: 'Answer text. Icon rotates 45°, height animates.' },
              ]}
            />
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
      <h2 className="font-display text-h2 mb-8">{title}</h2>
      {children}
    </section>
  );
}
