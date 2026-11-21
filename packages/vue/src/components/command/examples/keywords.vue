<script setup lang="ts">
import { Command, createListCollection } from '@ark-ui/vue/command'
import { SearchIcon } from 'lucide-vue-next'
import styles from 'styles/command.module.css'

const collection = createListCollection({
  items: [
    { value: 'theme', label: 'Toggle theme', keywords: ['dark', 'light', 'appearance'] },
    { value: 'sign-out', label: 'Sign out', keywords: ['logout', 'exit'] },
    { value: 'shortcuts', label: 'Keyboard shortcuts', keywords: ['hotkeys', 'keybindings'] },
  ],
})
</script>

<template>
  <Command.Root :class="styles.Root" :collection="collection">
    <Command.Label :class="styles.Label">Commands</Command.Label>
    <Command.Control :class="styles.Control">
      <SearchIcon />
      <Command.Input :class="styles.Input" placeholder="Try “dark” or “logout”..." />
    </Command.Control>
    <Command.Context v-slot="command">
      <Command.List :class="styles.List">
        <Command.Item v-for="item in command.collection.items" :key="item.value" :item="item" :class="styles.Item">
          <Command.ItemText :class="styles.ItemText">{{ item.label }}</Command.ItemText>
        </Command.Item>
      </Command.List>
    </Command.Context>
    <Command.Empty :class="styles.Empty">No commands found</Command.Empty>
  </Command.Root>
</template>
