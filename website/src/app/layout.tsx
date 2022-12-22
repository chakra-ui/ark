import { Navbar } from '@/components/Navbar'
import { css } from '@/panda/css'
import { Inter } from '@next/font/google'
import { PropsWithChildren } from 'react'
import '../../panda/styles.css'
// TODO use panda for styling
import '../../public/code.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

const RootLayout = (props: PropsWithChildren) => (
  <html lang="en" className={inter.className}>
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
