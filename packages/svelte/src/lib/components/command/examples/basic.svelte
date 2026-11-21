<script lang="ts">
  import { Command, createListCollection } from '@ark-ui/svelte/command'
  import { CopyIcon, FilePlusIcon, FolderOpenIcon, SaveIcon, SearchIcon, SettingsIcon } from 'lucide-svelte'
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

  let selected = $state<string | null>(null)
</script>

<div class="stack">
  <output>Selected: {selected ?? 'none'}</output>
  <Command.Root class={styles.Root} {collection} onSelect={(details) => (selected = details.itemValue)}>
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
</div>
