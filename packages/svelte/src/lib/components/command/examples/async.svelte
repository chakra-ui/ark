<script lang="ts">
  import { useAsyncList } from '@ark-ui/svelte/collection'
  import { Command, createListCollection } from '@ark-ui/svelte/command'
  import { SearchIcon } from 'lucide-svelte'
  import styles from 'styles/command.module.css'

  interface Person {
    id: string
    name: string
  }

  const people: Person[] = [
    { id: 'ada', name: 'Ada Lovelace' },
    { id: 'alan', name: 'Alan Turing' },
    { id: 'grace', name: 'Grace Hopper' },
    { id: 'katherine', name: 'Katherine Johnson' },
    { id: 'linus', name: 'Linus Torvalds' },
    { id: 'margaret', name: 'Margaret Hamilton' },
  ]

  const matchAll = <T,>(items: T[]) => items

  const list = useAsyncList<Person>({
    async load({ filter, signal }) {
      await new Promise((resolve) => setTimeout(resolve, 300))
      if (signal?.aborted) return { items: [] }
      const query = (filter ?? '').toLowerCase()
      return { items: people.filter((person) => person.name.toLowerCase().includes(query)) }
    },
  })

  const collection = $derived(
    createListCollection({
      items: list().items,
      itemToValue: (item) => item.id,
      itemToString: (item) => item.name,
    }),
  )
</script>

<Command.Root
  class={styles.Root}
  {collection}
  filter={matchAll}
  loading={list().isLoading}
  onInputValueChange={(details) => list().setFilter(details.inputValue)}
>
  <Command.Label class={styles.Label}>People</Command.Label>
  <Command.Control class={styles.Control}>
    <SearchIcon />
    <Command.Input class={styles.Input} placeholder="Search people..." />
  </Command.Control>
  <Command.List class={styles.List}>
    {#each collection.items as item (item.id)}
      <Command.Item {item} class={styles.Item}>
        <Command.ItemText class={styles.ItemText}>{item.name}</Command.ItemText>
      </Command.Item>
    {/each}
  </Command.List>
  {#if list().isLoading}
    <div class={styles.Loading}>Loading...</div>
  {:else if list().error}
    <div class={styles.Empty}>{list().error?.message}</div>
  {:else}
    <Command.Empty class={styles.Empty}>No people found</Command.Empty>
  {/if}
</Command.Root>
