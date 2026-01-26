<script setup lang="ts">
// biome-ignore lint/style/useImportType: intentional
import { Combobox, useListCollection } from '@ark-ui/vue/combobox'
import styles from 'styles/combobox.module.css'

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
  <Combobox.Root :class="styles.Root" :collection="collection" @input-value-change="handleInputChange">
    <Combobox.Label :class="styles.Label">Email</Combobox.Label>
    <Combobox.Control :class="styles.Control">
      <Combobox.Input :class="styles.Input" placeholder="e.g. john" />
      <div :class="styles.Indicators">
        <Combobox.Trigger :class="styles.Trigger">Open</Combobox.Trigger>
      </div>
    </Combobox.Control>
    <Teleport to="body">
      <Combobox.Positioner>
        <Combobox.Content :class="styles.Content">
          <Combobox.Item v-for="item in collection.items" :key="item" :item="item" :class="styles.Item">
            <Combobox.ItemText :class="styles.ItemText">{{ item }}</Combobox.ItemText>
            <Combobox.ItemIndicator :class="styles.ItemIndicator">✓</Combobox.ItemIndicator>
          </Combobox.Item>
        </Combobox.Content>
      </Combobox.Positioner>
    </Teleport>
  </Combobox.Root>
</template>
