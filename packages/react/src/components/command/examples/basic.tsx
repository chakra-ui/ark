import { Command, createListCollection } from '@ark-ui/react/command'
import { CopyIcon, FilePlusIcon, FolderOpenIcon, SaveIcon, SearchIcon, SettingsIcon } from 'lucide-react'
import { useState } from 'react'
import styles from 'styles/command.module.css'

const collection = createListCollection({
  items: [
    { value: 'new-file', label: 'New file', icon: FilePlusIcon, shortcut: '⌘N' },
    { value: 'open-file', label: 'Open file', icon: FolderOpenIcon, shortcut: '⌘O' },
    { value: 'save', label: 'Save', icon: SaveIcon, shortcut: '⌘S' },
    { value: 'copy-path', label: 'Copy path', icon: CopyIcon, shortcut: '⌥⌘C' },
    { value: 'settings', label: 'Open settings', icon: SettingsIcon, shortcut: '⌘,' },
  ],
})

export const Basic = () => {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <div className="stack">
      <output>Selected: {selected ?? 'none'}</output>
      <Command.Root
        className={styles.Root}
        collection={collection}
        onSelect={(details) => setSelected(details.itemValue)}
      >
        <Command.Label className={styles.Label}>Commands</Command.Label>
        <Command.Control className={styles.Control}>
          <SearchIcon />
          <Command.Input className={styles.Input} placeholder="Type a command or search..." />
        </Command.Control>
        <Command.Context>
          {(command) => (
            <Command.List className={styles.List}>
              {command.collection.items.map((item) => (
                <Command.Item key={item.value} item={item} className={styles.Item}>
                  <span className={styles.ItemStart}>
                    <item.icon />
                    <Command.ItemText className={styles.ItemText}>{item.label}</Command.ItemText>
                  </span>
                  <kbd className={styles.Shortcut}>{item.shortcut}</kbd>
                </Command.Item>
              ))}
            </Command.List>
          )}
        </Command.Context>
        <Command.Empty className={styles.Empty}>No commands found</Command.Empty>
      </Command.Root>
    </div>
  )
}
