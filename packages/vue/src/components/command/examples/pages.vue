<script setup lang="ts">
import { Command, createPageListCollection } from '@ark-ui/vue/command'
import { ChevronRightIcon, SearchIcon } from 'lucide-vue-next'
import { ref } from 'vue'
import styles from 'styles/command.module.css'

const collection = createPageListCollection({
  items: [
    { value: 'theme', label: 'Change theme' },
    { value: 'language', label: 'Change language' },
    { value: 'sign-out', label: 'Sign out' },
    { value: 'light', label: 'Light', parent: 'theme' },
    { value: 'dark', label: 'Dark', parent: 'theme' },
    { value: 'system', label: 'System', parent: 'theme' },
    { value: 'english', label: 'English', parent: 'language' },
    { value: 'french', label: 'French', parent: 'language' },
  ],
})

const selected = ref<string | null>(null)
</script>

<template>
  <div class="stack">
    <output>Selected: {{ selected ?? 'none' }}</output>
    <Command.Root :class="styles.Root" :collection="collection" @select="(details) => (selected = details.itemValue)">
      <Command.Label :class="styles.Label">Settings</Command.Label>
      <Command.Context v-slot="command">
        <div :class="styles.Breadcrumb">
          <button type="button" @click="command.setPage(null)">Home</button>
          <span v-for="page in command.path" :key="page.value">
            <ChevronRightIcon />
            <button type="button" @click="command.setPage(page.value)">{{ page.label }}</button>
          </span>
        </div>
        <Command.Control :class="styles.Control">
          <SearchIcon />
          <Command.Input
            :class="styles.Input"
            :placeholder="command.page ? 'Search... (Backspace to go back)' : 'Search settings...'"
          />
        </Command.Control>
        <Command.List :class="styles.List">
          <Command.Item v-for="item in command.collection.items" :key="item.value" :item="item" :class="styles.Item">
            <Command.ItemText :class="styles.ItemText">{{ item.label }}</Command.ItemText>
            <span v-if="command.getAncestors(item).length > 0" :class="styles.ItemPath">
              {{
                command
                  .getAncestors(item)
                  .map((page) => page.label)
                  .join(' › ')
              }}
            </span>
            <ChevronRightIcon v-if="command.isPage(item)" />
          </Command.Item>
        </Command.List>
      </Command.Context>
      <Command.Empty :class="styles.Empty">No results found</Command.Empty>
    </Command.Root>
  </div>
</template>
