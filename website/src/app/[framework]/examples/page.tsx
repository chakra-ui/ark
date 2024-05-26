import NextLink from 'next/link'
import { Box, Container, Flex } from 'styled-system/jsx'
import { layout } from 'styled-system/recipes'
import { Logo } from '~/components/logo'

const styles = layout()

export default function Page() {
  return (
    <Flex>
      <aside className={styles.aside}>
        <Box py="4.5">
          <NextLink href="/" aria-label="Go to start page">
            <Logo />
          </NextLink>
        </Box>
      </aside>
      <main className={styles.main}>
        <Container>Examples</Container>
      </main>
    </Flex>
  )
}
