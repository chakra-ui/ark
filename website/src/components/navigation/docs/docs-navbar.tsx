import { HStack } from 'styled-system/jsx'
import type { SidebarTab } from '~/lib/sidebar'
import { Breadcrumbs } from '../breadcrumbs'
import { MobileSidebarContainer } from '../mobile-sidebar-container'
import { DocsSidebar } from './docs-sidebar'
import { DocsTabBar } from './docs-tab-bar'

interface Props {
  tabs: SidebarTab[]
  latestVersion?: string
}

export const DocsNavbar = (props: Props) => {
  const { tabs, latestVersion } = props
  return (
    <HStack
      height="12"
      gap="2"
      px="4"
      borderTopWidth="1px"
      borderBottomWidth="1px"
      borderColor={{ _light: 'border.subtle', _dark: 'black' }}
      display={{ base: 'flex', md: 'none' }}
      position="fixed"
      left="0"
      right="0"
      top="16"
      bg="bg.canvas"
      zIndex="2"
    >
      <MobileSidebarContainer>
        <DocsTabBar tabs={tabs} latestVersion={latestVersion} />
        <DocsSidebar tabs={tabs} />
      </MobileSidebarContainer>
      <Breadcrumbs tabs={tabs} />
    </HStack>
  )
}
