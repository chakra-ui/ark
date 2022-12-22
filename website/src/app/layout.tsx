import { Navbar } from '@/components/Navbar'
import { css, cx } from '@/panda/css'
import { Inter, Roboto_Mono } from '@next/font/google'
import { PropsWithChildren } from 'react'
import '../../panda/styles.css'
// TODO use panda for styling
import '../../public/code.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const roboto = Roboto_Mono({ subsets: ['latin'], variable: '--font-roboto-mono' })

const RootLayout = (props: PropsWithChildren) => (
  <html lang="en" className={cx(inter.variable, roboto.variable)}>
    <head />
    <body>
      <div className={css({ minHeight: 'full' })}>
        <Navbar />
        {props.children}
      </div>
    </body>
  </html>
)

export default RootLayout
