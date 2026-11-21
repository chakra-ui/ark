<script lang="ts">
  import { Command, createListCollection } from '@ark-ui/svelte/command'
  import { SearchIcon } from 'lucide-svelte'
  import styles from 'styles/command.module.css'

  const people = [
    'Ada Lovelace',
    'Alan Turing',
    'Grace Hopper',
    'Katherine Johnson',
    'Linus Torvalds',
    'Margaret Hamilton',
  ]

  const search = (query: string) =>
    new Promise<string[]>((resolve) => {
      const q = query.toLowerCase()
      setTimeout(() => resolve(people.filter((name) => name.toLowerCase().includes(q))), 300)
    })

  const matchAll = () => true

  let inputValue = $state('')
  let names = $state<string[]>([])
  let loading = $state(true)

  $effect(() => {
    let active = true
    loading = true
    search(inputValue).then((result) => {
      if (!active) return
      names = result
      loading = false
    })
    return () => {
      active = false
    }
  })

  const collection = $derived(
    createListCollection({
      items: names.map((name) => ({ value: name.toLowerCase().replace(/\s+/g, '-'), label: name })),
    }),
  )
</script>

<Command.Root
  class={styles.Root}
  {collection}
  filter={matchAll}
  {loading}
  onInputValueChange={(details) => (inputValue = details.inputValue)}
>
  <Command.Label class={styles.Label}>People</Command.Label>
  <Command.Control class={styles.Control}>
    <SearchIcon />
    <Command.Input class={styles.Input} placeholder="Search people..." />
  </Command.Control>
  <Command.List class={styles.List}>
    {#each collection.items as item (item.value)}
      <Command.Item {item} class={styles.Item}>
        <Command.ItemText class={styles.ItemText}>{item.label}</Command.ItemText>
      </Command.Item>
    {/each}
  </Command.List>
  {#if loading}
    <div class={styles.Loading}>Loading...</div>
  {:else}
    <Command.Empty class={styles.Empty}>No people found</Command.Empty>
  {/if}
</Command.Root>
