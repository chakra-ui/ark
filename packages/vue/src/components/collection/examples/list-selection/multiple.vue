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

const handleSelectAll = () => {
  if (selection.isAllSelected()) {
    selection.clear()
  } else {
    selection.setSelectedValues(collection.getValues())
  }
}
</script>

<template>
  <div :class="styles.Root">
    <div :class="styles.Header">
      <span :class="styles.Count">
        {{ selection.selectedValues.value.length }} of {{ collection.items.length }} selected
      </span>
      <button type="button" :class="styles.SelectAllButton" @click="handleSelectAll">
        {{ selection.isAllSelected() ? 'Deselect all' : 'Select all' }}
      </button>
    </div>
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
        @change="selection.select(item.value)"
      />
      <span :class="styles.ItemText">{{ item.label }}</span>
    </label>
  </div>
</template>
