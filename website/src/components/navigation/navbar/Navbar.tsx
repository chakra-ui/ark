import { GitHubStats } from '@/components/navigation/navbar/GitHubStats'
import { Text } from '@/components/shared/Text'
import { css } from '@/panda/css'
import { Container, HStack } from '@/panda/jsx'
import Link from 'next/link'
import { ColorModeButton } from './ColorModeButton'
import { Logo } from './Logo'
import { MobileNavbar } from './MobileNavbar'

export const Navbar = () => (
  <nav
    role="navigation"
    className={css({
      position: 'sticky',
      top: '0',
      background: 'bg.canvas',
      zIndex: '100',
    })}
  >
    <Container>
      <HStack flex="1" minH={{ base: '16', md: '18' }}>
        <Link href="/" aria-label="Back home" className={css({ mr: 'auto' })}>
          <HStack color="fg.emphasized">
            <Logo />
            <Text textStyle="lg" fontWeight="semibold" whiteSpace="nowrap">
              Ark UI
            </Text>
          </HStack>
        </Link>
        <HStack gap={{ base: '1', lg: '12' }}>
          {/* @ts-expect-error Server Component */}
          <GitHubStats />
          <ColorModeButton />
        </HStack>
      </HStack>
    </Container>
    <hr />
    <MobileNavbar />
  </nav>
)
