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
              <p className="mt-5 max-w-md text-body-lg text-ink-muted">{t('sub')}</p>
              <p className="mt-6 inline-flex rounded-full border border-border bg-surface px-4 py-2 text-small">
                <Ph>{t('time')}</Ph>
              </p>
            </div>
          }
        />
      </div>
    </section>
  );
}
