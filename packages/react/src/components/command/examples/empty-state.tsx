import { Command, createListCollection } from '@ark-ui/react/command'
import { SearchIcon } from 'lucide-react'
import { useState } from 'react'
import styles from 'styles/command.module.css'

const collection = createListCollection({
  items: [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' },
  ],
})

export const EmptyState = () => {
  const [inputValue, setInputValue] = useState('xyz')

  return (
    <Command.Root
      className={styles.Root}
      collection={collection}
      inputValue={inputValue}
      onInputValueChange={(details) => setInputValue(details.inputValue)}
    >
      <Command.Label className={styles.Label}>Fruits</Command.Label>
      <Command.Control className={styles.Control}>
        <SearchIcon />
        <Command.Input className={styles.Input} placeholder="Search fruits..." />
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
      <Command.Empty className={styles.Empty}>No results for “{inputValue}”</Command.Empty>
    </Command.Root>
  )
}
