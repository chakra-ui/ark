import { Command, createListCollection } from '@ark-ui/solid/command'
import { SearchIcon } from 'lucide-solid'
import { For, createSignal } from 'solid-js'
import styles from 'styles/command.module.css'

const collection = createListCollection({
  items: [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' },
  ],
})

export const EmptyState = () => {
  const [inputValue, setInputValue] = createSignal('xyz')

  return (
    <Command.Root
      class={styles.Root}
      collection={collection}
      inputValue={inputValue()}
      onInputValueChange={(details) => setInputValue(details.inputValue)}
    >
      <Command.Label class={styles.Label}>Fruits</Command.Label>
      <Command.Control class={styles.Control}>
        <SearchIcon />
        <Command.Input class={styles.Input} placeholder="Search fruits..." />
      </Command.Control>
      <Command.Context>
        {(command) => (
          <Command.List class={styles.List}>
            <For each={command().collection.items}>
              {(item) => (
                <Command.Item item={item} class={styles.Item}>
                  <Command.ItemText class={styles.ItemText}>{item.label}</Command.ItemText>
                </Command.Item>
              )}
            </For>
          </Command.List>
        )}
      </Command.Context>
      <Command.Empty class={styles.Empty}>No results for “{inputValue()}”</Command.Empty>
    </Command.Root>
  )
}
