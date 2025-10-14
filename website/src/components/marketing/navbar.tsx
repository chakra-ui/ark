'use client'

import { Portal, useDialog } from '@ark-ui/react'
import { SiGithub } from '@icons-pack/react-simple-icons'
import { AlignRightIcon, XIcon } from 'lucide-react'
import NextLink from 'next/link'
import { css } from 'styled-system/css'
import { Flex, HStack, Stack } from 'styled-system/jsx'
import { IconButton } from '~/components/ui/icon-button'
import { navLinks } from '~/lib/nav-links'
import { ColorModeButton } from '../color-mode-button'
import { Logo } from '../logo'
import { Dialog } from '../ui/dialog'

const navlinkStyle = css({
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
})

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
        w={{ base: 'calc(100% - 24px)', md: 'auto' }}
        mt={{ base: '6', md: '10' }}
      >
        <NextLink href="/" aria-label="Back home">
          <Logo />
        </NextLink>

        <HStack gap="8" hideBelow="sm">
          {navLinks.map((link) => (
            <NextLink key={link.href} href={link.href} className={navlinkStyle}>
              {link.label}
              {link.icon && <link.icon />}
            </NextLink>
          ))}
        </HStack>

        <HStack gap="1">
          <MobileNavbar />
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

const MobileNavbar = () => {
  const dialog = useDialog()
  return (
    <Dialog.RootProvider value={dialog}>
      <Dialog.Trigger hideFrom="sm" asChild>
        <IconButton aria-label="Open Menu" variant="ghost">
          {dialog.open ? <XIcon /> : <AlignRightIcon />}
        </IconButton>
      </Dialog.Trigger>

      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content minW="xs" p="8">
            <Stack gap="4" align="stretch">
              {navLinks.map((link) => (
                <NextLink key={link.href} href={link.href} className={navlinkStyle}>
                  {link.label}
                  {link.icon && <link.icon />}
                </NextLink>
              ))}
            </Stack>
            <Dialog.CloseTrigger position="absolute" top="2" right="2" cursor="pointer">
              <XIcon />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.RootProvider>
  )
}
