import { Command, createListCollection } from '@ark-ui/solid/command'
import { SearchIcon } from 'lucide-solid'
import { For } from 'solid-js'
import styles from 'styles/command.module.css'

const collection = createListCollection({
  items: [
    { value: 'theme', label: 'Toggle theme', keywords: ['dark', 'light', 'appearance'] },
    { value: 'sign-out', label: 'Sign out', keywords: ['logout', 'exit'] },
    { value: 'shortcuts', label: 'Keyboard shortcuts', keywords: ['hotkeys', 'keybindings'] },
  ],
})

export const Keywords = () => (
  <Command.Root class={styles.Root} collection={collection}>
    <Command.Label class={styles.Label}>Commands</Command.Label>
    <Command.Control class={styles.Control}>
      <SearchIcon />
      <Command.Input class={styles.Input} placeholder="Try “dark” or “logout”..." />
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
    <Command.Empty class={styles.Empty}>No commands found</Command.Empty>
  </Command.Root>
)
