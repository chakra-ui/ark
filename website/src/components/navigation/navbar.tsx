import { SiGithub } from '@icons-pack/react-simple-icons'
import { MessageCircleIcon, SendIcon } from 'lucide-react'
import { CheckIcon, ChevronDownIcon } from 'lucide-react'
import NextLink from 'next/link'
import { Box, Divider, Flex, HStack } from 'styled-system/jsx'
import { ColorModeButton } from '~/components/color-mode-button'
import { getSidebarGroups } from '~/lib/sidebar'
import { FrameworkSelect } from '../framework-select'
import { Logo } from '../logo'
import { Icon, IconButton, Text } from '../ui'
import { Breadcrumbs } from './breadcrumbs'
import { MobileSidebarContainer } from './mobile-sidebar-container'
import { Sidebar } from './sidebar'

export const Navbar = () => {
  const groups = getSidebarGroups()
  return (
    <>
      <HStack justifyContent="space-between" h="16" px={{ base: '4', md: '8' }}>
        <Box>
          <Box display={{ md: 'none' }}>
            <NextLink href="/" aria-label="Go to start page">
              <Logo />
            </NextLink>
          </Box>
        </Box>

        <Flex alignItems="center">
          <HStack gap="6">
            <Text textStyle="sm" fontWeight="medium" color="accent.default">
              Docs
            </Text>
            <NextLink href="/showcase">
              <Text textStyle="sm" fontWeight="medium" color="fg.muted">
                Showcase
              </Text>
            </NextLink>
            <NextLink href="/showcase">
              <Text textStyle="sm" fontWeight="medium" color="fg.muted">
                Examples
              </Text>
            </NextLink>
          </HStack>
          <Divider orientation="vertical" h="6" ms="5" me="4" />
          <FrameworkSelect />
          <Divider orientation="vertical" h="6" ms="4" me="2" />
          <HStack gap="0.5">
            <ColorModeButton />
            <IconButton asChild variant="link" color="fg.muted" width="8">
              <a href="https://github.com/chakra-ui/ark" target="_blank" rel="noreferrer">
                <SiGithub />
              </a>
            </IconButton>
          </HStack>
        </Flex>
      </HStack>
      <Divider display={{ base: 'block', md: 'none' }} />
      <Box display={{ base: 'block', md: 'none' }} minH="11">
        <HStack gap="2" py="1.5" px="4">
          <MobileSidebarContainer>
            <Sidebar groups={groups} />
          </MobileSidebarContainer>
          <Breadcrumbs />
        </HStack>
      </Box>
    </>
  )
}
