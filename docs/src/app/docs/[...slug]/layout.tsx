import type { PropsWithChildren } from 'react'
import { Box, Divider, Flex } from 'styled-system/jsx'
import { ColorModeButton } from '~/components/color-mode-button'
import { Logo } from '~/components/logo'
import { Prose } from '~/components/ui/prose'
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
          <Box px={{ base: '6', md: '8' }} minH="16">
            <ColorModeButton />
          </Box>
        </div>
      </header>
      <aside className={styles.aside}>
        <Box minH="lg">Sidebar</Box>
      </aside>
      <main className={styles.main}>
        <Box px={{ base: '6', md: '8' }}>{props.children}</Box>
      </main>
    </>
  )
}
