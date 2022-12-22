import { Navbar } from '@/components/Navbar'
import { css } from '@/panda/css'
import { PropsWithChildren } from 'react'
import '../../panda/styles.css'

const RootLayout = (props: PropsWithChildren) => (
  <html>
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
