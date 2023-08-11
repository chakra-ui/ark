'use client'
import NextLink from 'next/link'
import { AiOutlineGithub } from 'react-icons/ai'
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
        <NextLink href="/" aria-label="Go to start page">
          <Logo />
        </NextLink>
        <HStack gap="8">
          <NextLink href="/docs/react/overview/introduction">Docs</NextLink>
          <NextLink href="https://ark-ui.canny.io/" target="_blank">
            Roadmap
          </NextLink>
        </HStack>
        <HStack gap="1">
          <IconButton asChild variant="tertiary" size="sm" aria-label="GitHub repository">
            <NextLink href="https://github.com/chakra-ui/ark" target="_blank">
              <AiOutlineGithub />
            </NextLink>
          </IconButton>
          <ColorModeButton />
        </HStack>
      </HStack>
    </Flex>
  </styled.nav>
)
