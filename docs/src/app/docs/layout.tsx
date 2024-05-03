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
        <Box px={{ base: '6', md: '8' }}>
          <Flex justifyContent="center" pt="12" mx="auto" width="100%">
            <Box mx="auto" maxW="688px" width="full" minH="lg">
              <Prose css={{ maxWidth: 'full', '&> :first-child': { mt: '0' } }}>
                {props.children}
              </Prose>
            </Box>

            <Box
              flexGrow="1"
              ps="8"
              width="full"
              maxW="256px"
              minH="lg"
              display={{ base: 'none', xl: 'block' }}
            >
              Toc
            </Box>
          </Flex>
        </Box>
      </main>
    </>
  )
}
