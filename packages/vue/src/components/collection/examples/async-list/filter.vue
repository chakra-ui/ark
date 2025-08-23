<script setup lang="ts">
import { useAsyncList } from '@ark-ui/vue/collection'

interface User {
  id: number
  name: string
  email: string
  department: string
  role: string
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const mockUsers: User[] = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', department: 'Engineering', role: 'Senior Developer' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', department: 'Marketing', role: 'Marketing Manager' },
  { id: 3, name: 'Carol Davis', email: 'carol@example.com', department: 'Engineering', role: 'Frontend Developer' },
  { id: 4, name: 'David Wilson', email: 'david@example.com', department: 'Sales', role: 'Sales Representative' },
  { id: 5, name: 'Eva Brown', email: 'eva@example.com', department: 'Engineering', role: 'DevOps Engineer' },
  { id: 6, name: 'Frank Miller', email: 'frank@example.com', department: 'Support', role: 'Customer Success' },
  { id: 7, name: 'Grace Lee', email: 'grace@example.com', department: 'Marketing', role: 'Content Creator' },
  { id: 8, name: 'Henry Taylor', email: 'henry@example.com', department: 'Engineering', role: 'Backend Developer' },
  { id: 9, name: 'Ivy Anderson', email: 'ivy@example.com', department: 'Sales', role: 'Account Manager' },
  { id: 10, name: 'Jack Thompson', email: 'jack@example.com', department: 'Support', role: 'Technical Support' },
  { id: 11, name: 'Kate Martinez', email: 'kate@example.com', department: 'Marketing', role: 'Brand Manager' },
  { id: 12, name: 'Liam Garcia', email: 'liam@example.com', department: 'Engineering', role: 'Full Stack Developer' },
  { id: 13, name: 'Mia Rodriguez', email: 'mia@example.com', department: 'Sales', role: 'Sales Director' },
  { id: 14, name: 'Noah Lopez', email: 'noah@example.com', department: 'Support', role: 'Support Manager' },
  { id: 15, name: 'Olivia White', email: 'olivia@example.com', department: 'Engineering', role: 'UI Designer' },
  { id: 16, name: 'Paul Harris', email: 'paul@example.com', department: 'Marketing', role: 'Digital Marketer' },
  { id: 17, name: 'Quinn Clark', email: 'quinn@example.com', department: 'Engineering', role: 'Mobile Developer' },
  { id: 18, name: 'Ruby Lewis', email: 'ruby@example.com', department: 'Sales', role: 'Business Development' },
  { id: 19, name: 'Sam Young', email: 'sam@example.com', department: 'Support', role: 'Documentation Specialist' },
  { id: 20, name: 'Tina Walker', email: 'tina@example.com', department: 'Marketing', role: 'Social Media Manager' },
]

const list = useAsyncList<User>({
  initialItems: mockUsers.slice(0, 5),
  async load({ filterText }: { filterText?: string } = {}) {
    await delay(500)

    if (!filterText) {
      return { items: mockUsers.slice(0, 5) }
    }

    const filtered = mockUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(filterText.toLowerCase()) ||
        user.email.toLowerCase().includes(filterText.toLowerCase()),
    )

    return { items: filtered }
  },
})
</script>

<template>
  <div>
    <div>
      <input
        type="text"
        placeholder="Search users..."
        :value="list.filterText"
        @input="list.setFilterText((($event.currentTarget as HTMLInputElement).value ?? '')"
      />
      <span v-if="list.loading">Loading...</span>
    </div>

    <div v-if="list.error">Error: {{ list.error.message }}</div>

    <div>
      <div v-for="user in list.items" :key="user.id">
        <div>
          <strong>{{ user.name }}</strong>
        </div>
        <div>{{ user.email }}</div>
        <div>{{ user.department }} • {{ user.role }}</div>
      </div>
    </div>

    <div v-if="list.items.length === 0 && !list.loading">No results found</div>
  </div>
</template>
