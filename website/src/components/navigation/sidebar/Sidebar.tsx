import { Box, Stack } from '@/panda/jsx'
import { FrameworkSelect } from './FrameworkSelect'
import { SidebarExternalLinks } from './SidebarExternalLinks'
import { SidebarItemGroup, type SidebarItemGroupProps } from './SidebarItemGroup'

type SidebarProps = {
  entries: SidebarItemGroupProps[]
  isMobile?: boolean
}

export const Sidebar = (props: SidebarProps) => (
  <Stack gap={{ base: '12', lg: '8' }} alignItems="stretch">
    <SidebarExternalLinks />
    <FrameworkSelect noPortal={props.isMobile} />
    {props.entries.map((itemGroup, index) => (
      <SidebarItemGroup key={index} {...itemGroup} />
    ))}
    <Box minH="1px" />
  </Stack>
)
