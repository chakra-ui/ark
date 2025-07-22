<script setup lang="ts">
import { useListSelection } from '@ark-ui/vue/collection'
import { createListCollection } from '../list-collection'

const collection = createListCollection({
  items: ['React', 'Vue', 'Angular'],
})

const selection = useListSelection({
  collection,
})
</script>

<template>
  <div>
    <pre>{{ JSON.stringify(selection.selectedValues.value) }}</pre>
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
