import type { NextSeoProps } from 'next-seo'

const title = 'Ark UI'
const description = 'Universal headless UI components for the web'
const url = 'https://ark-ui.com'

// For more information, visit https://github.com/garmeeh/next-seo/blob/HEAD/APP_DIRECTORY.md#2-do-you-want-default-meta
export const config: NextSeoProps = {
  title,
  description,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url,
    title,
    description,
    siteName: title,
  },
}
