import NextLink from 'next/link'
import { Divider, HStack, Stack } from 'styled-system/jsx'
import { ColorModeButton } from '~/components/color-mode-button'
import { Logo } from '~/components/logo'
import { getServerContext } from '~/lib/server-context'
import { FrameworkSelect } from './framework-select'
import { GitHubLink } from './github-link'
import { MobileNavbar } from './mobile-navbar'
import { MobileNavbarLinks } from './mobile-navbar-links'
import { NavbarContainer } from './navbar-container'
import { NavbarLinks } from './navbar-links'

export const Navbar = () => {
  const { framework } = getServerContext()

  return (
    <>
      <NavbarContainer>
        <HStack justifyContent="space-between">
          <NextLink href="/" aria-label="Go to start page">
            <Logo />
          </NextLink>
          <HStack gap="3" py="1" display={{ base: 'none', md: 'flex' }}>
            <NavbarLinks framework={framework} />
            <Divider orientation="vertical" h="6" />
            <FrameworkSelect />
            <Divider orientation="vertical" h="6" />
            <HStack gap="0">
              <ColorModeButton />
              <GitHubLink />
            </HStack>
          </HStack>
          <HStack gap="3" py="0.5" display={{ base: 'flex', md: 'none' }}>
            <MobileNavbar>
              <Stack gap="0" width="17rem">
                <MobileNavbarLinks framework={framework} />
                <FrameworkSelect />
                <Divider />
                <HStack gap="0.5" justifyContent="center" px="3" pt="6">
                  <ColorModeButton />
                  <GitHubLink />
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
