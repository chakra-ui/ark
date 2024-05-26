import { HStack } from 'styled-system/jsx'
import { getSidebarGroups } from '~/lib/sidebar'
import { Breadcrumbs } from './breadcrumbs'
import { MobileSidebarContainer } from './mobile-sidebar-container'
import { Sidebar } from './sidebar'

export const DocsNavbar = () => {
  const groups = getSidebarGroups()
  return (
    <HStack gap="2" py="1.5" px="4" borderBottomWidth="1px" display={{ base: 'flex', md: 'none' }}>
      <MobileSidebarContainer>
        <Sidebar groups={groups} />
      </MobileSidebarContainer>
      <Breadcrumbs />
    </HStack>
  )
}
