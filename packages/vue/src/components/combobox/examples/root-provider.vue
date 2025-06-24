<script setup lang="ts">
import { Combobox, useCombobox, useListCollection } from '@ark-ui/vue/combobox'
import { useFilter } from '@ark-ui/vue/locale'

const filters = useFilter({ sensitivity: 'base' })

const { collection, filter } = useListCollection({
  initialItems: ['React', 'Solid', 'Vue', 'Svelte'],
  filter: filters.value.contains,
})

const combobox = useCombobox({
  get collection() {
    return collection.value
  },
  onInputValueChange(details) {
    filter(details.inputValue)
  },
})
</script>

<template>
  <button @click="combobox.focus()">Focus</button>

  <Combobox.RootProvider :value="combobox">
    <Combobox.Label>Framework</Combobox.Label>
    <Combobox.Control>
      <Combobox.Input />
      <Combobox.Trigger>Open</Combobox.Trigger>
      <Combobox.ClearTrigger>Clear</Combobox.ClearTrigger>
    </Combobox.Control>
    <Teleport to="body">
      <Combobox.Positioner>
        <Combobox.Content>
          <Combobox.ItemGroup>
            <Combobox.ItemGroupLabel>Frameworks</Combobox.ItemGroupLabel>
            <Combobox.Item v-for="item in collection.items" :key="item" :item="item">
              <Combobox.ItemText>{{ item }}</Combobox.ItemText>
              <Combobox.ItemIndicator>✓</Combobox.ItemIndicator>
            </Combobox.Item>
          </Combobox.ItemGroup>
        </Combobox.Content>
      </Combobox.Positioner>
    </Teleport>
  </Combobox.RootProvider>
</template>
