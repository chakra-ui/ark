<script setup lang="ts">
// biome-ignore lint/style/useImportType: <explanation>
import { Combobox, createListCollection } from '@ark-ui/vue/combobox'
import { useFilter } from '@ark-ui/vue/locale'
import { computed, ref } from 'vue'

const initialItems = [
  { label: 'React', value: 'react', type: 'JS' },
  { label: 'Solid', value: 'solid', type: 'JS' },
  { label: 'Vue', value: 'vue', type: 'JS' },
  { label: 'Panda', value: 'panda', type: 'CSS' },
  { label: 'Tailwind', value: 'tailwind', type: 'CSS' },
]

const items = ref(initialItems)

const collection = computed(() =>
  createListCollection({
    items: items.value,
    groupBy: (item) => item.type,
  }),
)

const filter = useFilter({ sensitivity: 'base' })

const handleInputChange = (details: Combobox.InputValueChangeDetails) => {
  items.value = initialItems.filter((item) => filter.value.contains(item.label, details.inputValue))
}
</script>

<template>
  <Combobox.Root :collection="collection" @input-value-change="handleInputChange">
    <Combobox.Label>Framework</Combobox.Label>
    <Combobox.Control>
      <Combobox.Input />
      <Combobox.Trigger>Open</Combobox.Trigger>
      <Combobox.ClearTrigger>Clear</Combobox.ClearTrigger>
    </Combobox.Control>
    <Teleport to="body">
      <Combobox.Positioner>
        <Combobox.Content>
          <Combobox.ItemGroup :key="type" v-for="[type, group] in collection.group()">
            <Combobox.ItemGroupLabel>{{ type }}</Combobox.ItemGroupLabel>
            <Combobox.Item v-for="item in group" :key="item.value" :item="item">
              <Combobox.ItemText>{{ item.label }}</Combobox.ItemText>
              <Combobox.ItemIndicator>✓</Combobox.ItemIndicator>
            </Combobox.Item>
          </Combobox.ItemGroup>
        </Combobox.Content>
      </Combobox.Positioner>
    </Teleport>
  </Combobox.Root>
</template>
