<script setup lang="ts">
// biome-ignore lint/style/useImportType: intentional
import { Combobox, useListCollection } from '@ark-ui/vue/combobox'
import { useFilter } from '@ark-ui/vue/locale'
import { ref } from 'vue'

const filters = useFilter({ sensitivity: 'base' })

const selectedValue = ref<string[]>([])

const { collection, filter, remove } = useListCollection({
  initialItems: ['React', 'Solid', 'Vue', 'Svelte'],
  filter: filters.value.contains,
})

const handleInputChange = (details: Combobox.InputValueChangeDetails) => {
  filter(details.inputValue)
}

const handleValueChange = (details: Combobox.ValueChangeDetails) => {
  selectedValue.value = details.value
  remove(...details.value)
}
</script>

<template>
  <Combobox.Root
    :collection="collection"
    @input-value-change="handleInputChange"
    @value-change="handleValueChange"
    multiple
  >
    <Combobox.Label>Frameworks</Combobox.Label>
    <Combobox.Control>
      <div class="combobox-tag-group">
        <div v-for="(value, index) in selectedValue" :key="index" class="combobox-tag">{{ value }}</div>
      </div>
      <Combobox.Input />
      <Combobox.Trigger>Open</Combobox.Trigger>
      <Combobox.ClearTrigger>Clear</Combobox.ClearTrigger>
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

<style scoped>
.combobox-tag {
  display: inline-block;
  padding: 0.25rem;
  border: 1px solid gray;
  font-family: monospace;
}

.combobox-tag-group {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
</style>
