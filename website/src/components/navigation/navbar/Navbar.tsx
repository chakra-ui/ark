import { GitHubStats } from '@/components/navigation/navbar/GitHubStats'
import { Text } from '@/components/shared/Text'
import { css } from '@/panda/css'
import { Container, HStack } from '@/panda/jsx'
import Link from 'next/link'
import { ColorModeButton } from './ColorModeButton'
import { Logo } from './Logo'

export const Navbar = () => (
  <nav
    role="navigation"
    className={css({
      position: 'sticky',
      top: '0',
      background: 'bg.canvas',
      borderBottomWidth: '1px',
      zIndex: '100',
      minH: '18',
      display: 'flex',
      alignItems: 'stretch',
    })}
  >
    <Container display="flex">
      <HStack flex="1">
        <Link href="/" aria-label="Back home" className={css({ mr: 'auto' })}>
          <HStack color="fg.emphasized">
            <Logo />
            <Text textStyle="lg" fontWeight="semibold" whiteSpace="nowrap">
              Ark UI
            </Text>
          </HStack>
        </Link>

        {/* @ts-expect-error Server Component */}
        <GitHubStats repo="chakra-ui/ark" />
        <ColorModeButton />
      </HStack>
    </Container>
  </nav>
)
