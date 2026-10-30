import { getTranslations } from 'next-intl/server';
import { Ph } from '@/components/ui/ph';
import { ProcessSteps } from './process-steps';

export async function Process() {
  const t = await getTranslations('home.process');
  const steps = t.raw('steps') as { name: string; body: string }[];
  return (
    <section aria-labelledby="process-title" className="section-y bg-surface-warm">
      <div className="container-site">
        <ProcessSteps
          steps={steps}
          heading={
            <div data-reveal>
              <h2 id="process-title" className="font-display text-h2">
                {t('title')}
              </h2>
              <p className="text-body-lg text-ink-muted mt-5 max-w-md">{t('sub')}</p>
              <p className="border-border bg-surface text-small mt-6 inline-flex rounded-full border px-4 py-2">
                <Ph>{t('time')}</Ph>
              </p>
            </div>
          }
        />
      </div>
    </section>
  );
}
