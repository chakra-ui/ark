<script setup lang="ts">
// biome-ignore lint/style/useImportType: <explanation>
import { Combobox, createListCollection, useCombobox } from '@ark-ui/vue/combobox'
import { useFilter } from '@ark-ui/vue/locale'
import { computed, ref } from 'vue'

const initialItems = ['React', 'Solid', 'Vue']

const items = ref(initialItems)

const collection = computed(() => createListCollection({ items: items.value }))

const filter = useFilter({ sensitivity: 'base' })

const handleInputChange = (details: Combobox.InputValueChangeDetails) => {
  items.value = initialItems.filter((item) => filter.value.contains(item, details.inputValue))
}

const combobox = useCombobox({
  get collection() {
    return collection.value
  },
  onInputValueChange: handleInputChange,
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
