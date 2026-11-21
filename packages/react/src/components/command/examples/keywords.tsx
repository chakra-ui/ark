import { Command, createListCollection } from '@ark-ui/react/command'
import { SearchIcon } from 'lucide-react'
import styles from 'styles/command.module.css'

const collection = createListCollection({
  items: [
    { value: 'theme', label: 'Toggle theme', keywords: ['dark', 'light', 'appearance'] },
    { value: 'sign-out', label: 'Sign out', keywords: ['logout', 'exit'] },
    { value: 'shortcuts', label: 'Keyboard shortcuts', keywords: ['hotkeys', 'keybindings'] },
  ],
})

export const Keywords = () => (
  <Command.Root className={styles.Root} collection={collection}>
    <Command.Label className={styles.Label}>Commands</Command.Label>
    <Command.Control className={styles.Control}>
      <SearchIcon />
      <Command.Input className={styles.Input} placeholder="Try “dark” or “logout”..." />
    </Command.Control>
    <Command.Context>
      {(command) => (
        <Command.List className={styles.List}>
          {command.collection.items.map((item) => (
            <Command.Item key={item.value} item={item} className={styles.Item}>
              <Command.ItemText className={styles.ItemText}>{item.label}</Command.ItemText>
            </Command.Item>
          ))}
        </Command.List>
      )}
    </Command.Context>
    <Command.Empty className={styles.Empty}>No commands found</Command.Empty>
  </Command.Root>
)
