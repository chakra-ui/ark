import type { PropsWithChildren } from 'react'
import { Box } from 'styled-system/jsx'
import { Logo } from '~/components/logo'
import { Navbar } from '~/components/navigation/navbar'
import { Sidebar } from '~/components/navigation/sidebar'
import { layout } from '~/layout/docs.layout'

export default function Layout(props: PropsWithChildren) {
  const styles = layout()
  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Logo />
        </div>
        <div className={styles.content}>
          <Navbar />
        </div>
      </header>
      <aside className={styles.aside}>
        <Sidebar
          groups={[
            {
              name: 'Overview',
              items: [
                { name: 'Introduction', href: '/docs/overview/introduction' },
                { name: 'Getting Started', href: '/docs/overview/getting-started' },
              ],
            },
            {
              name: 'Components',
              items: [
                { name: 'Accordion', href: '/docs/components/accordion' },
                { name: 'Avatar', href: '/docs/components/avatar' },
                { name: 'Clipboard', href: '/docs/components/clipboard' },
              ],
            },
          ]}
          pathname="/"
        />
      </aside>
      <main className={styles.main}>
        <Box px={{ base: '6', md: '8' }}>{props.children}</Box>
      </main>
    </>
  )
}
