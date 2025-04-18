<script setup lang="ts">
import { Listbox, createListCollection } from '@ark-ui/vue/listbox'

const collection = createListCollection({
  items: [
    { label: 'React', value: 'react' },
    { label: 'Solid', value: 'solid' },
    { label: 'Svelte', value: 'svelte', disabled: true },
    { label: 'Vue', value: 'vue' },
  ],
})
</script>

<template>
  <Listbox.Root :collection="collection">
    <Listbox.Label>Select your Framework</Listbox.Label>
    <Listbox.Content>
      <Listbox.Item v-for="item in collection.items" :key="item.value" :item="item">
        <Listbox.ItemText>{{ item.label }}</Listbox.ItemText>
        <Listbox.ItemIndicator />
      </Listbox.Item>
    </Listbox.Content>
  </Listbox.Root>
</template>
