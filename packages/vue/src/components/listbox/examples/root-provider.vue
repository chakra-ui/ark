<script setup lang="ts">
import { Listbox, createListCollection, useListbox } from '@ark-ui/vue/listbox'
import { computed } from 'vue'

const collection = createListCollection({
  items: ['React', 'Solid', 'Vue'],
})

const listboxValue = useListbox({ collection })
const listbox = computed(() => listboxValue.value)
</script>

<template>
  <Listbox.RootProvider :value="listbox">
    <Listbox.Label>Select your Framework</Listbox.Label>
    <Listbox.Content>
      <Listbox.Item v-for="item in collection.items" :key="item" :item="item">
        <Listbox.ItemText>{{ item }}</Listbox.ItemText>
        <Listbox.ItemIndicator />
      </Listbox.Item>
    </Listbox.Content>
  </Listbox.RootProvider>
</template>
