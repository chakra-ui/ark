import { Combobox, useListCollection } from '@ark-ui/solid/combobox'
import { Dialog } from '@ark-ui/solid/dialog'
import {
  createHotkeyStore,
  useFormatHotkey,
  useHotkey,
  useHotkeyRegistrations,
  useHotkeys,
} from '@ark-ui/solid/hotkeys'
import { useFilter } from '@ark-ui/solid/locale'
import { CornerDownLeftIcon, SearchIcon } from 'lucide-solid'
import { For, Show, createEffect, createSignal } from 'solid-js'
import { Portal } from 'solid-js/web'
import button from 'styles/button.module.css'
import styles from 'styles/command-palette.module.css'

// Its own store, so the palette lists only the commands registered here.
const store = createHotkeyStore()

export const CommandPalette = () => {
  const [open, setOpen] = createSignal(false)
  const [lastRun, setLastRun] = createSignal<string | null>(null)

  useHotkeys({
    commands: [
      {
        id: 'save',
        hotkey: 'mod+S',
        action: () => setLastRun('Save file'),
        label: 'Save file',
        category: 'File',
        keywords: ['write', 'persist'],
      },
      {
        id: 'theme',
        hotkey: 'mod+shift+D',
        action: () => setLastRun('Toggle theme'),
        label: 'Toggle theme',
        category: 'View',
        keywords: ['dark', 'light', 'appearance'],
      },
      {
        id: 'undo',
        hotkey: 'mod+Z',
        action: () => setLastRun('Undo'),
        label: 'Undo',
        category: 'Edit',
        keywords: ['revert', 'back'],
      },
    ],
    store,
  })

  const formatHotkey = useFormatHotkey()
  const commands = useHotkeyRegistrations({ store })
  const filterFn = useFilter({ sensitivity: 'base' })

  const { collection, filter, set } = useListCollection({
    initialItems: commands(),
    itemToString: (item) => item.label ?? item.id,
    itemToValue: (item) => item.id,
    groupBy: (item) => item.category ?? 'Other',
    filter: (itemText, filterText, item) =>
      filterFn().contains(itemText, filterText) ||
      item.keywords.some((keyword) => filterFn().contains(keyword, filterText)),
  })

  createEffect(() => {
    set([...commands()])
  })

  const openPalette = () => setOpen(true)

  useHotkey({
    hotkey: 'mod+shift+P',
    action: openPalette,
    label: 'Open command palette',
    category: 'General',
    store,
  })

  const handleValueChange = (details: Combobox.ValueChangeDetails) => {
    const selected = details.items.at(0)
    if (!selected) return
    setOpen(false)
    selected.action(new KeyboardEvent('keydown'))
  }

  return (
    <div>
      <button type="button" class={button.Root} onClick={openPalette}>
        Open palette ({formatHotkey('mod+shift+P')})
      </button>
      <p>Last run: {lastRun() ?? 'nothing yet'}</p>

      <Dialog.Root
        lazyMount
        unmountOnExit
        open={open()}
        onOpenChange={(details) => setOpen(details.open)}
        onExitComplete={() => filter('')}
      >
        <Portal>
          <Dialog.Backdrop class={styles.Backdrop} />
          <Dialog.Positioner class={styles.Positioner}>
            <Dialog.Content class={styles.Content} aria-label="Command palette">
              <Combobox.Root
                class={styles.Root}
                collection={collection()}
                open
                disableLayer
                inputBehavior="autohighlight"
                selectionBehavior="preserve"
                loopFocus={false}
                placeholder="Search commands…"
                onInputValueChange={(details) => filter(details.inputValue)}
                onValueChange={handleValueChange}
              >
                <Combobox.Control class={styles.Control}>
                  <SearchIcon />
                  <Combobox.Input class={styles.Input} />
                </Combobox.Control>
                <Combobox.Content class={styles.Content_list}>
                  <Show when={collection().size > 0} fallback={<div class={styles.Empty}>No commands found</div>}>
                    <For each={collection().group()}>
                      {([category, group]) => (
                        <Combobox.ItemGroup class={styles.ItemGroup}>
                          <Combobox.ItemGroupLabel class={styles.ItemGroupLabel}>{category}</Combobox.ItemGroupLabel>
                          <For each={group}>
                            {(item) => (
                              <Combobox.Item class={styles.Item} item={item} persistFocus>
                                <Combobox.ItemText class={styles.ItemText}>{item.label ?? item.id}</Combobox.ItemText>
                                <kbd class={styles.Shortcut}>{formatHotkey(item.hotkey)}</kbd>
                              </Combobox.Item>
                            )}
                          </For>
                        </Combobox.ItemGroup>
                      )}
                    </For>
                  </Show>
                </Combobox.Content>
              </Combobox.Root>
              <div class={styles.Footer}>
                <span class={styles.FooterHint}>
                  <CornerDownLeftIcon size={12} /> to run
                </span>
                <span class={styles.FooterHint}>esc to close</span>
              </div>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </div>
  )
}
