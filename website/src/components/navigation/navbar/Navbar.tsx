import { css } from '@/panda/css'
import { Container, Flex, HStack } from '@/panda/jsx'
import Link from 'next/link'
import { ColorModeButton } from './ColorModeButton'
import { Logo } from './Logo'

export const Navbar = () => (
  <nav role="navigation">
    <Container pt="10">
      <Flex justify="center" align="center">
        <HStack
          gap="12"
          background="rgba(0, 0, 0, 0.05)"
          _dark={{ background: 'rgba(255, 255, 255, 0.05)' }}
          borderRadius="lg"
          minH="12"
          px="7"
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
  </nav>
)
