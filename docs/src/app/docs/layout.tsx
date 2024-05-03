import type { PropsWithChildren } from 'react'
import { Box } from 'styled-system/jsx'
import { layout } from '~/layout/docs.layout'

export default function Layout(props: PropsWithChildren) {
  const styles = layout()
  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Box>Logo</Box>
        </div>
        <div className={styles.content}>
          <Box px={{ base: '6', md: '8' }}>Content Nav</Box>
        </div>
      </header>
      <aside className={styles.aside}>
        <Box minH="lg">Sidebar</Box>
      </aside>
      <main className={styles.main}>
        <Box minH="20000px" px={{ base: '6', md: '8' }}>
          {props.children}
        </Box>
      </main>
    </>
  )
}
