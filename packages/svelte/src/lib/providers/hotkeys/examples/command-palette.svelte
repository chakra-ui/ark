<script lang="ts">
  // biome-ignore lint/style/useImportType: intentional
  import { Combobox } from '@ark-ui/svelte/combobox'
  import { useListCollection } from '@ark-ui/svelte/collection'
  import { useFilter } from '@ark-ui/svelte/locale'
  import { Portal } from '@ark-ui/svelte/portal'
  import { Dialog } from '@ark-ui/svelte/dialog'
  import { CornerDownLeftIcon, SearchIcon } from 'lucide-svelte'
  import { useFormatHotkey, useHotkey, useHotkeyRegistrations, useHotkeys } from '$lib/providers/hotkeys/index.ts'
  import button from 'styles/button.module.css'
  import styles from 'styles/command-palette.module.css'

  let open = $state(false)
  let lastRun = $state<string | null>(null)

  useHotkeys([
    {
      id: 'save',
      hotkey: 'mod+S',
      action: () => (lastRun = 'Save file'),
      label: 'Save file',
      category: 'File',
      keywords: ['write', 'persist'],
    },
    {
      id: 'theme',
      hotkey: 'mod+shift+D',
      action: () => (lastRun = 'Toggle theme'),
      label: 'Toggle theme',
      category: 'View',
      keywords: ['dark', 'light', 'appearance'],
    },
    {
      id: 'undo',
      hotkey: 'mod+Z',
      action: () => (lastRun = 'Undo'),
      label: 'Undo',
      category: 'Edit',
      keywords: ['revert', 'back'],
    },
  ])

  const formatHotkey = useFormatHotkey()
  const commands = useHotkeyRegistrations()
  const filters = useFilter({ sensitivity: 'base' })

  const { collection, filter, set } = useListCollection({
    initialItems: commands(),
    itemToString: (item) => item.label ?? item.id,
    itemToValue: (item) => item.id,
    groupBy: (item) => item.category ?? 'Other',
    filter: (itemText, filterText, item) =>
      filters().contains(itemText, filterText) ||
      item.keywords.some((keyword) => filters().contains(keyword, filterText)),
  })

  $effect(() => {
    set([...commands()])
  })

  const openPalette = () => (open = true)

  useHotkey('mod+shift+P', openPalette, { label: 'Open command palette', category: 'General' })

  const handleValueChange = (details: Combobox.ValueChangeDetails) => {
    const selected = details.items.at(0)
    if (!selected) return
    open = false
    selected.action(new KeyboardEvent('keydown'))
  }
</script>

<div>
  <button type="button" class={button.Root} onclick={openPalette}>
    Open palette ({formatHotkey('mod+shift+P')})
  </button>
  <p>Last run: {lastRun ?? 'nothing yet'}</p>

  <Dialog.Root
    lazyMount
    unmountOnExit
    {open}
    onOpenChange={(details) => (open = details.open)}
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
              {#if collection().size === 0}
                <div class={styles.Empty}>No commands found</div>
              {:else}
                {#each collection().group() as [category, group] (category)}
                  <Combobox.ItemGroup class={styles.ItemGroup}>
                    <Combobox.ItemGroupLabel class={styles.ItemGroupLabel}>{category}</Combobox.ItemGroupLabel>
                    {#each group as item (item.id)}
                      <Combobox.Item class={styles.Item} {item} persistFocus>
                        <Combobox.ItemText class={styles.ItemText}>{item.label ?? item.id}</Combobox.ItemText>
                        <kbd class={styles.Shortcut}>{formatHotkey(item.hotkey)}</kbd>
                      </Combobox.Item>
                    {/each}
                  </Combobox.ItemGroup>
                {/each}
              {/if}
            </Combobox.Content>
          </Combobox.Root>
          <div class={styles.Footer}>
            <span class={styles.FooterHint}><CornerDownLeftIcon size={12} /> to run</span>
            <span class={styles.FooterHint}>esc to close</span>
          </div>
        </Dialog.Content>
      </Dialog.Positioner>
    </Portal>
  </Dialog.Root>
</div>
