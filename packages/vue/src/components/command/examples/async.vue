<script setup lang="ts">
import { Command, createListCollection } from '@ark-ui/vue/command'
import { SearchIcon } from 'lucide-vue-next'
import { computed, ref, watch } from 'vue'
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

const inputValue = ref('')
const names = ref<string[]>([])
const loading = ref(true)

watch(
  inputValue,
  (value, _prev, onCleanup) => {
    let active = true
    loading.value = true
    search(value).then((result) => {
      if (!active) return
      names.value = result
      loading.value = false
    })
    onCleanup(() => {
      active = false
    })
  },
  { immediate: true },
)

const collection = computed(() =>
  createListCollection({
    items: names.value.map((name) => ({ value: name.toLowerCase().replace(/\s+/g, '-'), label: name })),
  }),
)
</script>

<template>
  <Command.Root
    :class="styles.Root"
    :collection="collection"
    :filter="matchAll"
    :loading="loading"
    @input-value-change="(details) => (inputValue = details.inputValue)"
  >
    <Command.Label :class="styles.Label">People</Command.Label>
    <Command.Control :class="styles.Control">
      <SearchIcon />
      <Command.Input :class="styles.Input" placeholder="Search people..." />
    </Command.Control>
    <Command.List :class="styles.List">
      <Command.Item v-for="item in collection.items" :key="item.value" :item="item" :class="styles.Item">
        <Command.ItemText :class="styles.ItemText">{{ item.label }}</Command.ItemText>
      </Command.Item>
    </Command.List>
    <div v-if="loading" :class="styles.Loading">Loading...</div>
    <Command.Empty v-else :class="styles.Empty">No people found</Command.Empty>
  </Command.Root>
</template>
