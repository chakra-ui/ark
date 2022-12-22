import { Navbar } from '@/components/Navbar'
import { css } from '@/panda/css'
import { Container } from '@/panda/jsx'
import '../../panda/styles.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head />
      <body>
        <div className={css({ minHeight: 'full' })}>
          <Navbar />
          <Container maxW="8xl">{children}</Container>
        </div>
      </body>
    </html>
  )
}
