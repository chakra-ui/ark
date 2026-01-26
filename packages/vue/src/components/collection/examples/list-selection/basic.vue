<script setup lang="ts">
import { createListCollection, useListSelection } from '@ark-ui/vue/collection'
import styles from 'styles/list-selection.module.css'

const collection = createListCollection({
  items: [
    { label: 'React', value: 'react' },
    { label: 'Vue', value: 'vue' },
    { label: 'Angular', value: 'angular' },
    { label: 'Svelte', value: 'svelte' },
  ],
})

const selection = useListSelection({ collection })
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
        @change="selection.select(item.value)"
      />
      <span :class="styles.ItemText">{{ item.label }}</span>
    </label>
  </div>
</template>
