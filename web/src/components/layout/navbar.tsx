'use client'
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import { AiOutlineGithub, AiOutlineTwitter } from 'react-icons/ai'
import { css, cx } from 'styled-system/css'
import { Box, Container, HStack, styled } from 'styled-system/jsx'
import { button } from 'styled-system/recipes'
import { Logo } from '~/components/logo'
import { ColorModeButton } from '../color-mode-button'
import { MobileNavbar } from './mobile-navbar'
import { MobileSidebarContainer } from './mobile-sidebar-container'
import { Sidebar } from './sidebar'

export const Navbar = () => {
  const pathName = usePathname()

  return (
    <styled.nav role="navigation" position="sticky" top="0" zIndex="sticky" bg="bg.default">
      <Box borderBottomWidth="1px" position="relative">
        <Container py="4">
          <HStack justify="space-between" gap="8">
            <HStack gap="10">
              <NextLink href="/">
                <Logo />
              </NextLink>
            </HStack>
            <HStack gap="0.5">
              <NextLink
                href="https://twitter.com/grizzly_codes"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter profile"
                className={cx(
                  button({ variant: 'tertiary', size: 'sm' }),
                  css({ px: '0', color: 'fg.mtued' }),
                )}
              >
                <AiOutlineTwitter />
              </NextLink>
              <NextLink
                href="https://github.com/cschroeter/park-ui"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub repository"
                className={cx(
                  button({ variant: 'tertiary', size: 'sm' }),
                  css({ px: '0', color: 'fg.mtued' }),
                )}
              >
                <AiOutlineGithub />
              </NextLink>
              <ColorModeButton />
            </HStack>
          </HStack>
        </Container>
      </Box>
      {pathName !== '/' && (
        <MobileNavbar>
          <MobileSidebarContainer>
            <Sidebar />
          </MobileSidebarContainer>
        </MobileNavbar>
      )}
    </styled.nav>
  )
}
