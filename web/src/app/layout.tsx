import type { Metadata } from 'next'
import { Fira_Code, Inter } from 'next/font/google'
import { type PropsWithChildren } from 'react'
import { cx } from 'styled-system/css/cx'
import { colorModeLocalStorageKey } from '~/lib/use-color-mode'
import './global.css'

const body = Inter({ subsets: ['latin'], variable: '--font-body' })
const code = Fira_Code({ subsets: ['latin'], variable: '--font-code' })

const RootLayout = (props: PropsWithChildren) => {
  const { children } = props
  return (
    <html lang="en">
      <head>
        <ColorModeScript />
      </head>
      <body className={cx(body.variable, code.variable)}>{children}</body>
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

const ColorModeScript = () => {
  const colorModeScript =
    // language=javascript
    `if (JSON.parse(window.localStorage.getItem('${colorModeLocalStorageKey}')) === 'dark') {
    document.documentElement.classList.add('dark')
  }`
  return <script dangerouslySetInnerHTML={{ __html: colorModeScript }} />
}
