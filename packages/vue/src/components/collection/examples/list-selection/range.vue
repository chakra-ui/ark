<script setup lang="ts">
import { createListCollection, useListSelection } from '@ark-ui/vue/collection'

const items = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'solid', label: 'Solid' },
  { value: 'preact', label: 'Preact' },
  { value: 'qwik', label: 'Qwik' },
  { value: 'lit', label: 'Lit' },
]

const collection = createListCollection({ items })
const selection = useListSelection({
  collection,
  selectionMode: 'multiple',
})

const handleItemClick = (value: string, event: MouseEvent) => {
  if (event.shiftKey && selection.firstSelectedValue.value) {
    // Extend selection from first selected to clicked item
    selection.extend(selection.firstSelectedValue.value, value)
  } else if (event.ctrlKey || event.metaKey) {
    // Toggle individual item
    selection.toggle(value)
  } else {
    // Replace selection with clicked item
    selection.replace(value)
  }
}
</script>

<template>
  <div>
    <div style="margin-bottom: 16px">
      <p><strong>Instructions:</strong></p>
      <ul style="margin: 8px 0; padding-left: 20px">
        <li>Click to select single item</li>
        <li>Ctrl/Cmd + Click to toggle individual items</li>
        <li>Shift + Click to select range from first selected item</li>
      </ul>
    </div>

    <div
      v-for="item in collection.items"
      :key="item.value"
      @click="(e) => handleItemClick(item.value, e)"
      :style="{
        backgroundColor: selection.isSelected(item.value) ? '#e2e8f0' : 'transparent',
        padding: '8px 12px',
        cursor: 'pointer',
        userSelect: 'none',
        border: '1px solid #e2e8f0',
        marginBottom: '2px',
      }"
    >
      {{ item.label }}
    </div>
  </div>
</template>
