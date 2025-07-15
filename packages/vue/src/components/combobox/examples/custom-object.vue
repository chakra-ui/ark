<script setup lang="ts">
// biome-ignore lint/style/useImportType: <explanation>
import { Combobox, useListCollection } from '@ark-ui/vue/combobox'
import { useFilter } from '@ark-ui/vue/locale'

const filters = useFilter({ sensitivity: 'base' })

const { collection, filter } = useListCollection({
  initialItems: [
    { country: 'United States', code: 'US', flag: '🇺🇸' },
    { country: 'Canada', code: 'CA', flag: '🇨🇦' },
    { country: 'Australia', code: 'AU', flag: '🇦🇺' },
  ],
  itemToString: (item) => item.country,
  itemToValue: (item) => item.code,
  filter: filters.value.contains,
})

const handleInputChange = (details: Combobox.InputValueChangeDetails) => {
  filter(details.inputValue)
}
</script>

<template>
  <Combobox.Root :collection="collection" @input-value-change="handleInputChange">
    <Combobox.Control>
      <Combobox.Input />
      <Combobox.Trigger>Open</Combobox.Trigger>
      <Combobox.ClearTrigger>Clear</Combobox.ClearTrigger>
    </Combobox.Control>
    <Teleport to="body">
      <Combobox.Positioner>
        <Combobox.Content>
          <Combobox.ItemGroup>
            <Combobox.ItemGroupLabel>Countries</Combobox.ItemGroupLabel>
            <Combobox.Item v-for="item in collection.items" :key="item.code" :item="item">
              <Combobox.ItemText>{{ item.country }}</Combobox.ItemText>
              <Combobox.ItemIndicator>✓</Combobox.ItemIndicator>
            </Combobox.Item>
          </Combobox.ItemGroup>
        </Combobox.Content>
      </Combobox.Positioner>
    </Teleport>
  </Combobox.Root>
</template>
