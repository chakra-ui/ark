import { Github } from 'lucide-react'
import NextLink from 'next/link'
import { css, cx } from 'styled-system/css'
import { Flex, HStack } from 'styled-system/jsx'
import { button } from 'styled-system/recipes'
import { ColorModeButton } from '../color-mode-button'
import { Logo } from '../logo'

export const Navbar = () => (
  <nav role="navigation" className={css({ position: 'sticky', top: '0', zIndex: 'docked' })}>
    <Flex justify="center" align="center">
      <HStack
        background="bg.default"
        borderRadius="l2"
        boxShadow="xs"
        gap="10"
        justify="space-between"
        h="12"
        px="3"
        mt={{ base: '6', md: '10' }}
      >
        <NextLink href="/" aria-label="Back home">
          <Logo />
        </NextLink>
        <HStack gap="8">
          <NextLink
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
          </NextLink>
          <a
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
            rel="noreferrer"
          >
            Roadmap
          </a>
        </HStack>
        <HStack gap="1">
          <a
            aria-label="Github repository"
            href="https://github.com/chakra-ui/ark"
            className={cx(css({ px: 0 }), button({ variant: 'ghost', size: 'sm' }))}
          >
            <Github />
          </a>
          <ColorModeButton />
        </HStack>
      </HStack>
    </Flex>
  </nav>
)
