'use client'
import Link from 'next/link'
import { RiGithubFill } from 'react-icons/ri'
import { Flex, HStack, styled } from 'styled-system/jsx'
import { ColorModeButton } from '~/components/color-mode-button'
import { Logo } from '~/components/logo'
import { IconButton } from '~/components/ui/icon-button'

export const Navbar = () => (
  <styled.nav role="navigation" position="sticky" top="0" zIndex="docked">
    <Flex justify="center" align="center">
      <HStack
        borderRadius="sm"
        background="bg.default"
        boxShadow="xs"
        gap="10"
        justify="space-between"
        h="12"
        px="3"
        mt={{ base: '6', md: '10' }}
      >
        <Link href="/" aria-label="Go to start page">
          <Logo />
        </Link>
        <HStack gap="8">
          <Link href="/docs/react/overview/introduction">Docs</Link>
          <Link href="https://ark-ui.canny.io/" target="_blank">
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
  </styled.nav>
)
