import { SidebarButton } from '@/components/navigation/sidebar/SidebarButton'
import { Text } from '@/components/shared/Text'
import { css } from '@/panda/css'
import { Box, Container, HStack } from '@/panda/jsx'
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
        <SidebarButton />
        <Link href="/" aria-label="Back home" className={css({ mr: 'auto' })}>
          <HStack color="fg.emphasized">
            <Logo />
            <Text textStyle="lg" fontWeight="semibold" whiteSpace="nowrap">
              Ark UI
            </Text>
          </HStack>
        </Link>
        {/* @ts-expect-error */}
        <Box
          bg="bg.subtle"
          borderWidth="1px"
          h="9"
          width="320px"
          borderRadius="sm"
          display={{ base: 'none' }}
        />
        <ColorModeButton />
      </HStack>
    </Container>
  </nav>
)
