import { Command, createListCollection } from '@ark-ui/solid/command'
import { CopyIcon, FilePlusIcon, FolderOpenIcon, SaveIcon, SearchIcon, SettingsIcon } from 'lucide-solid'
import { For, createSignal } from 'solid-js'
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
  const [selected, setSelected] = createSignal<string | null>(null)

  return (
    <div class="stack">
      <output>Selected: {selected() ?? 'none'}</output>
      <Command.Root class={styles.Root} collection={collection} onSelect={(details) => setSelected(details.itemValue)}>
        <Command.Label class={styles.Label}>Commands</Command.Label>
        <Command.Control class={styles.Control}>
          <SearchIcon />
          <Command.Input class={styles.Input} placeholder="Type a command or search..." />
        </Command.Control>
        <Command.Context>
          {(command) => (
            <Command.List class={styles.List}>
              <For each={command().collection.items}>
                {(item) => (
                  <Command.Item item={item} class={styles.Item}>
                    <span class={styles.ItemStart}>
                      <item.icon />
                      <Command.ItemText class={styles.ItemText}>{item.label}</Command.ItemText>
                    </span>
                    <kbd class={styles.Shortcut}>{item.shortcut}</kbd>
                  </Command.Item>
                )}
              </For>
            </Command.List>
          )}
        </Command.Context>
        <Command.Empty class={styles.Empty}>No commands found</Command.Empty>
      </Command.Root>
    </div>
  )
}
