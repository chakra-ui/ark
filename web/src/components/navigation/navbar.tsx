'use client'
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import { AiOutlineGithub, AiOutlineTwitter } from 'react-icons/ai'
import { Box, Container, HStack, styled } from 'styled-system/jsx'
import { Logo } from '~/components/logo'
import { ColorModeButton } from '../color-mode-button'
import { IconButton } from '../ui/icon-button'
import { Breadcrumbs } from './breadcrumbs'
import { Sidebar } from './sidebar'
import { MobileContainer } from './sidebar/mobile-container'

type Props = {
  framework: string
}

export const Navbar = (props: Props) => {
  const { framework } = props
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
              <IconButton asChild variant="tertiary" size="sm" aria-label="Twitter profile">
                <NextLink href="https://twitter.com/ark_ui_" target="_blank">
                  <AiOutlineTwitter />
                </NextLink>
              </IconButton>
              <IconButton asChild variant="tertiary" size="sm" aria-label="GitHub repository">
                <NextLink href="https://github.com/chakra-ui/ark" target="_blank">
                  <AiOutlineGithub />
                </NextLink>
              </IconButton>
              <ColorModeButton />
            </HStack>
          </HStack>
        </Container>
      </Box>
      {pathName !== '/' && (
        <Box borderBottomWidth="1px" display={{ base: 'block', lg: 'none' }}>
          <Container py="1">
            <HStack gap="2">
              <MobileContainer>
                <Sidebar framework={framework} />
              </MobileContainer>
              <Breadcrumbs />
            </HStack>
          </Container>
        </Box>
      )}
    </styled.nav>
  )
}
