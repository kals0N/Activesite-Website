import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Activesite',
    short_name: 'Activesite',
    start_url: '/',
    display: 'browser',
    background_color: '#FAF8F4',
    theme_color: '#000B30',
    icons: [
      { src: '/brand/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/brand/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}
