import { Command, createListCollection, useCommand } from '@ark-ui/react/command'
import { SearchIcon } from 'lucide-react'
import button from 'styles/button.module.css'
import styles from 'styles/command.module.css'

const collection = createListCollection({
  items: [
    { value: 'new-file', label: 'New file' },
    { value: 'open-file', label: 'Open file' },
    { value: 'save', label: 'Save' },
  ],
})

export const RootProvider = () => {
  const command = useCommand({ collection })

  return (
    <div className="stack">
      <button type="button" className={button.Root} onClick={() => command.setInputValue('')}>
        Clear search ({command.inputValue || 'empty'})
      </button>
      <Command.RootProvider className={styles.Root} value={command}>
        <Command.Label className={styles.Label}>Commands</Command.Label>
        <Command.Control className={styles.Control}>
          <SearchIcon />
          <Command.Input className={styles.Input} placeholder="Search..." />
        </Command.Control>
        <Command.List className={styles.List}>
          {command.collection.items.map((item) => (
            <Command.Item key={item.value} item={item} className={styles.Item}>
              <Command.ItemText className={styles.ItemText}>{item.label}</Command.ItemText>
            </Command.Item>
          ))}
        </Command.List>
        <Command.Empty className={styles.Empty}>No commands found</Command.Empty>
      </Command.RootProvider>
    </div>
  )
}
