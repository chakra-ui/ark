<script setup lang="ts">
// biome-ignore lint/style/useImportType: intentional
import { Combobox, useListCollection } from '@ark-ui/vue/combobox'
import { useFilter } from '@ark-ui/vue/locale'
import styles from 'styles/combobox.module.css'

const filters = useFilter({ sensitivity: 'base' })

const { collection, filter } = useListCollection({
  initialItems: [
    { label: 'Engineering', value: 'engineering' },
    { label: 'Marketing', value: 'marketing' },
    { label: 'Sales', value: 'sales' },
    { label: 'Finance', value: 'finance' },
    { label: 'Human Resources', value: 'hr' },
    { label: 'Operations', value: 'operations' },
    { label: 'Product', value: 'product' },
    { label: 'Customer Success', value: 'customer-success' },
    { label: 'Legal', value: 'legal' },
    { label: 'Information Technology', value: 'information-technology' },
    { label: 'Design', value: 'design' },
  ],
  filter: filters.value.contains,
})

const handleInputChange = (details: Combobox.InputValueChangeDetails) => {
  filter(details.inputValue)
}
</script>

<template>
  <Combobox.Root
    :class="styles.Root"
    :collection="collection"
    @input-value-change="handleInputChange"
    input-behavior="autohighlight"
  >
    <Combobox.Label :class="styles.Label">Department</Combobox.Label>
    <Combobox.Control :class="styles.Control">
      <Combobox.Input :class="styles.Input" placeholder="e.g. Engineering" />
      <div :class="styles.Indicators">
        <Combobox.ClearTrigger :class="styles.ClearTrigger">Clear</Combobox.ClearTrigger>
        <Combobox.Trigger :class="styles.Trigger">Open</Combobox.Trigger>
      </div>
    </Combobox.Control>
    <Teleport to="body">
      <Combobox.Positioner>
        <Combobox.Content :class="styles.Content">
          <Combobox.Empty :class="styles.Item">No results found</Combobox.Empty>
          <Combobox.Item v-for="item in collection.items" :key="item.value" :item="item" :class="styles.Item">
            <Combobox.ItemText :class="styles.ItemText">{{ item.label }}</Combobox.ItemText>
            <Combobox.ItemIndicator :class="styles.ItemIndicator">✓</Combobox.ItemIndicator>
          </Combobox.Item>
        </Combobox.Content>
      </Combobox.Positioner>
    </Teleport>
  </Combobox.Root>
</template>
