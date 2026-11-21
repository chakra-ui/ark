import { Command, createListCollection } from '@ark-ui/react/command'
import { SearchIcon } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
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
  const [inputValue, setInputValue] = useState('')
  const [names, setNames] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    setLoading(true)
    search(inputValue).then((result) => {
      if (!active) return
      setNames(result)
      setLoading(false)
    })
    return () => {
      active = false
    }
  }, [inputValue])

  const collection = useMemo(
    () =>
      createListCollection({
        items: names.map((name) => ({ value: name.toLowerCase().replace(/\s+/g, '-'), label: name })),
      }),
    [names],
  )

  return (
    <Command.Root
      className={styles.Root}
      collection={collection}
      filter={matchAll}
      loading={loading}
      onInputValueChange={(details) => setInputValue(details.inputValue)}
    >
      <Command.Label className={styles.Label}>People</Command.Label>
      <Command.Control className={styles.Control}>
        <SearchIcon />
        <Command.Input className={styles.Input} placeholder="Search people..." />
      </Command.Control>
      <Command.List className={styles.List}>
        {collection.items.map((item) => (
          <Command.Item key={item.value} item={item} className={styles.Item}>
            <Command.ItemText className={styles.ItemText}>{item.label}</Command.ItemText>
          </Command.Item>
        ))}
      </Command.List>
      {loading && <div className={styles.Loading}>Loading...</div>}
      {!loading && <Command.Empty className={styles.Empty}>No people found</Command.Empty>}
    </Command.Root>
  )
}
