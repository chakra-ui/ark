<script setup lang="ts">
// biome-ignore lint/style/useImportType: intentional
import { Combobox, useListCollection } from '@ark-ui/vue/combobox'

const suggestList = ['gmail.com', 'yahoo.com', 'ark-ui.com']

const { collection, set } = useListCollection<string>({
  initialItems: [],
})

const handleInputChange = (details: Combobox.InputValueChangeDetails) => {
  if (details.reason === 'input-change') {
    const items = suggestList.map((item) => `${details.inputValue}@${item}`)
    set(items)
  }
}
</script>

<template>
  <Combobox.Root :collection="collection" @input-value-change="handleInputChange">
    <Combobox.Label>Framework</Combobox.Label>
    <Combobox.Control>
      <Combobox.Input />
      <Combobox.Trigger>Open</Combobox.Trigger>
    </Combobox.Control>
    <Teleport to="body">
      <Combobox.Positioner>
        <Combobox.Content>
          <Combobox.Item v-for="item in collection.items" :key="item" :item="item">
            <Combobox.ItemText>{{ item }}</Combobox.ItemText>
            <Combobox.ItemIndicator>✓</Combobox.ItemIndicator>
          </Combobox.Item>
        </Combobox.Content>
      </Combobox.Positioner>
    </Teleport>
  </Combobox.Root>
</template>
