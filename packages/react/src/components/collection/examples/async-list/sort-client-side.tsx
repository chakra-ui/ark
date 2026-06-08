import { useAsyncList } from '@ark-ui/react/collection'
import { useCollator } from '@ark-ui/react/locale'
import { ArrowDownIcon, ArrowUpDownIcon, ArrowUpIcon, LoaderIcon } from 'lucide-react'
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
    sort({ items, sorting }) {
      return {
        items: items.sort((a, b) => {
          const { column, direction } = sorting
          let cmp = collator.compare(String(a[column]), String(b[column]))
          if (direction === 'descending') {
            cmp *= -1
          }
          return cmp
        }),
      }
    },
  })

  const handleSort = (column: keyof User) => {
    const currentSort = list.sorting
    let direction: 'ascending' | 'descending' = 'ascending'

    if (currentSort?.column === column && currentSort.direction === 'ascending') {
      direction = 'descending'
    }

    list.setSorting({ column, direction })
  }

  const getSortIcon = (column: keyof User) => {
    const current = list.sorting
    if (current?.column !== column) return <ArrowUpDownIcon />
    return current.direction === 'ascending' ? <ArrowUpIcon /> : <ArrowDownIcon />
  }

  const descriptor = list.sorting

  return (
    <div className={styles.Root}>
      {list.isLoading && (
        <div className={styles.Loading}>
          <LoaderIcon className={styles.Spinner} /> Loading
        </div>
      )}
      {list.error && <div className={styles.Error}>Error: {list.error.message}</div>}
      <div className={styles.Status}>
        Sorted by: {descriptor ? `${descriptor.column} (${descriptor.direction})` : 'none'}
      </div>

      <table className={styles.Table}>
        <thead>
          <tr>
            {[
              { key: 'name', label: 'Name' },
              { key: 'username', label: 'Username' },
              { key: 'email', label: 'Email' },
            ].map(({ key, label }) => (
              <th key={key} onClick={() => handleSort(key as keyof User)}>
                {label} {getSortIcon(key as keyof User)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {list.items.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
