import { SiGithub } from '@icons-pack/react-simple-icons'
import { Box, Divider, HStack } from 'styled-system/jsx'
import { ColorModeButton } from '~/components/color-mode-button'
import { getSidebarGroups } from '~/lib/sidebar'
import { FrameworkSelect } from '../framework-select'
import { Logo } from '../logo'
import { IconButton } from '../ui'
import { Breadcrumbs } from './breadcrumbs'
import { MobileSidebarContainer } from './mobile-sidebar-container'
import { Sidebar } from './sidebar'

export const Navbar = () => {
  const groups = getSidebarGroups()
  return (
    <>
      <HStack justifyContent="space-between" h="16" px={{ base: '4', md: '8' }}>
        <Box>
          <Logo display={{ md: 'none' }} />
        </Box>
        <HStack gap="3">
          <FrameworkSelect />
          <Divider orientation="vertical" h="6" />
          <HStack gap="1">
            <ColorModeButton />
            <IconButton asChild variant="ghost">
              <a href="https://github.com/chakra-ui/ark" target="_blank" rel="noreferrer">
                <SiGithub />
              </a>
            </IconButton>
          </HStack>
        </HStack>
      </HStack>
      <Divider display={{ base: 'block', md: 'none' }} />
      <Box
        display={{ base: 'block', md: 'none' }}
        bg="bg.default"
        minH="11"
        borderBottomWidth="1px"
      >
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
