<script setup lang="ts">
// biome-ignore lint/style/useImportType: intentional
import { Combobox, useListCollection } from '@ark-ui/vue/combobox'
import { useFilter } from '@ark-ui/vue/locale'
import styles from 'styles/combobox.module.css'

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
  <Combobox.Root :class="styles.Root" :collection="collection" @input-value-change="handleInputChange">
    <Combobox.Label :class="styles.Label">Country</Combobox.Label>
    <Combobox.Control :class="styles.Control">
      <Combobox.Input :class="styles.Input" placeholder="e.g. Canada" />
      <div :class="styles.Indicators">
        <Combobox.ClearTrigger :class="styles.ClearTrigger">Clear</Combobox.ClearTrigger>
        <Combobox.Trigger :class="styles.Trigger">Open</Combobox.Trigger>
      </div>
    </Combobox.Control>
    <Teleport to="body">
      <Combobox.Positioner>
        <Combobox.Content :class="styles.Content">
          <Combobox.Item v-for="item in collection.items" :key="item.code" :item="item" :class="styles.Item">
            <Combobox.ItemText :class="styles.ItemText">{{ item.flag }} {{ item.country }}</Combobox.ItemText>
            <Combobox.ItemIndicator :class="styles.ItemIndicator">✓</Combobox.ItemIndicator>
          </Combobox.Item>
        </Combobox.Content>
      </Combobox.Positioner>
    </Teleport>
  </Combobox.Root>
</template>
