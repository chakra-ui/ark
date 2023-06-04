import { ColorModeScript } from '@/lib/ColorModeScript'
import { cx } from '@/panda/css'
import { Metadata } from 'next'
import { Fira_Code, Inter } from 'next/font/google'
import localFont from 'next/font/local'
import type { PropsWithChildren } from 'react'
import '../../panda/styles.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const firaCode = Fira_Code({ subsets: ['latin'], variable: '--font-fira-code' })

const monaSans = localFont({
  src: './mona-sans.woff2',
  display: 'swap',
  variable: '--font-mona-sans',
})

const RootLayout = (props: PropsWithChildren) => {
  return (
    <html lang="en" className={cx(inter.variable, firaCode.variable, monaSans.variable)}>
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <ColorModeScript />
        <script defer data-domain="ark-ui.com" src="https://plausible.io/js/script.js" />
      </head>
      <body>{props.children}</body>
    </html>
  )
}

export default RootLayout

export const metadata: Metadata = {
  title: {
    default: 'Ark UI',
    template: '%s | Ark UI',
  },
  icons: {
    icon: '/icon.svg',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ark-ui.com',
  },
}
