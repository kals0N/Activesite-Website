import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function base({ size = 20, ...props }: IconProps) {
  return { width: size, height: size, 'aria-hidden': true as const, focusable: false as const, ...props };
}

export function WhatsAppIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...base(props)}>
      <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.98L2 22l5.18-1.5A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-3.07.89.9-3-.2-.31a8.2 8.2 0 1 1 6.87 3.75Zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.55.12-.17.25-.64.8-.78.96-.14.17-.29.19-.53.06a6.7 6.7 0 0 1-3.34-2.92c-.25-.43.25-.4.72-1.33.08-.16.04-.3-.02-.43l-.74-1.8c-.2-.47-.4-.4-.55-.41h-.47a.9.9 0 0 0-.65.3 2.74 2.74 0 0 0-.86 2.04c0 1.2.88 2.37 1 2.53.12.17 1.73 2.64 4.2 3.7 1.56.68 2.17.73 2.95.62.48-.07 1.46-.6 1.67-1.18.2-.58.2-1.07.15-1.18-.06-.1-.22-.17-.47-.28Z" />
    </svg>
  );
}

export function FacebookIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...base(props)}>
      <path d="M13.5 21.9v-7.7h2.6l.4-3h-3V9.3c0-.9.3-1.5 1.5-1.5h1.6V5.1c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6v7.7a10 10 0 1 1 3.1 0Z" />
    </svg>
  );
}

export function LinkedInIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...base(props)}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13Zm1.78 13.02H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...base(props)}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** The two interlocking arcs from the Activesite logo. viewBox matches the favicon artwork. */
export const ARC_TOP =
  'M13.7083 11.4395C7.86068 11.947 4.91168 17.804 4.17268 23.0572C3.51668 18.6599 4.76368 14.3587 7.33968 11.0565C9.50798 8.27668 12.6181 6.20539 16.3277 5.37959C24.816 3.48998 33.2289 8.83948 35.1184 17.3276C35.6178 19.5711 35.2171 22.2494 33.3633 23.3897C31.7596 24.3763 27.2189 24.4714 25.3941 19.9404C23.286 14.7055 19.127 10.9691 13.7083 11.4395Z';
export const ARC_BOTTOM =
  'M25.6074 29.5015C31.455 28.994 34.404 23.137 35.143 17.8838C35.799 22.2811 34.552 26.5823 31.976 29.8845C29.8077 32.6643 26.6976 34.7356 22.988 35.5614C14.4997 37.451 6.0868 32.1015 4.1973 23.6134C3.6979 21.3699 4.0986 18.6916 5.9524 17.5513C7.5561 16.5647 12.0968 16.4696 13.9216 21.0006C16.0297 26.2355 20.1887 29.9719 25.6074 29.5015Z';

export function Mark({ size = 28, ...props }: IconProps) {
  return (
    <svg viewBox="4 5 31.5 31" width={size} height={size} aria-hidden focusable={false} {...props}>
      <path d={ARC_TOP} fill="var(--color-primary)" />
      <path d={ARC_BOTTOM} fill="var(--color-ink)" />
    </svg>
  );
}
