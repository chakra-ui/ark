import { useAsyncList } from '@ark-ui/react/collection'
import { Command, createListCollection } from '@ark-ui/react/command'
import { SearchIcon } from 'lucide-react'
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

  const collection = createListCollection({
    items: list.items,
    itemToValue: (item) => item.id,
    itemToString: (item) => item.name,
  })

  return (
    <Command.Root
      className={styles.Root}
      collection={collection}
      filter={matchAll}
      loading={list.isLoading}
      onInputValueChange={(details) => list.setFilter(details.inputValue)}
    >
      <Command.Label className={styles.Label}>People</Command.Label>
      <Command.Control className={styles.Control}>
        <SearchIcon />
        <Command.Input className={styles.Input} placeholder="Search people..." />
      </Command.Control>
      <Command.List className={styles.List}>
        {collection.items.map((item) => (
          <Command.Item key={item.id} item={item} className={styles.Item}>
            <Command.ItemText className={styles.ItemText}>{item.name}</Command.ItemText>
          </Command.Item>
        ))}
      </Command.List>
      {list.isLoading && <div className={styles.Loading}>Loading...</div>}
      {!list.isLoading && list.error && <div className={styles.Empty}>{list.error.message}</div>}
      {!list.isLoading && !list.error && <Command.Empty className={styles.Empty}>No people found</Command.Empty>}
    </Command.Root>
  )
}
