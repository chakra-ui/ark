import { Command, createListCollection, useCommand } from '@ark-ui/solid/command'
import { SearchIcon } from 'lucide-solid'
import { For } from 'solid-js'
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
    <div class="stack">
      <button type="button" class={button.Root} onClick={() => command().setInputValue('')}>
        Clear search ({command().inputValue || 'empty'})
      </button>
      <Command.RootProvider class={styles.Root} value={command}>
        <Command.Label class={styles.Label}>Commands</Command.Label>
        <Command.Control class={styles.Control}>
          <SearchIcon />
          <Command.Input class={styles.Input} placeholder="Search..." />
        </Command.Control>
        <Command.List class={styles.List}>
          <For each={command().collection.items}>
            {(item) => (
              <Command.Item item={item} class={styles.Item}>
                <Command.ItemText class={styles.ItemText}>{item.label}</Command.ItemText>
              </Command.Item>
            )}
          </For>
        </Command.List>
        <Command.Empty class={styles.Empty}>No commands found</Command.Empty>
      </Command.RootProvider>
    </div>
  )
}
