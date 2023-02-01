import { Stack } from '@/panda/jsx'
import { SidebarExternalLinks } from './SidebarExternalLinks'
import { SidebarItemGroup, type SidebarItemGroupProps } from './SidebarItemGroup'

type SidebarProps = {
  entries: SidebarItemGroupProps[]
}

export const Sidebar = (props: SidebarProps) => (
  <Stack gap={{ base: '12', lg: '8' }}>
    <SidebarExternalLinks />
    {props.entries.map((itemGroup, index) => (
      <SidebarItemGroup key={index} {...itemGroup} />
    ))}
  </Stack>
)
