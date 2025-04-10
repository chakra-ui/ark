import { SiGithub } from '@icons-pack/react-simple-icons'
import { SparklesIcon } from 'lucide-react'
import NextLink from 'next/link'
import { css } from 'styled-system/css'
import { Flex, HStack } from 'styled-system/jsx'
import { IconButton } from '~/components/ui/icon-button'
import { ColorModeButton } from '../color-mode-button'
import { Logo } from '../logo'

export const Navbar = () => (
  <nav className={css({ position: 'sticky', top: '0', zIndex: 'docked' })}>
    <Flex justify="center" align="center">
      <HStack
        background="bg.default"
        borderRadius="l2"
        boxShadow="xs"
        gap={{ base: '8', md: '10' }}
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
            href="/react/docs/overview/introduction"
            className={css({
              textStyle: 'sm',
              fontWeight: 'medium',
              color: 'fg.emphasized',
              _hover: {
                color: 'colorPalette.default',
              },
            })}
          >
            Docs
          </NextLink>
          <NextLink
            href="/react/examples"
            className={css({
              textStyle: 'sm',
              fontWeight: 'medium',
              color: 'fg.emphasized',
              _hover: {
                color: 'colorPalette.default',
              },
              display: {
                base: 'none',
                md: 'block',
              },
            })}
          >
            Examples
          </NextLink>
          <NextLink
            href="/react/plus"
            className={css({
              display: 'flex',
              alignItems: 'center',
              gap: '1.5',
              textStyle: 'sm',
              fontWeight: 'medium',
              color: 'fg.emphasized',
              whiteSpace: 'nowrap',
              _hover: {
                color: 'colorPalette.default',
              },
              '& svg': {
                width: '4',
                height: '4',
                color: 'colorPalette.default',
              },
            })}
          >
            Ark Plus <SparklesIcon />
          </NextLink>
        </HStack>
        <HStack gap="1">
          <IconButton asChild variant="ghost" hideBelow="sm">
            <a href="https://github.com/chakra-ui/ark" target="_blank" rel="noreferrer">
              <SiGithub />
            </a>
          </IconButton>
          <ColorModeButton />
        </HStack>
      </HStack>
    </Flex>
  </nav>
)
