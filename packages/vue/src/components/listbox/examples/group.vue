<script setup lang="ts">
import { Listbox, createListCollection } from '@ark-ui/vue/listbox'

const collection = createListCollection({
  items: [
    { label: 'React', value: 'react', type: 'JS' },
    { label: 'Solid', value: 'solid', type: 'JS' },
    { label: 'Vue', value: 'vue', type: 'JS' },
    { label: 'Panda', value: 'panda', type: 'CSS' },
    { label: 'Tailwind', value: 'tailwind', type: 'CSS' },
  ],
  groupBy: (item) => item.type,
})
</script>

<template>
  <Listbox.Root :collection="collection">
    <Listbox.Label>Select your Frameworks</Listbox.Label>
    <Listbox.Content>
      <Listbox.ItemGroup v-for="[type, group] in collection.group()" :key="type">
        <Listbox.ItemGroupLabel>{{ type }}</Listbox.ItemGroupLabel>
        <Listbox.Item v-for="item in group" :key="item.value" :item="item">
          <Listbox.ItemText>{{ item.label }}</Listbox.ItemText>
          <Listbox.ItemIndicator />
        </Listbox.Item>
      </Listbox.ItemGroup>
    </Listbox.Content>
  </Listbox.Root>
</template>
