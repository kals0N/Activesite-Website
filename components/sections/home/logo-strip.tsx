import { getTranslations } from 'next-intl/server';

/** Client logos. Until real logos are approved, neutral placeholder slots are shown. */
export async function LogoStrip() {
  const t = await getTranslations('home.logos');
  const slots = Array.from({ length: 5 }, (_, i) => i);
  return (
    <section aria-label={t('label')} className="border-border border-y py-10">
      <div className="container-site flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-12">
        <p className="text-small text-ink-muted shrink-0">{t('label')}</p>
        <ul className="grid flex-1 grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {slots.map((i) => (
            <li
              key={i}
              className="rounded-card border-border text-small text-ink-muted flex h-14 items-center justify-center border border-dashed px-3 text-center max-sm:last:col-span-2"
            >
              <span className="ph" data-placeholder>
                [[PLACEHOLDER: client logo]]
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
