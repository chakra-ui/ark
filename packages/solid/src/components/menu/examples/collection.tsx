import { createListCollection } from '@ark-ui/solid/collection'
import { Menu } from '@ark-ui/solid/menu'
import { CheckIcon, ChevronDownIcon } from 'lucide-solid'
import { For, createSignal } from 'solid-js'
import styles from 'styles/menu.module.css'

interface Item {
  value: string
  label: string
  group: string
  type?: 'checkbox' | 'radio'
}

const collection = createListCollection<Item>({
  items: [
    { value: 'new-file', label: 'New file', group: 'File' },
    { value: 'open-file', label: 'Open file', group: 'File' },
    { value: 'toolbar', label: 'Show toolbar', group: 'View', type: 'checkbox' },
    { value: 'status-bar', label: 'Show status bar', group: 'View', type: 'checkbox' },
    { value: 'name', label: 'Name', group: 'Sort by', type: 'radio' },
    { value: 'date', label: 'Date modified', group: 'Sort by', type: 'radio' },
  ],
  groupBy: (item) => item.group,
  groupSort: ['File', 'View', 'Sort by'],
})

export const Collection = () => {
  const [checked, setChecked] = createSignal(['toolbar'])
  const [sortBy, setSortBy] = createSignal('date')

  const toggle = (value: string, isChecked: boolean) =>
    setChecked((prev) => (isChecked ? [...prev, value] : prev.filter((v) => v !== value)))

  const renderItem = (item: Item) => {
    switch (item.type) {
      case 'checkbox':
        return (
          <Menu.CheckboxItem
            class={styles.CheckboxItem}
            value={item.value}
            closeOnSelect={false}
            checked={checked().includes(item.value)}
            onCheckedChange={(isChecked) => toggle(item.value, isChecked)}
          >
            <Menu.ItemIndicator class={styles.ItemIndicator}>
              <CheckIcon />
            </Menu.ItemIndicator>
            <Menu.ItemText class={styles.ItemText}>{item.label}</Menu.ItemText>
          </Menu.CheckboxItem>
        )
      case 'radio':
        return (
          <Menu.RadioItem class={styles.RadioItem} value={item.value}>
            <Menu.ItemIndicator class={styles.ItemIndicator}>
              <CheckIcon />
            </Menu.ItemIndicator>
            <Menu.ItemText class={styles.ItemText}>{item.label}</Menu.ItemText>
          </Menu.RadioItem>
        )
      default:
        return (
          <Menu.Item class={styles.Item} value={item.value}>
            {item.label}
          </Menu.Item>
        )
    }
  }

  return (
    <Menu.Root collection={collection}>
      <Menu.Trigger class={styles.Trigger}>
        File
        <Menu.Indicator class={styles.Indicator}>
          <ChevronDownIcon />
        </Menu.Indicator>
      </Menu.Trigger>
      <Menu.Positioner class={styles.Positioner}>
        <Menu.Content class={styles.Content}>
          <Menu.List class={styles.List}>
            <For each={collection.group()}>
              {([group, items]) => {
                if (items[0]?.type === 'radio') {
                  return (
                    <Menu.RadioItemGroup
                      class={styles.ItemGroup}
                      value={sortBy()}
                      onValueChange={(details) => setSortBy(details.value)}
                    >
                      <Menu.ItemGroupLabel class={styles.ItemGroupLabel}>{group}</Menu.ItemGroupLabel>
                      <For each={items}>{renderItem}</For>
                    </Menu.RadioItemGroup>
                  )
                }

                return (
                  <Menu.ItemGroup class={styles.ItemGroup}>
                    <Menu.ItemGroupLabel class={styles.ItemGroupLabel}>{group}</Menu.ItemGroupLabel>
                    <For each={items}>{renderItem}</For>
                  </Menu.ItemGroup>
                )
              }}
            </For>
          </Menu.List>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  )
}
