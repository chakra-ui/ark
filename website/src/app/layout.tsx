import { Navbar } from '@/components/navigation/navbar/Navbar'
import { ColorModeScript } from '@/lib/ColorModeScript'
import { css, cx } from '@/panda/css'
import { Inter, Roboto_Mono } from '@next/font/google'
import type { PropsWithChildren } from 'react'
import '../../panda/styles.css'
// TODO use panda for styling
import '../../public/code.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const roboto = Roboto_Mono({ subsets: ['latin'], variable: '--font-roboto-mono' })

const RootLayout = (props: PropsWithChildren) => {
  return (
    <html lang="en" className={cx(inter.variable, roboto.variable)}>
      <head>
        <ColorModeScript />
        <script defer data-domain="ark-ui.com" src="https://plausible.io/js/script.js"></script>
      </head>
      <body>
        <Navbar />
        <div className={css({ minHeight: 'full' })}>{props.children}</div>
      </body>
    </html>
  )
}

export default RootLayout
