import NextLink from 'next/link'
import { Divider, HStack, Stack } from 'styled-system/jsx'
import { ColorModeButton } from '~/components/color-mode-button'
import { Logo } from '~/components/logo'
import { getFramework } from '~/lib/frameworks'
import { data } from '~/lib/search'
import { UserButton } from '../auth/user-button'
import { CommandMenu } from '../command-menu'
import { FrameworkSelect } from './framework-select'
import { GitHubLink } from './github-link'
import { MobileNavbar } from './mobile-navbar'
import { MobileNavbarLinks } from './mobile-navbar-links'
import { NavbarContainer } from './navbar-container'
import { NavbarLinks } from './navbar-links'

export const Navbar = async () => {
  const framework = await getFramework()

  return (
    <>
      <NavbarContainer>
        <HStack justifyContent="space-between">
          <NextLink href="/" aria-label="Go to start page">
            <Logo />
          </NextLink>
          <HStack gap="3" py="1" display={{ base: 'none', md: 'flex' }}>
            <NavbarLinks />
            <Divider orientation="vertical" h="6" />
            <div id="framework-select">
              <FrameworkSelect framework={framework} />
            </div>
            <Divider orientation="vertical" h="6" />
            <HStack gap="2">
              <HStack gap="0">
                <CommandMenu data={data} />
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
                <FrameworkSelect framework={framework} />
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
