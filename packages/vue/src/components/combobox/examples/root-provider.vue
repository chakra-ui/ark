<script setup lang="ts">
import { Combobox, useCombobox, useListCollection } from '@ark-ui/vue/combobox'
import { useFilter } from '@ark-ui/vue/locale'
import button from 'styles/button.module.css'
import styles from 'styles/combobox.module.css'

const filters = useFilter({ sensitivity: 'base' })

const initialItems = [
  { label: 'Designer', value: 'designer' },
  { label: 'Developer', value: 'developer' },
  { label: 'Product Manager', value: 'pm' },
  { label: 'Data Scientist', value: 'data-scientist' },
  { label: 'DevOps Engineer', value: 'devops' },
  { label: 'Marketing Lead', value: 'marketing' },
]

const { collection, filter } = useListCollection({
  initialItems,
  filter: filters.value.contains,
})

const combobox = useCombobox({
  get collection() {
    return collection.value
  },
  onInputValueChange(details) {
    filter(details.inputValue)
  },
})
</script>

<template>
  <div class="stack">
    <button :class="button.Root" @click="combobox.focus()">Focus</button>

    <Combobox.RootProvider :class="styles.Root" :value="combobox">
      <Combobox.Label :class="styles.Label">Job Title</Combobox.Label>
      <Combobox.Control :class="styles.Control">
        <Combobox.Input :class="styles.Input" placeholder="e.g. Designer" />
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
    </Combobox.RootProvider>
  </div>
</template>
