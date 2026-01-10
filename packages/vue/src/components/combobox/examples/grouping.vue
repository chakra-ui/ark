<script setup lang="ts">
// biome-ignore lint/style/useImportType: intentional
import { Combobox, useListCollection } from '@ark-ui/vue/combobox'
import { useFilter } from '@ark-ui/vue/locale'
import styles from 'styles/combobox.module.css'

const initialItems = [
  { label: 'Canada', value: 'ca', continent: 'North America' },
  { label: 'United States', value: 'us', continent: 'North America' },
  { label: 'Mexico', value: 'mx', continent: 'North America' },
  { label: 'Germany', value: 'de', continent: 'Europe' },
  { label: 'France', value: 'fr', continent: 'Europe' },
  { label: 'United Kingdom', value: 'uk', continent: 'Europe' },
  { label: 'Japan', value: 'jp', continent: 'Asia' },
  { label: 'China', value: 'cn', continent: 'Asia' },
  { label: 'India', value: 'in', continent: 'Asia' },
]

const filters = useFilter({ sensitivity: 'base' })

const { collection, filter } = useListCollection({
  initialItems,
  groupBy: (item) => item.continent,
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
          <Combobox.ItemGroup :key="continent" v-for="[continent, group] in collection.group()">
            <Combobox.ItemGroupLabel :class="styles.ItemGroupLabel">{{ continent }}</Combobox.ItemGroupLabel>
            <Combobox.Item v-for="item in group" :key="item.value" :item="item" :class="styles.Item">
              <Combobox.ItemText :class="styles.ItemText">{{ item.label }}</Combobox.ItemText>
              <Combobox.ItemIndicator :class="styles.ItemIndicator">✓</Combobox.ItemIndicator>
            </Combobox.Item>
          </Combobox.ItemGroup>
        </Combobox.Content>
      </Combobox.Positioner>
    </Teleport>
  </Combobox.Root>
</template>
