import NextLink from 'next/link'
import { css } from 'styled-system/css'

export default function Home() {
  return (
    <main>
      <div className={css({ fontSize: '2xl', fontWeight: 'bold', color: 'fg.muted' })}>
        Hello 🐼!
      </div>
      <NextLink href="/docs/components/accordion">Accordion</NextLink>
    </main>
  )
}
