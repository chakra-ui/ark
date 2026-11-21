import { Command, createListCollection } from '@ark-ui/react/command'
import { SearchIcon } from 'lucide-react'
import styles from 'styles/command.module.css'

const collection = createListCollection({
  items: [
    { value: 'calendar', label: 'Calendar', group: 'Suggestions' },
    { value: 'emoji', label: 'Search emoji', group: 'Suggestions' },
    { value: 'calculator', label: 'Calculator', group: 'Suggestions', disabled: true },
    { value: 'profile', label: 'Profile', group: 'Settings' },
    { value: 'billing', label: 'Billing', group: 'Settings' },
    { value: 'preferences', label: 'Preferences', group: 'Settings' },
  ],
  groupBy: (item) => item.group,
})

export const Groups = () => (
  <Command.Root className={styles.Root} collection={collection}>
    <Command.Label className={styles.Label}>Commands</Command.Label>
    <Command.Control className={styles.Control}>
      <SearchIcon />
      <Command.Input className={styles.Input} placeholder="Search..." />
    </Command.Control>
    <Command.Context>
      {(command) => (
        <Command.List className={styles.List}>
          {command.collection.group().map(([group, items]) => (
            <Command.ItemGroup key={group} className={styles.ItemGroup}>
              <Command.ItemGroupLabel className={styles.ItemGroupLabel}>{group}</Command.ItemGroupLabel>
              {items.map((item) => (
                <Command.Item key={item.value} item={item} className={styles.Item}>
                  <Command.ItemText className={styles.ItemText}>{item.label}</Command.ItemText>
                </Command.Item>
              ))}
            </Command.ItemGroup>
          ))}
        </Command.List>
      )}
    </Command.Context>
    <Command.Empty className={styles.Empty}>No results found</Command.Empty>
  </Command.Root>
)
