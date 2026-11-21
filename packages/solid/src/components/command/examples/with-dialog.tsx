import { Command, createListCollection } from '@ark-ui/solid/command'
import { Dialog } from '@ark-ui/solid/dialog'
import { useHotkey } from '@ark-ui/solid/hotkeys'
import {
  CornerDownLeftIcon,
  FilePlusIcon,
  FolderOpenIcon,
  SaveIcon,
  SearchIcon,
  SettingsIcon,
  TerminalIcon,
} from 'lucide-solid'
import { For, createSignal } from 'solid-js'
import { Portal } from '@solidjs/web'
import button from 'styles/button.module.css'
import styles from 'styles/command.module.css'

const collection = createListCollection({
  items: [
    { value: 'new-file', label: 'New file', icon: FilePlusIcon, shortcut: '⌘N' },
    { value: 'open-file', label: 'Open file', icon: FolderOpenIcon, shortcut: '⌘O' },
    { value: 'save', label: 'Save', icon: SaveIcon, shortcut: '⌘S' },
    { value: 'terminal', label: 'Toggle terminal', icon: TerminalIcon, shortcut: '⌃`' },
    { value: 'settings', label: 'Open settings', icon: SettingsIcon, shortcut: '⌘,' },
  ],
})

export const WithDialog = () => {
  const [open, setOpen] = createSignal(false)
  const [lastRun, setLastRun] = createSignal<string | null>(null)

  useHotkey({ hotkey: 'mod+K', action: () => setOpen((value) => !value) })

  return (
    <div class="stack">
      <output>Ran: {lastRun() ?? 'nothing yet'}</output>
      <Dialog.Root lazyMount unmountOnExit open={open()} onOpenChange={(details) => setOpen(details.open)}>
        <Dialog.Trigger class={button.Root}>
          Search commands <kbd>⌘K</kbd>
        </Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop class={styles.Backdrop} />
          <Dialog.Positioner class={styles.Positioner}>
            <Dialog.Content class={styles.Content} aria-label="Command palette">
              <Command.Root
                class={styles.Root}
                collection={collection}
                onSelect={(details) => {
                  setLastRun(details.itemValue)
                  setOpen(false)
                }}
              >
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
              <div class={styles.Footer}>
                <span class={styles.FooterHint}>
                  <kbd class={styles.Shortcut}>↑↓</kbd> Navigate
                </span>
                <span class={styles.FooterHint}>
                  <kbd class={styles.Shortcut}>
                    <CornerDownLeftIcon />
                  </kbd>
                  Run
                </span>
                <span class={styles.FooterHint}>
                  <kbd class={styles.Shortcut}>esc</kbd> Close
                </span>
              </div>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </div>
  )
}
