import { ColorModeScript } from '@/lib/ColorModeScript'
import { cx } from '@/panda/css'
import { Metadata } from 'next'
import { Fira_Code, Plus_Jakarta_Sans } from 'next/font/google'
import type { PropsWithChildren } from 'react'
import '../global.css'

const body = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-body' })
const firaCode = Fira_Code({ subsets: ['latin'], variable: '--font-fira-code' })

// const body = localFont({
//   src: './mona-sans.woff2',
//   display: 'swap',
//   variable: '--font-body',
// })

const RootLayout = (props: PropsWithChildren) => {
  return (
    <html lang="en" className={cx(body.variable, firaCode.variable)}>
      <head>
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
