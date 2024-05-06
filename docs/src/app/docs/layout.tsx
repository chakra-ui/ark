import type { PropsWithChildren } from 'react'
import { Box, Divider } from 'styled-system/jsx'
import { Logo } from '~/components/logo'
import { Navbar } from '~/components/navigation/navbar'
import { Sidebar } from '~/components/navigation/sidebar'
import { getSidebarGroups } from '~/lib/sidebar'
import { layout } from './layout.recipe'

export default function Layout(props: PropsWithChildren) {
  const styles = layout()
  const groups = getSidebarGroups()

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Logo />
        </div>
        <div className={styles.divider}>
          <Box boxShadow="xs">
            <div className={styles.content}>
              <Navbar />
            </div>
          </Box>
        </div>
      </header>
      <aside className={styles.aside}>
        <Sidebar groups={groups} />
      </aside>
      <main className={styles.main}>{props.children}</main>
    </>
  )
}
