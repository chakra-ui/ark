import { ColorModeScript } from '@/lib/ColorModeScript'
import { cx } from '@/panda/css'
import { Inter, Roboto_Mono } from '@next/font/google'
import { NextSeo } from 'next-seo'
import type { PropsWithChildren } from 'react'
import '../../panda/styles.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const roboto = Roboto_Mono({ subsets: ['latin'], variable: '--font-roboto-mono' })

const RootLayout = (props: PropsWithChildren) => {
  return (
    <html lang="en" className={cx(inter.variable, roboto.variable)}>
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <ColorModeScript />
        <script defer data-domain="ark-ui.com" src="https://plausible.io/js/script.js" />
        <NextSeo useAppDir />
      </head>
      <body>{props.children}</body>
    </html>
  )
}

export default RootLayout
