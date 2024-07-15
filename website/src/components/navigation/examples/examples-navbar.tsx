import type { PropsWithChildren } from 'react'
import { HStack } from 'styled-system/jsx'
import { Breadcrumbs } from '../breadcrumbs'
import { MobileSidebarContainer } from '../mobile-sidebar-container'

export const ExamplesNavbar = (props: PropsWithChildren) => {
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
      zIndex="1"
    >
      <MobileSidebarContainer {...props} />
      <Breadcrumbs />
    </HStack>
  )
}
