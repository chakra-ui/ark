<script setup lang="ts">
import { Listbox, createListCollection } from '@ark-ui/vue/listbox'
import { ref } from 'vue'

const collection = createListCollection({
  items: ['React', 'Solid', 'Vue', 'Svelte'],
})
const value = ref(['React'])
</script>

<template>
  <Listbox.Root :collection="collection" v-model="value">
    <Listbox.Label>Framework</Listbox.Label>
    <Listbox.Content>
      <Listbox.Item v-for="item in collection.items" :key="item" :item="item">
        <Listbox.ItemText>{{ item }}</Listbox.ItemText>
        <Listbox.ItemIndicator />
      </Listbox.Item>
    </Listbox.Content>
  </Listbox.Root>
</template>
