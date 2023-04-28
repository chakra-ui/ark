import type { NextSeoProps } from 'next-seo'

const title = 'Ark UI'
const description = 'Universal headless UI components for the web'
const url = 'https://ark-ui.com'

// For more information, visit https://github.com/garmeeh/next-seo/blob/HEAD/APP_DIRECTORY.md#2-do-you-want-default-meta
export const config: NextSeoProps = {
  title,
  titleTemplate: '%s | Ark UI',
  description,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url,
    title,
    description,
    siteName: title,
  },
  themeColor: '#eb5e41',
  additionalLinkTags: [
    {
      rel: 'manifest',
      href: '/site.webmanifest',
    },
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico',
    },
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: '/favicon.svg',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: '/apple-touch-icon.png',
    },
    {
      rel: 'mask-icon',
      href: '/favicon.svg',
      color: '#563fd8',
    },
  ],
  additionalMetaTags: [
    {
      name: 'msapplication-TileColor',
      content: '#563fd8',
    },
  ],
}
