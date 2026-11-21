<script setup lang="ts">
import { Command, createListCollection, useCommand } from '@ark-ui/vue/command'
import { SearchIcon } from 'lucide-vue-next'
import button from 'styles/button.module.css'
import styles from 'styles/command.module.css'

const collection = createListCollection({
  items: [
    { value: 'new-file', label: 'New file' },
    { value: 'open-file', label: 'Open file' },
    { value: 'save', label: 'Save' },
  ],
})

const command = useCommand({ collection })
</script>

<template>
  <div class="stack">
    <button type="button" :class="button.Root" @click="command.setInputValue('')">
      Clear search ({{ command.inputValue || 'empty' }})
    </button>
    <Command.RootProvider :class="styles.Root" :value="command">
      <Command.Label :class="styles.Label">Commands</Command.Label>
      <Command.Control :class="styles.Control">
        <SearchIcon />
        <Command.Input :class="styles.Input" placeholder="Search..." />
      </Command.Control>
      <Command.List :class="styles.List">
        <Command.Item v-for="item in command.collection.items" :key="item.value" :item="item" :class="styles.Item">
          <Command.ItemText :class="styles.ItemText">{{ item.label }}</Command.ItemText>
        </Command.Item>
      </Command.List>
      <Command.Empty :class="styles.Empty">No commands found</Command.Empty>
    </Command.RootProvider>
  </div>
</template>
