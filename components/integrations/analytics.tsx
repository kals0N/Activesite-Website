'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { track } from '@/lib/analytics';
import { CONSENT_EVENT, readConsent, type Consent } from '@/lib/consent';

const GA_ID = process.env.NEXT_PUBLIC_GA4_ID;
const META_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const TIKTOK_ID = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID;

function inject(src: string) {
  const s = document.createElement('script');
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

function loadGa() {
  if (!GA_ID || window.gtag) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  // Consent Mode v2: everything denied by default, then granted for the categories chosen.
  window.gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
  });
  window.gtag('js', new Date());
  window.gtag('config', GA_ID, { anonymize_ip: true });
  inject(`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`);
}

function updateGoogleConsent(c: Consent) {
  window.gtag?.('consent', 'update', {
    analytics_storage: c.analytics ? 'granted' : 'denied',
    ad_storage: c.marketing ? 'granted' : 'denied',
    ad_user_data: c.marketing ? 'granted' : 'denied',
    ad_personalization: c.marketing ? 'granted' : 'denied',
  });
}

function inlineScript(code: string) {
  const s = document.createElement('script');
  s.textContent = code;
  document.head.appendChild(s);
}

// Official Meta Pixel base code (https://developers.facebook.com/docs/meta-pixel/get-started).
function loadMeta() {
  if (!META_ID || window.fbq) return;
  inlineScript(`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init',${JSON.stringify(META_ID)});fbq('track','PageView');`);
}

// Official TikTok Pixel base code (https://ads.tiktok.com/help/article/standard-mode-payload-pixel).
function loadTikTok() {
  if (!TIKTOK_ID || window.ttq) return;
  inlineScript(`!function(w,d,t){w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=d.createElement("script");o.type="text/javascript",o.async=!0,o.src=r+"?sdkid="+e+"&lib="+t;var a=d.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};ttq.load(${JSON.stringify(TIKTOK_ID)});ttq.page();}(window,document,'ttq');`);
}

function apply(c: Consent | null) {
  if (!c) return;
  if (c.analytics || c.marketing) loadGa();
  updateGoogleConsent(c);
  if (c.marketing) {
    loadMeta();
    loadTikTok();
  }
}

/** Loads analytics only after consent, and tracks clicks declared with data-track attributes. */
export function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    apply(readConsent());
    const onConsent = (e: Event) => apply((e as CustomEvent<Consent>).detail);
    window.addEventListener(CONSENT_EVENT, onConsent);

    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>('a, button');
      if (!el) return;
      const declared = el.dataset.track as 'cta_click' | 'whatsapp_click' | undefined;
      const href = el.getAttribute('href') ?? '';
      if (declared) track(declared, { location: el.dataset.trackLabel });
      else if (href.includes('wa.me/')) track('whatsapp_click', { location: 'inline' });
    };
    document.addEventListener('click', onClick, { capture: true });
    return () => {
      window.removeEventListener(CONSENT_EVENT, onConsent);
      document.removeEventListener('click', onClick, { capture: true });
    };
  }, []);

  // Page views on client-side navigation (the first one is sent by config).
  useEffect(() => {
    if (GA_ID && window.gtag) window.gtag('event', 'page_view', { page_path: pathname });
    window.fbq?.('track', 'PageView');
    window.ttq?.page();
  }, [pathname]);

  return null;
}
