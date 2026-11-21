<script lang="ts">
  import { Command, createListCollection } from '@ark-ui/svelte/command'
  import { SearchIcon } from 'lucide-svelte'
  import styles from 'styles/command.module.css'

  const collection = createListCollection({
    items: [
      { value: 'apple', label: 'Apple' },
      { value: 'banana', label: 'Banana' },
      { value: 'cherry', label: 'Cherry' },
    ],
  })

  let inputValue = $state('xyz')
</script>

<Command.Root class={styles.Root} {collection} bind:inputValue>
  <Command.Label class={styles.Label}>Fruits</Command.Label>
  <Command.Control class={styles.Control}>
    <SearchIcon />
    <Command.Input class={styles.Input} placeholder="Search fruits..." />
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
  <Command.Empty class={styles.Empty}>No results for “{inputValue}”</Command.Empty>
</Command.Root>
