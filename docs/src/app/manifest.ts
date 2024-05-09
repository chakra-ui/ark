import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Ark UI',
    short_name: 'Ark UI',
    description:
      'A headless component library for building reusable, scalable design systems that works for a wide range of JS frameworks.',
    start_url: '/',
    display: 'standalone',
    icons: [
      {
        src: '/icon-192.png',
        type: 'image/png',
        sizes: '192x192',
      },
      {
        src: '/icon-512.png',
        type: 'image/png',
        sizes: '512x512',
      },
    ],
  }
}
