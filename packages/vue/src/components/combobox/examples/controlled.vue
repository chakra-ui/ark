<script setup lang="ts">
// biome-ignore lint/style/useImportType: intentional
import { Combobox, useListCollection } from '@ark-ui/vue/combobox'
import { useFilter } from '@ark-ui/vue/locale'
import { ref } from 'vue'
import styles from 'styles/combobox.module.css'

const filters = useFilter({ sensitivity: 'base' })

const { collection, filter } = useListCollection({
  initialItems: [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Cherry', value: 'cherry' },
    { label: 'Date', value: 'date' },
  ],
  filter: filters.value.contains,
})

const handleInputChange = (details: Combobox.InputValueChangeDetails) => {
  filter(details.inputValue)
}

const value = ref<string[]>([])
</script>

<template>
  <Combobox.Root :class="styles.Root" v-model="value" :collection="collection" @input-value-change="handleInputChange">
    <Combobox.Label :class="styles.Label">Fruit</Combobox.Label>
    <Combobox.Control :class="styles.Control">
      <Combobox.Input :class="styles.Input" placeholder="e.g. Apple" />
      <div :class="styles.Indicators">
        <Combobox.ClearTrigger :class="styles.ClearTrigger">Clear</Combobox.ClearTrigger>
        <Combobox.Trigger :class="styles.Trigger">Open</Combobox.Trigger>
      </div>
    </Combobox.Control>
    <Teleport to="body">
      <Combobox.Positioner>
        <Combobox.Content :class="styles.Content">
          <Combobox.Item v-for="item in collection.items" :key="item.value" :item="item" :class="styles.Item">
            <Combobox.ItemText :class="styles.ItemText">{{ item.label }}</Combobox.ItemText>
            <Combobox.ItemIndicator :class="styles.ItemIndicator">✓</Combobox.ItemIndicator>
          </Combobox.Item>
        </Combobox.Content>
      </Combobox.Positioner>
    </Teleport>
    <p>Value: {{ value.join(', ') }}</p>
  </Combobox.Root>
</template>
