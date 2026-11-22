import { createListCollection } from '@ark-ui/react/collection'
import { Menu } from '@ark-ui/react/menu'
import { CheckIcon, ChevronDownIcon } from 'lucide-react'
import { useState } from 'react'
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
  const [checked, setChecked] = useState(['toolbar'])
  const [sortBy, setSortBy] = useState('date')

  const toggle = (value: string, isChecked: boolean) =>
    setChecked((prev) => (isChecked ? [...prev, value] : prev.filter((v) => v !== value)))

  const renderItem = (item: Item) => {
    switch (item.type) {
      case 'checkbox':
        return (
          <Menu.CheckboxItem
            className={styles.CheckboxItem}
            key={item.value}
            value={item.value}
            closeOnSelect={false}
            checked={checked.includes(item.value)}
            onCheckedChange={(isChecked) => toggle(item.value, isChecked)}
          >
            <Menu.ItemIndicator className={styles.ItemIndicator}>
              <CheckIcon />
            </Menu.ItemIndicator>
            <Menu.ItemText className={styles.ItemText}>{item.label}</Menu.ItemText>
          </Menu.CheckboxItem>
        )
      case 'radio':
        return (
          <Menu.RadioItem className={styles.RadioItem} key={item.value} value={item.value}>
            <Menu.ItemIndicator className={styles.ItemIndicator}>
              <CheckIcon />
            </Menu.ItemIndicator>
            <Menu.ItemText className={styles.ItemText}>{item.label}</Menu.ItemText>
          </Menu.RadioItem>
        )
      default:
        return (
          <Menu.Item className={styles.Item} key={item.value} value={item.value}>
            {item.label}
          </Menu.Item>
        )
    }
  }

  return (
    <Menu.Root collection={collection}>
      <Menu.Trigger className={styles.Trigger}>
        File
        <Menu.Indicator className={styles.Indicator}>
          <ChevronDownIcon />
        </Menu.Indicator>
      </Menu.Trigger>
      <Menu.Positioner className={styles.Positioner}>
        <Menu.Content className={styles.Content}>
          <Menu.List className={styles.List}>
            {collection.group().map(([group, items]) => {
              const label = <Menu.ItemGroupLabel className={styles.ItemGroupLabel}>{group}</Menu.ItemGroupLabel>

              if (items[0]?.type === 'radio') {
                return (
                  <Menu.RadioItemGroup
                    className={styles.ItemGroup}
                    key={group}
                    value={sortBy}
                    onValueChange={(details) => setSortBy(details.value)}
                  >
                    {label}
                    {items.map(renderItem)}
                  </Menu.RadioItemGroup>
                )
              }

              return (
                <Menu.ItemGroup className={styles.ItemGroup} key={group}>
                  {label}
                  {items.map(renderItem)}
                </Menu.ItemGroup>
              )
            })}
          </Menu.List>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  )
}
