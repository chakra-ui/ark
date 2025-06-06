<script setup lang="ts">
import { Listbox, createListCollection } from '@ark-ui/vue/listbox'

const collection = createListCollection({
  items: ['React', 'Solid', 'Vue'],
})
</script>

<template>
  <Listbox.Root :collection="collection" :defaultValue="['React']" selectionMode="multiple">
    <Listbox.Label>
      Select your Framework:
      <Listbox.ValueText />
    </Listbox.Label>
    <Listbox.Content>
      <Listbox.Item v-for="item in collection.items" :key="item" :item="item">
        <Listbox.ItemText>{{ item }}</Listbox.ItemText>
        <Listbox.ItemIndicator />
      </Listbox.Item>
    </Listbox.Content>
  </Listbox.Root>
</template>
