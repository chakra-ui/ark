'use client'
import { IconButton } from '@/components/shared/IconButton'
import { css } from '@/panda/css'
import { Flex, HStack, panda } from '@/panda/jsx'
import Link from 'next/link'
import { RiGithubFill } from 'react-icons/ri'
import { ColorModeButton } from './ColorModeButton'
import { Logo } from './Logo'

export const Navbar = () => (
  <panda.nav role="navigation" position="sticky" top="0" zIndex={100}>
    <Flex justify="center" align="center">
      <HStack
        background="rgba(245, 245, 245, 0.6)"
        _dark={{ background: 'rgba(38, 25, 22, 0.6)' }}
        backdropFilter="blur(10px)"
        borderRadius="lg"
        boxShadow="xs"
        gap="10"
        justify="space-between"
        h="12"
        px="3"
        mt={{ base: '6', md: '10' }}
      >
        <Link href="/" aria-label="Back home">
          <Logo />
        </Link>
        <HStack gap="8">
          <Link
            href="/docs/react/overview/introduction"
            className={css({
              textStyle: 'sm',
              fontWeight: 'medium',
              color: 'fg.emphasized',
              _hover: {
                color: 'fg.default',
                fontWeight: 'semibold',
              },
            })}
          >
            Docs
          </Link>
          <Link
            href="https://ark-ui.canny.io/"
            target="_blank"
            className={css({
              textStyle: 'sm',
              fontWeight: 'medium',
              color: 'fg.emphasized',
              _hover: {
                color: 'fg.default',
                fontWeight: 'semibold',
              },
            })}
          >
            Roadmap
          </Link>
        </HStack>
        <HStack gap="1">
          <Link target="_blank" href="https://github.com/chakra-ui/ark">
            <IconButton size="sm" variant="tertiary" icon={<RiGithubFill />} aria-label="GitHub" />
          </Link>
          <ColorModeButton />
        </HStack>
      </HStack>
    </Flex>
  </panda.nav>
)
