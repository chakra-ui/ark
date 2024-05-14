import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import { Outfit, Roboto_Mono } from 'next/font/google'
import Script from 'next/script'
import type { PropsWithChildren } from 'react'
import { cx } from 'styled-system/css'
import './global.css'

const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' })
const roboto = Roboto_Mono({ subsets: ['latin'], variable: '--font-roboto-mono' })

const description =
  'A headless component library for building reusable, scalable design systems that works for a wide range of JS frameworks.'

export const metadata: Metadata = {
  metadataBase: new URL('https://ark-ui.com'),
  title: {
    default: 'Home | Ark UI',
    template: '%s | Ark UI',
  },
  description,
  keywords: ['Headless', 'Components', 'Library', 'React', 'Solid', 'Vue'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ark-ui.com',
    description,
  },
  twitter: {
    creator: '@ark_ui_',
    description,
  },
}

export default function RootLayout(props: PropsWithChildren) {
  return (
    <html lang="en" className={cx(outfit.variable, roboto.variable)} suppressHydrationWarning>
      <head>
        <Script src="https://plausible.io/js/plausible.js" data-domain="ark-ui.com" />
      </head>
      <body>
        <ThemeProvider attribute="class">{props.children}</ThemeProvider>
      </body>
    </html>
  )
}
