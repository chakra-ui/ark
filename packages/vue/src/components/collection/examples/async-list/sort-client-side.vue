<script setup lang="ts">
import { useAsyncList } from '@ark-ui/vue/collection'
import { useCollator } from '@ark-ui/vue/locale'
import { ArrowDownIcon, ArrowUpDownIcon, ArrowUpIcon, LoaderIcon } from 'lucide-vue-next'
import { computed } from 'vue'
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
        let cmp = collator.value.compare(String(a[column]), String(b[column]))
        if (direction === 'descending') {
          cmp *= -1
        }
        return cmp
      }),
    }
  },
})

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'username', label: 'Username' },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone' },
  { key: 'website', label: 'Website' },
]

const handleSort = (column: keyof User) => {
  const currentSort = list.value.sortDescriptor
  let direction: 'ascending' | 'descending' = 'ascending'

  if (currentSort?.column === column && currentSort.direction === 'ascending') {
    direction = 'descending'
  }

  list.value.sort({ column, direction })
}

const descriptor = computed(() => list.value.sortDescriptor)
</script>

<template>
  <div :class="styles.Root">
    <div v-if="list.loading" :class="styles.Loading">
      <LoaderIcon :class="styles.Spinner" />
      Loading
    </div>
    <div v-if="list.error" :class="styles.Error">Error: {{ list.error.message }}</div>
    <div :class="styles.Status">
      Sorted by: {{ descriptor ? `${descriptor.column} (${descriptor.direction})` : 'none' }}
    </div>

    <table :class="styles.Table">
      <thead>
        <tr>
          <th v-for="{ key, label } in columns" :key="key" @click="handleSort(key as keyof User)">
            {{ label }}
            <template v-if="list.sortDescriptor?.column === key">
              <ArrowUpIcon v-if="list.sortDescriptor?.direction === 'ascending'" />
              <ArrowDownIcon v-else />
            </template>
            <ArrowUpDownIcon v-else />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in list.items" :key="user.id">
          <td>{{ user.name }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.phone }}</td>
          <td>{{ user.website }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
