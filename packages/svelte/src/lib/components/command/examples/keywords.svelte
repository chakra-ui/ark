<script lang="ts">
  import { Command, createListCollection } from '@ark-ui/svelte/command'
  import { SearchIcon } from 'lucide-svelte'
  import styles from 'styles/command.module.css'

  const collection = createListCollection({
    items: [
      { value: 'theme', label: 'Toggle theme', keywords: ['dark', 'light', 'appearance'] },
      { value: 'sign-out', label: 'Sign out', keywords: ['logout', 'exit'] },
      { value: 'shortcuts', label: 'Keyboard shortcuts', keywords: ['hotkeys', 'keybindings'] },
    ],
  })
</script>

<Command.Root class={styles.Root} {collection}>
  <Command.Label class={styles.Label}>Commands</Command.Label>
  <Command.Control class={styles.Control}>
    <SearchIcon />
    <Command.Input class={styles.Input} placeholder="Try “dark” or “logout”..." />
  </Command.Control>
  <Command.Context>
    {#snippet render(command)}
      <Command.List class={styles.List}>
        {#each command().collection.items as item (item.value)}
          <Command.Item {item} class={styles.Item}>
            <Command.ItemText class={styles.ItemText}>{item.label}</Command.ItemText>
          </Command.Item>
        {/each}
      </Command.List>
    {/snippet}
  </Command.Context>
  <Command.Empty class={styles.Empty}>No commands found</Command.Empty>
</Command.Root>
