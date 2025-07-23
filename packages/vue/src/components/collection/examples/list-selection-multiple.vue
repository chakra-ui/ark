<script setup lang="ts">
import { createListCollection, useListSelection } from '@ark-ui/vue/collection'

const collection = createListCollection({
  items: ['React', 'Vue', 'Angular', 'Svelte', 'Solid'],
})

const selection = useListSelection({
  collection,
  selectionMode: 'multiple',
})

const handleSelectAll = () => {
  if (selection.isAllSelected()) {
    selection.clear()
  } else {
    selection.setSelectedValues(collection.getValues())
  }
}
</script>

<template>
  <div>
    <div :style="{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '16px' }">
      <button @click="handleSelectAll">
        {{ selection.isAllSelected() ? 'Deselect All' : 'Select All' }}
      </button>
      <span>{{ selection.selectedValues.value.length }} of {{ collection.items.length }} selected</span>
    </div>

    <label
      v-for="item in collection.items"
      :key="item"
      :style="{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        userSelect: 'none',
        backgroundColor: selection.isSelected(item) ? 'lightblue' : 'white',
      }"
    >
      <input type="checkbox" :checked="selection.isSelected(item)" @change="selection.select(item)" />
      <span>{{ item }}</span>
    </label>
  </div>
</template>
