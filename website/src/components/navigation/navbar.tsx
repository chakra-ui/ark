import { SiGithub } from '@icons-pack/react-simple-icons'
import NextLink from 'next/link'
import { Divider, Flex, HStack } from 'styled-system/jsx'
import { ColorModeButton } from '~/components/color-mode-button'
import { FrameworkSelect } from '~/components/framework-select'
import { Logo } from '~/components/logo'
import { IconButton } from '~/components/ui'
import { getServerContext } from '~/lib/server-context'
import { NavbarContainer } from './navbar-container'

export const Navbar = () => {
  const serverContext = getServerContext()
  const framework = serverContext.framework ?? 'react'
  return (
    <>
      <NavbarContainer>
        <HStack justifyContent="space-between">
          <NextLink href="/" aria-label="Go to start page">
            <Logo />
          </NextLink>
          <Flex alignItems="center" py="0.5">
            {/* <HStack gap="6">
            <NextLink href={`/${framework}/docs/overview/introduction`}>
              <Text textStyle="sm" fontWeight="medium" color="accent.default">
                Docs
              </Text>
            </NextLink>
            <NextLink href={`/${framework}/showcase`}>
              <Text textStyle="sm" fontWeight="medium" color="fg.muted">
                Showcase
              </Text>
            </NextLink>
            <NextLink href={`/${framework}/examples`}>
              <Text textStyle="sm" fontWeight="medium" color="fg.muted">
                Examples
              </Text>
            </NextLink>
          </HStack>
          <Divider orientation="vertical" h="6" ms="5" me="4" /> */}
            <FrameworkSelect />
            <Divider orientation="vertical" h="6" ms="3" me="3" />
            <HStack gap="0">
              <ColorModeButton />
              <IconButton asChild variant="ghost">
                <a href="https://github.com/chakra-ui/ark" target="_blank" rel="noreferrer">
                  <SiGithub />
                </a>
              </IconButton>
            </HStack>
          </Flex>
          {/* <Flex py="2.5" display={{ base: 'flex', md: 'none' }}>
            <MobileNavbar />
          </Flex> */}
        </HStack>
      </NavbarContainer>
      <Divider />
    </>
  )
}
