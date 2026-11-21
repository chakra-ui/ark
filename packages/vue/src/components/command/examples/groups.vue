<script setup lang="ts">
import { Command, createListCollection } from '@ark-ui/vue/command'
import { SearchIcon } from 'lucide-vue-next'
import styles from 'styles/command.module.css'

const collection = createListCollection({
  items: [
    { value: 'calendar', label: 'Calendar', group: 'Suggestions' },
    { value: 'emoji', label: 'Search emoji', group: 'Suggestions' },
    { value: 'calculator', label: 'Calculator', group: 'Suggestions', disabled: true },
    { value: 'profile', label: 'Profile', group: 'Settings' },
    { value: 'billing', label: 'Billing', group: 'Settings' },
    { value: 'preferences', label: 'Preferences', group: 'Settings' },
  ],
  groupBy: (item) => item.group,
})
</script>

<template>
  <Command.Root :class="styles.Root" :collection="collection">
    <Command.Label :class="styles.Label">Commands</Command.Label>
    <Command.Control :class="styles.Control">
      <SearchIcon />
      <Command.Input :class="styles.Input" placeholder="Search..." />
    </Command.Control>
    <Command.Context v-slot="command">
      <Command.List :class="styles.List">
        <Command.ItemGroup v-for="[group, items] in command.collection.group()" :key="group" :class="styles.ItemGroup">
          <Command.ItemGroupLabel :class="styles.ItemGroupLabel">{{ group }}</Command.ItemGroupLabel>
          <Command.Item v-for="item in items" :key="item.value" :item="item" :class="styles.Item">
            <Command.ItemText :class="styles.ItemText">{{ item.label }}</Command.ItemText>
          </Command.Item>
        </Command.ItemGroup>
      </Command.List>
    </Command.Context>
    <Command.Empty :class="styles.Empty">No results found</Command.Empty>
  </Command.Root>
</template>
