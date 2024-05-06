import type { PropsWithChildren } from 'react'
import { Box } from 'styled-system/jsx'
import { Logo } from '~/components/logo'
import { Navbar } from '~/components/navigation/navbar'
import { Sidebar } from '~/components/navigation/sidebar'
import { layout } from '~/layout/docs.layout'
import { getSidebarGroups } from '~/lib/sidebar'

export default function Layout(props: PropsWithChildren) {
  const styles = layout()
  const groups = getSidebarGroups()

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
        <Sidebar groups={groups} />
      </aside>
      <main className={styles.main}>
        <Box px={{ base: '6', md: '8' }}>{props.children}</Box>
      </main>
    </>
  )
}
