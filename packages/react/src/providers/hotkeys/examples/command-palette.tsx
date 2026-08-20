import { Combobox, useListCollection } from '@ark-ui/react/combobox'
import { Dialog } from '@ark-ui/react/dialog'
import { useFormatHotkey, useHotkey, useHotkeyRegistrations, useHotkeys } from '@ark-ui/react/hotkeys'
import { useFilter } from '@ark-ui/react/locale'
import { Portal } from '@ark-ui/react/portal'
import { CornerDownLeftIcon, SearchIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import button from 'styles/button.module.css'
import styles from 'styles/command-palette.module.css'

export const CommandPalette = () => {
  const [open, setOpen] = useState(false)
  const [lastRun, setLastRun] = useState<string | null>(null)

  useHotkeys([
    {
      id: '10-save',
      hotkey: 'mod+S',
      action: () => setLastRun('Save file'),
      label: 'Save file',
      category: 'File',
      keywords: ['write', 'persist'],
    },
    {
      id: '10-theme',
      hotkey: 'mod+shift+D',
      action: () => setLastRun('Toggle theme'),
      label: 'Toggle theme',
      category: 'View',
      keywords: ['dark', 'light', 'appearance'],
    },
    {
      id: '10-undo',
      hotkey: 'mod+Z',
      action: () => setLastRun('Undo'),
      label: 'Undo',
      category: 'Edit',
      keywords: ['revert', 'back'],
    },
  ])

  const formatHotkey = useFormatHotkey()
  const commands = useHotkeyRegistrations()
  const { contains } = useFilter({ sensitivity: 'base' })

  const { collection, filter, set } = useListCollection({
    initialItems: commands,
    itemToString: (item) => item.label ?? item.id,
    itemToValue: (item) => item.id,
    groupBy: (item) => item.category ?? 'Other',
    filter: (itemText, filterText, item) =>
      contains(itemText, filterText) || item.keywords.some((keyword) => contains(keyword, filterText)),
  })

  useEffect(() => {
    set([...commands])
  }, [commands, set])

  const openPalette = () => setOpen(true)

  useHotkey('mod+shift+P', openPalette, { label: 'Open command palette', category: 'General' })

  const handleValueChange = (details: Combobox.ValueChangeDetails) => {
    const selected = details.items.at(0)
    if (!selected) return
    setOpen(false)
    selected.action(new KeyboardEvent('keydown'))
  }

  return (
    <div>
      <button type="button" className={button.Root} onClick={openPalette}>
        Open palette ({formatHotkey('mod+shift+P')})
      </button>
      <p>Last run: {lastRun ?? 'nothing yet'}</p>

      <Dialog.Root
        lazyMount
        unmountOnExit
        open={open}
        onOpenChange={(details) => setOpen(details.open)}
        onExitComplete={() => filter('')}
      >
        <Portal>
          <Dialog.Backdrop className={styles.Backdrop} />
          <Dialog.Positioner className={styles.Positioner}>
            <Dialog.Content className={styles.Content} aria-label="Command palette">
              <Combobox.Root
                className={styles.Root}
                collection={collection}
                open
                disableLayer
                inputBehavior="autohighlight"
                selectionBehavior="preserve"
                loopFocus={false}
                placeholder="Search commands…"
                onInputValueChange={(details) => filter(details.inputValue)}
                onValueChange={handleValueChange}
              >
                <Combobox.Control className={styles.Control}>
                  <SearchIcon />
                  <Combobox.Input className={styles.Input} />
                </Combobox.Control>
                <Combobox.Content className={styles.Content_list}>
                  {collection.size === 0 ? (
                    <div className={styles.Empty}>No commands found</div>
                  ) : (
                    collection.group().map(([category, group]) => (
                      <Combobox.ItemGroup className={styles.ItemGroup} key={category}>
                        <Combobox.ItemGroupLabel className={styles.ItemGroupLabel}>{category}</Combobox.ItemGroupLabel>
                        {group.map((item) => (
                          <Combobox.Item className={styles.Item} key={item.id} item={item} persistFocus>
                            <Combobox.ItemText className={styles.ItemText}>{item.label ?? item.id}</Combobox.ItemText>
                            <kbd className={styles.Shortcut}>{formatHotkey(item.hotkey)}</kbd>
                          </Combobox.Item>
                        ))}
                      </Combobox.ItemGroup>
                    ))
                  )}
                </Combobox.Content>
              </Combobox.Root>
              <div className={styles.Footer}>
                <span className={styles.FooterHint}>
                  <CornerDownLeftIcon size={12} /> to run
                </span>
                <span className={styles.FooterHint}>esc to close</span>
              </div>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </div>
  )
}
