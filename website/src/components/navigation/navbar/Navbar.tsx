import { css } from '@/panda/css'
import { Container, Flex, HStack, panda } from '@/panda/jsx'
import Link from 'next/link'
import { ColorModeButton } from './ColorModeButton'
import { Logo } from './Logo'

export const Navbar = () => (
  <panda.nav role="navigation" position="sticky" top="0" zIndex={100}>
    <Container pt={{ base: '4', md: '10' }}>
      <Flex justify="center" align="center">
        <HStack
          gap="12"
          background="rgba(245, 245, 245, 0.6)"
          _dark={{ background: 'rgba(38, 25, 22, 0.6)' }}
          backdropFilter="blur(10px)"
          borderRadius="lg"
          boxShadow="xs"
          minH="12"
          px="7"
          width={{ base: 'full', sm: 'auto' }}
        >
          <Link href="/" aria-label="Back home">
            <Logo />
          </Link>
          <HStack gap="10">
            <Link
              href="/docs/react/overview/introduction"
              className={css({ textStyle: 'sm', fontWeight: 'medium', color: 'fg.emphasized' })}
            >
              Docs
            </Link>
            <Link
              href="/docs/roadmap"
              className={css({ textStyle: 'sm', fontWeight: 'medium', color: 'fg.emphasized' })}
            >
              Roadmap
            </Link>
          </HStack>
          <HStack gap="3">
            <ColorModeButton />
            <ColorModeButton />
          </HStack>
        </HStack>
      </Flex>
    </Container>
  </panda.nav>
)
