import { getTranslations } from 'next-intl/server';
import NextLink from 'next/link';
import type { Locale } from '@/i18n/routing';
import { getServices } from '@/lib/services';
import { pathFor, servicePaths } from '@/lib/routes';
import { site } from '@/lib/site';
import { whatsappUrl } from '@/lib/whatsapp';
import { Logo } from '@/components/ui/logo';
import { FacebookIcon, InstagramIcon, LinkedInIcon, WhatsAppIcon } from '@/components/ui/icons';
import { NewsletterForm } from '@/components/integrations/newsletter-form';
import { CookieSettingsLink } from '@/components/integrations/cookie-settings-link';
import { LangSwitchFooter } from './lang-switch-footer';
import { Mail, MapPin } from 'lucide-react';

export async function Footer({ locale }: { locale: Locale }) {
  const t = await getTranslations();
  const path = (href: Parameters<typeof pathFor>[1]) => pathFor(locale, href);
  const services = getServices(locale);
  const year = new Date().getFullYear();

  const company = [
    { label: t('nav.about'), href: path('/about') },
    { label: t('nav.work'), href: path('/work') },
    { label: t('nav.blog'), href: path('/blog') },
    { label: t('nav.contact'), href: path('/contact') },
  ];
  const social = [
    { label: 'LinkedIn', href: site.social.linkedin, Icon: LinkedInIcon },
    { label: 'Instagram', href: site.social.instagram, Icon: InstagramIcon },
    { label: 'Facebook', href: site.social.facebook, Icon: FacebookIcon },
  ];

  return (
    <footer className="on-ink border-border-ink bg-ink relative mt-auto overflow-hidden border-t text-white">
      <div className="container-site pt-20 pb-10 lg:pt-28">
        <div className="grid-site gap-y-14">
          <div className="col-span-4 md:col-span-8 lg:col-span-5">
            <Logo tone="white" className="h-14 w-auto" />
            <p className="text-body-lg text-ink-soft mt-6 max-w-sm">{t('footer.positioning')}</p>
            <div className="mt-10 max-w-md">
              <p className="text-h4 font-semibold">{t('newsletter.title')}</p>
              <NewsletterForm location="footer" tone="ink" />
            </div>
          </div>

          <nav
            aria-label={t('a11y.footerNav')}
            className="col-span-4 grid grid-cols-2 gap-8 md:col-span-8 md:grid-cols-3 lg:col-span-7 lg:pl-8"
          >
            <div className="col-span-2 md:col-span-1">
              <h2 className="text-small text-ink-soft font-medium">{t('footer.services')}</h2>
              <ul className="mt-4 space-y-2.5">
                {services.map((s) => (
                  <li key={s.key}>
                    <NextLink href={servicePaths(s.key)[locale]} className="link-draw text-small">
                      {s.name}
                    </NextLink>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-small text-ink-soft font-medium">{t('footer.company')}</h2>
              <ul className="mt-4 space-y-2.5">
                {company.map((l) => (
                  <li key={l.href}>
                    <NextLink href={l.href} className="link-draw text-small">
                      {l.label}
                    </NextLink>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-small text-ink-soft font-medium">{t('footer.contact')}</h2>
              <ul className="text-small mt-4 space-y-3">
                <li>
                  <a
                    href={whatsappUrl()}
                    target="_blank"
                    rel="noopener"
                    className="link-draw inline-flex items-center gap-2"
                    data-track="whatsapp_click"
                    data-track-label="footer"
                  >
                    <WhatsAppIcon size={16} /> {site.whatsapp.display}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className="link-draw inline-flex items-center gap-2"
                  >
                    <Mail aria-hidden size={16} /> {site.email}
                  </a>
                </li>
                <li className="inline-flex items-center gap-2">
                  <MapPin aria-hidden size={16} /> {site.location.city},{' '}
                  {locale === 'fr' ? site.location.countryFr : site.location.country}
                </li>
              </ul>
              <ul className="mt-6 flex gap-2" aria-label={t('footer.follow')}>
                {social.map(({ label, href, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener"
                      aria-label={`${label} ${t('a11y.newTab')}`}
                      className="border-border-ink hover:border-accent hover:text-accent inline-flex size-11 items-center justify-center rounded-full border transition-colors"
                    >
                      <Icon size={18} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        <div className="border-border-ink text-small text-ink-soft mt-20 flex flex-col gap-6 border-t pt-8 lg:flex-row lg:items-center lg:justify-between">
          <p>
            © {year} {site.legalName}. {t('footer.rights')}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <NextLink href={path('/privacy')} className="link-draw">
                {t('footer.privacy')}
              </NextLink>
            </li>
            <li>
              <NextLink href={path('/terms')} className="link-draw">
                {t('footer.terms')}
              </NextLink>
            </li>
            <li>
              <NextLink href={path('/cookies')} className="link-draw">
                {t('footer.cookies')}
              </NextLink>
            </li>
            <li>
              <CookieSettingsLink label={t('footer.cookieSettings')} />
            </li>
          </ul>
          <LangSwitchFooter locale={locale} />
        </div>
      </div>
    </footer>
  );
}
