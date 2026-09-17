import NextLink from 'next/link'
import { Box, Divider, HStack, Stack } from 'styled-system/jsx'
import { ColorModeButton } from '~/components/color-mode-button'
import { Logo } from '~/components/logo'
import { UserButton } from '../auth/user-button'
import { CommandMenu } from '../command-menu'
import { Announcement } from '../marketing/annoucement'
import { FrameworkSelect } from './framework-select'
import { GitHubLink } from './github-link'
import { MobileNavbar } from './mobile-navbar'
import { MobileNavbarLinks } from './mobile-navbar-links'
import { NavbarContainer } from './navbar-container'
import { NavbarLinks } from './navbar-links'

export const Navbar = () => {
  return (
    <>
      <NavbarContainer>
        <HStack justifyContent="space-between">
          <HStack gap="4" minW="0">
            <NextLink href="/" aria-label="Go to start page">
              <Logo />
            </NextLink>
            <Box hideBelow="xl">
              <Announcement />
            </Box>
          </HStack>
          <HStack gap="3" py="1" display={{ base: 'none', md: 'flex' }}>
            <NavbarLinks me="2" />
            <Divider orientation="vertical" h="6" />
            <div id="framework-select">
              <FrameworkSelect />
            </div>
            <Divider orientation="vertical" h="6" />
            <HStack gap="2">
              <HStack gap="0">
                <CommandMenu />
                <ColorModeButton />
                <GitHubLink />
              </HStack>
              <UserButton />
            </HStack>
          </HStack>
          <HStack gap="1" py="0.5" display={{ base: 'flex', md: 'none' }}>
            <MobileNavbar>
              <Stack gap="0" width="17rem">
                <MobileNavbarLinks />
                <FrameworkSelect />
                <Divider />
                <HStack gap="3" justifyContent="center" px="3" pt="6">
                  <ColorModeButton />
                  <GitHubLink />
                  <UserButton />
                </HStack>
              </Stack>
            </MobileNavbar>
          </HStack>
        </HStack>
      </NavbarContainer>
      <Divider />
    </>
  )
}
