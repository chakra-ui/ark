<script setup lang="ts">
import { createListCollection, useListSelection } from '@ark-ui/vue/collection'
import styles from 'styles/list-selection.module.css'

const collection = createListCollection({
  items: [
    { label: 'React', value: 'react' },
    { label: 'Vue', value: 'vue' },
    { label: 'Angular', value: 'angular' },
    { label: 'Svelte', value: 'svelte' },
    { label: 'Solid', value: 'solid' },
  ],
})

const selection = useListSelection({
  collection,
  selectionMode: 'multiple',
})

const handleItemClick = (value: string, event: MouseEvent) => {
  if (event.shiftKey && selection.firstSelectedValue.value) {
    selection.extend(selection.firstSelectedValue.value, value)
  } else if (event.ctrlKey || event.metaKey) {
    selection.toggle(value)
  } else {
    selection.replace(value)
  }
}
</script>

<template>
  <div :class="styles.Root">
    <output>Selected: {{ selection.selectedValues.value.join(', ') || 'None' }}</output>
    <label
      v-for="item in collection.items"
      :key="item.value"
      :class="styles.Item"
      :data-selected="selection.isSelected(item.value) || undefined"
    >
      <input
        type="checkbox"
        :class="styles.Checkbox"
        :checked="selection.isSelected(item.value)"
        readonly
        @click="(e: MouseEvent) => handleItemClick(item.value, e)"
      />
      <span :class="styles.ItemText">{{ item.label }}</span>
    </label>
    <p :class="styles.HelperText">Click to select • Shift+Click for range • Cmd/Ctrl+Click to toggle</p>
  </div>
</template>
