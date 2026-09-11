import { Menubar } from '@ark-ui/react/menubar'
import { Portal } from '@ark-ui/react/portal'
import { HStack } from 'styled-system/jsx'
import { Button } from '~/components/ui/button'
import { Menu } from '~/components/ui/menu'

const menus = [
  {
    label: 'File',
    items: [
      { value: 'new', label: 'New File' },
      { value: 'open', label: 'Open...' },
      { value: 'save', label: 'Save' },
    ],
  },
  {
    label: 'Edit',
    items: [
      { value: 'undo', label: 'Undo' },
      { value: 'redo', label: 'Redo' },
      { value: 'cut', label: 'Cut' },
      { value: 'copy', label: 'Copy' },
    ],
  },
  {
    label: 'View',
    items: [
      { value: 'zoom-in', label: 'Zoom In' },
      { value: 'zoom-out', label: 'Zoom Out' },
      { value: 'fullscreen', label: 'Toggle Fullscreen' },
    ],
  },
]

export const Demo = (props: Menubar.RootProps) => {
  return (
    <Menubar.Root {...props} asChild>
      <HStack gap="1" p="1" borderWidth="1px" borderRadius="l3" bg="bg.default">
        {menus.map((menu) => (
          <Menu.Root key={menu.label}>
            <Menu.Trigger asChild>
              <Button variant="ghost" size="sm">
                {menu.label}
              </Button>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content>
                  {menu.items.map((item) => (
                    <Menu.Item key={item.value} value={item.value}>
                      {item.label}
                    </Menu.Item>
                  ))}
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
        ))}
      </HStack>
    </Menubar.Root>
  )
}
