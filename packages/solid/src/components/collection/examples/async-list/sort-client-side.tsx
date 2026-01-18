import { useAsyncList } from '@ark-ui/solid/collection'
import { useCollator } from '@ark-ui/solid/locale'
import { ArrowDownIcon, ArrowUpDownIcon, ArrowUpIcon, LoaderIcon } from 'lucide-solid'
import { For } from 'solid-js'
import styles from 'styles/async-list.module.css'

interface User {
  id: number
  name: string
  username: string
  email: string
  phone: string
  website: string
}

export const SortClientSide = () => {
  const collator = useCollator()

  const list = useAsyncList<User>({
    autoReload: true,
    load: async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/users?_limit=5')
      const data = await response.json()
      return { items: data }
    },
    sort({ items, descriptor }) {
      return {
        items: items.sort((a, b) => {
          const { column, direction } = descriptor
          let cmp = collator().compare(String(a[column]), String(b[column]))
          if (direction === 'descending') {
            cmp *= -1
          }
          return cmp
        }),
      }
    },
  })

  const handleSort = (column: keyof User) => {
    const currentSort = list().sortDescriptor
    let direction: 'ascending' | 'descending' = 'ascending'

    if (currentSort?.column === column && currentSort.direction === 'ascending') {
      direction = 'descending'
    }

    list().sort({ column, direction })
  }

  const getSortIcon = (column: keyof User) => {
    const current = list().sortDescriptor
    if (current?.column !== column) return <ArrowUpDownIcon />
    return current.direction === 'ascending' ? <ArrowUpIcon /> : <ArrowDownIcon />
  }

  const descriptor = () => list().sortDescriptor

  return (
    <div class={styles.Root}>
      {list().loading && (
        <div class={styles.Loading}>
          <LoaderIcon class={styles.Spinner} /> Loading
        </div>
      )}
      {list().error && <div class={styles.Error}>Error: {list().error.message}</div>}
      <div class={styles.Status}>
        Sorted by: {descriptor() ? `${descriptor()?.column} (${descriptor()?.direction})` : 'none'}
      </div>

      <table class={styles.Table}>
        <thead>
          <tr>
            <For
              each={[
                { key: 'name', label: 'Name' },
                { key: 'username', label: 'Username' },
                { key: 'email', label: 'Email' },
                { key: 'phone', label: 'Phone' },
                { key: 'website', label: 'Website' },
              ]}
            >
              {({ key, label }) => (
                <th onClick={() => handleSort(key as keyof User)}>
                  {label} {getSortIcon(key as keyof User)}
                </th>
              )}
            </For>
          </tr>
        </thead>
        <tbody>
          <For each={list().items}>
            {(user) => (
              <tr>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.website}</td>
              </tr>
            )}
          </For>
        </tbody>
      </table>
    </div>
  )
}
