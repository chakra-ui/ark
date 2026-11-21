import { Command, createListCollection } from '@ark-ui/react/command'
import { Dialog } from '@ark-ui/react/dialog'
import { useHotkey } from '@ark-ui/react/hotkeys'
import { Portal } from '@ark-ui/react/portal'
import {
  CornerDownLeftIcon,
  FilePlusIcon,
  FolderOpenIcon,
  SaveIcon,
  SearchIcon,
  SettingsIcon,
  TerminalIcon,
} from 'lucide-react'
import { useState } from 'react'
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
  const [open, setOpen] = useState(false)
  const [lastRun, setLastRun] = useState<string | null>(null)

  useHotkey({ hotkey: 'mod+K', action: () => setOpen((value) => !value) })

  return (
    <div className="stack">
      <output>Ran: {lastRun ?? 'nothing yet'}</output>
      <Dialog.Root lazyMount unmountOnExit open={open} onOpenChange={(details) => setOpen(details.open)}>
        <Dialog.Trigger className={button.Root}>
          Search commands <kbd>⌘K</kbd>
        </Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop className={styles.Backdrop} />
          <Dialog.Positioner className={styles.Positioner}>
            <Dialog.Content className={styles.Content} aria-label="Command palette">
              <Command.Root
                className={styles.Root}
                collection={collection}
                onSelect={(details) => {
                  setLastRun(details.itemValue)
                  setOpen(false)
                }}
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
              <div className={styles.Footer}>
                <span className={styles.FooterHint}>
                  <kbd className={styles.Shortcut}>↑↓</kbd> Navigate
                </span>
                <span className={styles.FooterHint}>
                  <kbd className={styles.Shortcut}>
                    <CornerDownLeftIcon />
                  </kbd>
                  Run
                </span>
                <span className={styles.FooterHint}>
                  <kbd className={styles.Shortcut}>esc</kbd> Close
                </span>
              </div>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </div>
  )
}
