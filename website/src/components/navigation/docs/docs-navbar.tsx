import { HStack } from 'styled-system/jsx'
import { getSidebarGroups } from '~/lib/sidebar'
import { Breadcrumbs } from './breadcrumbs'
import { MobileSidebarContainer } from './mobile-sidebar-container'
import { Sidebar } from './sidebar'

export const DocsNavbar = () => {
  const groups = getSidebarGroups()
  return (
    <HStack
      height="12"
      gap="2"
      px="4"
      borderTopWidth="1px"
      borderBottomWidth="1px"
      display={{ base: 'flex', md: 'none' }}
      position="fixed"
      left="0"
      right="0"
      top="16"
      bg="bg.canvas"
    >
      <MobileSidebarContainer>
        <Sidebar groups={groups} />
      </MobileSidebarContainer>
      <Breadcrumbs />
    </HStack>
  )
}
