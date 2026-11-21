import { Command, createListCollection } from '@ark-ui/solid/command'
import { SearchIcon } from 'lucide-solid'
import { For, Show, createEffect, createMemo, createSignal } from 'solid-js'
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

export const Async = () => {
  const [inputValue, setInputValue] = createSignal('')
  const [names, setNames] = createSignal<string[]>([])
  const [loading, setLoading] = createSignal(true)

  createEffect(inputValue, (value) => {
    let active = true
    setLoading(true)
    search(value).then((result) => {
      if (!active) return
      setNames(result)
      setLoading(false)
    })
    return () => {
      active = false
    }
  })

  const collection = createMemo(() =>
    createListCollection({
      items: names().map((name) => ({ value: name.toLowerCase().replace(/\s+/g, '-'), label: name })),
    }),
  )

  return (
    <Command.Root
      class={styles.Root}
      collection={collection()}
      filter={matchAll}
      loading={loading()}
      onInputValueChange={(details) => setInputValue(details.inputValue)}
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
              <Command.ItemText class={styles.ItemText}>{item.label}</Command.ItemText>
            </Command.Item>
          )}
        </For>
      </Command.List>
      <Show when={loading()}>
        <div class={styles.Loading}>Loading...</div>
      </Show>
      <Show when={!loading()}>
        <Command.Empty class={styles.Empty}>No people found</Command.Empty>
      </Show>
    </Command.Root>
  )
}
