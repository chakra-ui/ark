<script setup lang="ts">
import { Listbox, createListCollection } from '@ark-ui/vue/listbox'
import { CheckIcon } from 'lucide-vue-next'
import styles from 'styles/listbox.module.css'

const collection = createListCollection({
  items: [
    { label: 'React', value: 'react' },
    { label: 'Vue', value: 'vue' },
    { label: 'Angular', value: 'angular' },
    { label: 'Svelte', value: 'svelte' },
    { label: 'Solid', value: 'solid' },
    { label: 'Preact', value: 'preact' },
  ],
})
</script>

<template>
  <Listbox.Root :class="styles.Root" :collection="collection" selectionMode="extended">
    <Listbox.Label :class="styles.Label">
      Hold
      <kbd>⌘</kbd>
      or
      <kbd>Ctrl</kbd>
      to select multiple
    </Listbox.Label>
    <Listbox.Content :class="styles.Content">
      <Listbox.Item v-for="item in collection.items" :key="item.value" :class="styles.Item" :item="item">
        <Listbox.ItemText :class="styles.ItemText">{{ item.label }}</Listbox.ItemText>
        <Listbox.ItemIndicator :class="styles.ItemIndicator">
          <CheckIcon />
        </Listbox.ItemIndicator>
      </Listbox.Item>
    </Listbox.Content>
  </Listbox.Root>
</template>
