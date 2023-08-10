import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { type PropsWithChildren } from 'react'

const inter = Inter({ subsets: ['latin'] })

const RootLayout = (props: PropsWithChildren) => {
  const { children } = props
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

export default RootLayout

export const metadata: Metadata = {
  title: {
    default: 'Ark UI',
    template: '%s | Ark UI',
  },
  description:
    'A headless component library for building reusable, scalable design systems that works for a wide range of JS frameworks.',
  manifest: '/site.webmanifest',
  keywords: ['Headless', 'Components', 'React', 'Solid', 'Vue'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ark-ui.com',
    description:
      'A headless component library for building reusable, scalable design systems that works for a wide range of JS frameworks.',
  },
  twitter: {
    creator: '@ark_ui_',
  },
}
