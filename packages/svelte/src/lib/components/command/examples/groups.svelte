<script lang="ts">
  import { Command, createListCollection } from '@ark-ui/svelte/command'
  import { SearchIcon } from 'lucide-svelte'
  import styles from 'styles/command.module.css'

  const collection = createListCollection({
    items: [
      { value: 'calendar', label: 'Calendar', group: 'Suggestions' },
      { value: 'emoji', label: 'Search emoji', group: 'Suggestions' },
      { value: 'calculator', label: 'Calculator', group: 'Suggestions', disabled: true },
      { value: 'profile', label: 'Profile', group: 'Settings' },
      { value: 'billing', label: 'Billing', group: 'Settings' },
      { value: 'preferences', label: 'Preferences', group: 'Settings' },
    ],
    groupBy: (item) => item.group,
  })
</script>

<Command.Root class={styles.Root} {collection}>
  <Command.Label class={styles.Label}>Commands</Command.Label>
  <Command.Control class={styles.Control}>
    <SearchIcon />
    <Command.Input class={styles.Input} placeholder="Search..." />
  </Command.Control>
  <Command.Context>
    {#snippet render(command)}
      <Command.List class={styles.List}>
        {#each command().collection.group() as [group, items] (group)}
          <Command.ItemGroup class={styles.ItemGroup}>
            <Command.ItemGroupLabel class={styles.ItemGroupLabel}>{group}</Command.ItemGroupLabel>
            {#each items as item (item.value)}
              <Command.Item {item} class={styles.Item}>
                <Command.ItemText class={styles.ItemText}>{item.label}</Command.ItemText>
              </Command.Item>
            {/each}
          </Command.ItemGroup>
        {/each}
      </Command.List>
    {/snippet}
  </Command.Context>
  <Command.Empty class={styles.Empty}>No results found</Command.Empty>
</Command.Root>
