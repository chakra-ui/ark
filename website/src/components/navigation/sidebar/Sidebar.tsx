import { Box, Stack } from '@/panda/jsx'
import { FrameworkSelect } from './FrameworkSelect'
import { SidebarExternalLinks } from './SidebarExternalLinks'
import { SidebarItemGroup, type SidebarItemGroupProps } from './SidebarItemGroup'

type SidebarProps = {
  entries: SidebarItemGroupProps[]
}

export const Sidebar = (props: SidebarProps) => (
  <Stack gap={{ base: '12', lg: '8' }} alignItems="stretch">
    <SidebarExternalLinks />
    <FrameworkSelect />
    {props.entries.map((itemGroup, index) => (
      <SidebarItemGroup key={index} {...itemGroup} />
    ))}
    <Box minH="1px" />
  </Stack>
)
