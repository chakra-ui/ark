<script setup lang="ts">
import { Command, createListCollection } from '@ark-ui/vue/command'
import { CopyIcon, FilePlusIcon, FolderOpenIcon, SaveIcon, SearchIcon, SettingsIcon } from 'lucide-vue-next'
import { ref } from 'vue'
import styles from 'styles/command.module.css'

const collection = createListCollection({
  items: [
    { value: 'new-file', label: 'New file', icon: FilePlusIcon, shortcut: '⌘N' },
    { value: 'open-file', label: 'Open file', icon: FolderOpenIcon, shortcut: '⌘O' },
    { value: 'save', label: 'Save', icon: SaveIcon, shortcut: '⌘S' },
    { value: 'copy-path', label: 'Copy path', icon: CopyIcon, shortcut: '⌥⌘C' },
    { value: 'settings', label: 'Open settings', icon: SettingsIcon, shortcut: '⌘,' },
  ],
})

const selected = ref<string | null>(null)
</script>

<template>
  <div class="stack">
    <output>Selected: {{ selected ?? 'none' }}</output>
    <Command.Root :class="styles.Root" :collection="collection" @select="(details) => (selected = details.itemValue)">
      <Command.Label :class="styles.Label">Commands</Command.Label>
      <Command.Control :class="styles.Control">
        <SearchIcon />
        <Command.Input :class="styles.Input" placeholder="Type a command or search..." />
      </Command.Control>
      <Command.Context v-slot="command">
        <Command.List :class="styles.List">
          <Command.Item v-for="item in command.collection.items" :key="item.value" :item="item" :class="styles.Item">
            <span :class="styles.ItemStart">
              <component :is="item.icon" />
              <Command.ItemText :class="styles.ItemText">{{ item.label }}</Command.ItemText>
            </span>
            <kbd :class="styles.Shortcut">{{ item.shortcut }}</kbd>
          </Command.Item>
        </Command.List>
      </Command.Context>
      <Command.Empty :class="styles.Empty">No commands found</Command.Empty>
    </Command.Root>
  </div>
</template>
