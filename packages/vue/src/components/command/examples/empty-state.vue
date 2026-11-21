<script setup lang="ts">
import { Command, createListCollection } from '@ark-ui/vue/command'
import { SearchIcon } from 'lucide-vue-next'
import { ref } from 'vue'
import styles from 'styles/command.module.css'

const collection = createListCollection({
  items: [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' },
  ],
})

const inputValue = ref('xyz')
</script>

<template>
  <Command.Root :class="styles.Root" :collection="collection" v-model:input-value="inputValue">
    <Command.Label :class="styles.Label">Fruits</Command.Label>
    <Command.Control :class="styles.Control">
      <SearchIcon />
      <Command.Input :class="styles.Input" placeholder="Search fruits..." />
    </Command.Control>
    <Command.Context v-slot="command">
      <Command.List :class="styles.List">
        <Command.Item v-for="item in command.collection.items" :key="item.value" :item="item" :class="styles.Item">
          <Command.ItemText :class="styles.ItemText">{{ item.label }}</Command.ItemText>
        </Command.Item>
      </Command.List>
    </Command.Context>
    <Command.Empty :class="styles.Empty">No results for “{{ inputValue }}”</Command.Empty>
  </Command.Root>
</template>
