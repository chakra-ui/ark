<script lang="ts">
  import { useAsyncList } from '@ark-ui/svelte/collection'
  import { useCollator } from '@ark-ui/svelte/locale'
  import { ArrowDownIcon, ArrowUpDownIcon, ArrowUpIcon, LoaderIcon } from 'lucide-svelte'
  import styles from 'styles/async-list.module.css'

  interface User {
    id: number
    name: string
    username: string
    email: string
    phone: string
    website: string
  }

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

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'username', label: 'Username' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'website', label: 'Website' },
  ]

  const descriptor = $derived(list().sortDescriptor)
</script>

<div class={styles.Root}>
  {#if list().loading}
    <div class={styles.Loading}>
      <LoaderIcon class={styles.Spinner} /> Loading
    </div>
  {/if}
  {#if list().error}
    <div class={styles.Error}>Error: {list().error.message}</div>
  {/if}
  <div class={styles.Status}>Sorted by: {descriptor ? `${descriptor.column} (${descriptor.direction})` : 'none'}</div>

  <table class={styles.Table}>
    <thead>
      <tr>
        {#each columns as { key, label }}
          <th onclick={() => handleSort(key as keyof User)}>
            {label}
            {#if list().sortDescriptor?.column === key}
              {#if list().sortDescriptor?.direction === 'ascending'}
                <ArrowUpIcon />
              {:else}
                <ArrowDownIcon />
              {/if}
            {:else}
              <ArrowUpDownIcon />
            {/if}
          </th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each list().items as user}
        <tr>
          <td>{user.name}</td>
          <td>{user.username}</td>
          <td>{user.email}</td>
          <td>{user.phone}</td>
          <td>{user.website}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
