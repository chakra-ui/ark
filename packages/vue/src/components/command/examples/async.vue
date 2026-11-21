<script setup lang="ts">
import { useAsyncList } from '@ark-ui/vue/collection'
import { Command, createListCollection } from '@ark-ui/vue/command'
import { SearchIcon } from 'lucide-vue-next'
import { computed } from 'vue'
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

const list = useAsyncList<Person>({
  async load({ filter, signal }) {
    await new Promise((resolve) => setTimeout(resolve, 300))
    if (signal?.aborted) return { items: [] }
    const query = (filter ?? '').toLowerCase()
    return { items: people.filter((person) => person.name.toLowerCase().includes(query)) }
  },
})

const collection = computed(() =>
  createListCollection({
    items: list.value.items,
    itemToValue: (item) => item.id,
    itemToString: (item) => item.name,
  }),
)
</script>

<template>
  <Command.Root
    :class="styles.Root"
    :collection="collection"
    :filter="matchAll"
    :loading="list.isLoading"
    @input-value-change="(details) => list.setFilter(details.inputValue)"
  >
    <Command.Label :class="styles.Label">People</Command.Label>
    <Command.Control :class="styles.Control">
      <SearchIcon />
      <Command.Input :class="styles.Input" placeholder="Search people..." />
    </Command.Control>
    <Command.List :class="styles.List">
      <Command.Item v-for="item in collection.items" :key="item.id" :item="item" :class="styles.Item">
        <Command.ItemText :class="styles.ItemText">{{ item.name }}</Command.ItemText>
      </Command.Item>
    </Command.List>
    <div v-if="list.isLoading" :class="styles.Loading">Loading...</div>
    <div v-else-if="list.error" :class="styles.Empty">{{ list.error.message }}</div>
    <Command.Empty v-else :class="styles.Empty">No people found</Command.Empty>
  </Command.Root>
</template>
