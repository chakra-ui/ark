import { Menu } from '@ark-ui/solid/menu'
import { For } from 'solid-js'

export const SelectEvent = () => (
  <Menu.Root onSelect={(e) => console.log('[root] selected item', e.value)}>
    <Menu.Trigger>
      Open menu <Menu.Indicator>➡️</Menu.Indicator>
    </Menu.Trigger>
    <Menu.Positioner>
      <Menu.Content>
        <For each={items}>
          {(item) => (
            <Menu.Item value={item.value} onSelect={() => console.log('[item] selected item', item.value)}>
              {item.label}
            </Menu.Item>
          )}
        </For>
      </Menu.Content>
    </Menu.Positioner>
  </Menu.Root>
)

const items = [
  { value: 'react', label: 'React' },
  { value: 'solid', label: 'Solid' },
  { value: 'vue', label: 'Vue' },
]
