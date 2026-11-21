<script lang="ts">
  import { Command, createListCollection } from '@ark-ui/svelte/command'
  import { Dialog } from '@ark-ui/svelte/dialog'
  import { useHotkey } from '@ark-ui/svelte/hotkeys'
  import { Portal } from '@ark-ui/svelte/portal'
  import {
    CornerDownLeftIcon,
    FilePlusIcon,
    FolderOpenIcon,
    SaveIcon,
    SearchIcon,
    SettingsIcon,
    TerminalIcon,
  } from 'lucide-svelte'
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

  let open = $state(false)
  let lastRun = $state<string | null>(null)

  useHotkey({ hotkey: 'mod+K', action: () => (open = !open) })
</script>

<div class="stack">
  <output>Ran: {lastRun ?? 'nothing yet'}</output>
  <Dialog.Root lazyMount unmountOnExit bind:open>
    <Dialog.Trigger class={button.Root}>
      Search commands <kbd>⌘K</kbd>
    </Dialog.Trigger>
    <Portal>
      <Dialog.Backdrop class={styles.Backdrop} />
      <Dialog.Positioner class={styles.Positioner}>
        <Dialog.Content class={styles.Content} aria-label="Command palette">
          <Command.Root
            class={styles.Root}
            {collection}
            onSelect={(details) => {
              lastRun = details.itemValue
              open = false
            }}
          >
            <Command.Label class={styles.Label}>Commands</Command.Label>
            <Command.Control class={styles.Control}>
              <SearchIcon />
              <Command.Input class={styles.Input} placeholder="Type a command or search..." />
            </Command.Control>
            <Command.Context>
              {#snippet render(command)}
                <Command.List class={styles.List}>
                  {#each command().collection.items as item (item.value)}
                    {@const Icon = item.icon}
                    <Command.Item {item} class={styles.Item}>
                      <span class={styles.ItemStart}>
                        <Icon />
                        <Command.ItemText class={styles.ItemText}>{item.label}</Command.ItemText>
                      </span>
                      <kbd class={styles.Shortcut}>{item.shortcut}</kbd>
                    </Command.Item>
                  {/each}
                </Command.List>
              {/snippet}
            </Command.Context>
            <Command.Empty class={styles.Empty}>No commands found</Command.Empty>
          </Command.Root>
          <div class={styles.Footer}>
            <span class={styles.FooterHint}>
              <kbd class={styles.Shortcut}>↑↓</kbd>
              Navigate
            </span>
            <span class={styles.FooterHint}>
              <kbd class={styles.Shortcut}>
                <CornerDownLeftIcon />
              </kbd>
              Run
            </span>
            <span class={styles.FooterHint}>
              <kbd class={styles.Shortcut}>esc</kbd>
              Close
            </span>
          </div>
        </Dialog.Content>
      </Dialog.Positioner>
    </Portal>
  </Dialog.Root>
</div>
