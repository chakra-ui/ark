<script setup lang="ts">
import { Select, createListCollection, useSelect } from '@ark-ui/vue/select'
import { ChevronsUpDownIcon } from 'lucide-vue-next'
import styles from 'styles/select.module.css'

const collection = createListCollection({
  items: ['React', 'Solid', 'Vue', 'Svelte'],
})

const select = useSelect({
  collection,
  onHighlightChange({ highlightedValue }) {
    if (highlightedValue) {
      select.value.selectValue(highlightedValue)
    }
  },
})
</script>

<template>
  <Select.RootProvider :class="styles.Root" :value="select">
    <Select.Label :class="styles.Label">Framework</Select.Label>
    <Select.Control :class="styles.Control">
      <Select.Trigger :class="styles.Trigger">
        <Select.ValueText :class="styles.ValueText" placeholder="Select a Framework" />
        <Select.Indicator :class="styles.Indicator">
          <ChevronsUpDownIcon />
        </Select.Indicator>
      </Select.Trigger>
    </Select.Control>
    <Teleport to="body">
      <Select.Positioner>
        <Select.Content :class="styles.Content">
          <Select.Item v-for="item in collection.items" :key="item" :item="item" :class="styles.Item">
            <Select.ItemText :class="styles.ItemText">{{ item }}</Select.ItemText>
            <Select.ItemIndicator :class="styles.ItemIndicator">✓</Select.ItemIndicator>
          </Select.Item>
        </Select.Content>
      </Select.Positioner>
    </Teleport>
    <Select.HiddenSelect />
  </Select.RootProvider>
</template>
