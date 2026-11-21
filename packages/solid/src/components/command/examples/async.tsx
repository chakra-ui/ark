import { useAsyncList } from '@ark-ui/solid/collection'
import { Command, createListCollection } from '@ark-ui/solid/command'
import { SearchIcon } from 'lucide-solid'
import { For, Show, createMemo } from 'solid-js'
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

export const Async = () => {
  const list = useAsyncList<Person>({
    async load({ filter, signal }) {
      await new Promise((resolve) => setTimeout(resolve, 300))
      if (signal?.aborted) return { items: [] }
      const query = (filter ?? '').toLowerCase()
      return { items: people.filter((person) => person.name.toLowerCase().includes(query)) }
    },
  })

  const collection = createMemo(() =>
    createListCollection({
      items: list().items,
      itemToValue: (item) => item.id,
      itemToString: (item) => item.name,
    }),
  )

  return (
    <Command.Root
      class={styles.Root}
      collection={collection()}
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
        <For each={collection().items}>
          {(item) => (
            <Command.Item item={item} class={styles.Item}>
              <Command.ItemText class={styles.ItemText}>{item.name}</Command.ItemText>
            </Command.Item>
          )}
        </For>
      </Command.List>
      <Show when={list().isLoading}>
        <div class={styles.Loading}>Loading...</div>
      </Show>
      <Show when={!list().isLoading && list().error}>
        <div class={styles.Empty}>{list().error?.message}</div>
      </Show>
      <Show when={!list().isLoading && !list().error}>
        <Command.Empty class={styles.Empty}>No people found</Command.Empty>
      </Show>
    </Command.Root>
  )
}
