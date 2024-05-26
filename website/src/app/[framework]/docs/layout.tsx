import type { PropsWithChildren } from 'react'
import { Divider } from 'styled-system/jsx'
import { DocsNavbar } from '~/components/navigation/docs/docs-navbar'
import { Sidebar } from '~/components/navigation/docs/sidebar'
import { getSidebarGroups } from '~/lib/sidebar'
import { layout } from './layout.recipe'

export default function Layout(props: PropsWithChildren) {
  const styles = layout()
  const groups = getSidebarGroups()

  return (
    <>
      {/* <header className={styles.header}>
        <div className={styles.logo}>
          <NextLink href="/" aria-label="Go to start page">
            <Logo />
          </NextLink>
        </div>
        <div className={styles.content}>
          <DocsNavbar />
        </div>
      </header> */}
      <DocsNavbar />
      <aside className={styles.aside}>
        <Sidebar groups={groups} />
      </aside>
      <main className={styles.main}>{props.children}</main>
    </>
  )
}
