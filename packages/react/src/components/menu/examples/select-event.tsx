import { Menu } from '@ark-ui/react/menu'

export const SelectEvent = () => (
  <Menu.Root onSelect={(e) => console.log('[root] selected item', e.value)}>
    <Menu.Trigger>
      Open menu <Menu.Indicator>➡️</Menu.Indicator>
    </Menu.Trigger>
    <Menu.Positioner>
      <Menu.Content>
        {items.map((item) => (
          <Menu.Item
            key={item.value}
            value={item.value}
            onSelect={() => console.log('[item] selected item', item.value)}
          >
            {item.label}
          </Menu.Item>
        ))}
      </Menu.Content>
    </Menu.Positioner>
  </Menu.Root>
)

const items = [
  { value: 'react', label: 'React' },
  { value: 'solid', label: 'Solid' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte' },
]
