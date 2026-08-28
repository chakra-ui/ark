'use client'

import { Portal, useDialog } from '@ark-ui/react'
import { SiGithub } from '@icons-pack/react-simple-icons'
import { AlignRightIcon, XIcon } from 'lucide-react'
import NextLink from 'next/link'
import { css } from 'styled-system/css'
import { Container, Grid, HStack, Stack } from 'styled-system/jsx'
import { CommandMenu, CommandMenuSearchTrigger } from '~/components/command-menu'
import { MobileNavbarLinks } from '~/components/navigation/mobile-navbar-links'
import { NavbarLinks } from '~/components/navigation/navbar-links'
import { IconButton } from '~/components/ui/icon-button'
import { ColorModeButton } from '../color-mode-button'
import { Logo } from '../logo'
import { Dialog } from '../ui/dialog'

export const NavbarContent = () => (
  <nav className={css({ position: 'relative', zIndex: 'docked' })}>
    <Container pt={{ base: '4', md: '6' }}>
      <Grid
        alignItems="center"
        h="12"
        w="full"
        columnGap="6"
        gridTemplateColumns={{ base: '1fr auto', md: '1fr auto 1fr' }}
      >
        <NextLink href="/" aria-label="Back home" className={css({ justifySelf: 'start' })}>
          <Logo />
        </NextLink>

        <HStack hideBelow="md">
          <NavbarLinks gap="8" />
        </HStack>

        <HStack gap="1" justifySelf="end">
          <MobileNavbar />
          <HStack gap="0">
            <CommandMenu trigger={<CommandMenuSearchTrigger />} />
            <IconButton asChild variant="ghost" hideBelow="md">
              <a href="https://github.com/chakra-ui/ark" target="_blank" rel="noreferrer">
                <SiGithub />
              </a>
            </IconButton>
            <ColorModeButton />
          </HStack>
        </HStack>
      </Grid>
    </Container>
  </nav>
)

const MobileNavbar = () => {
  const dialog = useDialog()
  return (
    <Dialog.RootProvider value={dialog}>
      <Dialog.Trigger hideFrom="md" asChild>
        <IconButton aria-label="Open Menu" variant="ghost">
          {dialog.open ? <XIcon /> : <AlignRightIcon />}
        </IconButton>
      </Dialog.Trigger>

      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content minW="xs" p="8">
            <Stack gap="0" align="stretch">
              <MobileNavbarLinks />
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
