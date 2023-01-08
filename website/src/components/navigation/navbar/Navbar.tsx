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
      <HStack justify="space-between" flex="1">
        <Link href="/" aria-label="Back home">
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
