<script setup lang="ts">
// biome-ignore lint/style/useImportType: intentional
import { Combobox, useListCollection } from '@ark-ui/vue/combobox'
import { Highlight } from '@ark-ui/vue/highlight'
import { useFilter } from '@ark-ui/vue/locale'
import styles from 'styles/combobox.module.css'

const filters = useFilter({ sensitivity: 'base' })

const { collection, filter } = useListCollection({
  initialItems: [
    { label: 'John Smith', value: 'john-smith' },
    { label: 'Jane Doe', value: 'jane-doe' },
    { label: 'Bob Johnson', value: 'bob-johnson' },
    { label: 'Alice Williams', value: 'alice-williams' },
    { label: 'Charlie Brown', value: 'charlie-brown' },
    { label: 'Diana Ross', value: 'diana-ross' },
  ],
  filter: filters.value.contains,
})

const handleInputChange = (details: Combobox.InputValueChangeDetails) => {
  filter(details.inputValue)
}
</script>

<template>
  <Combobox.Root :class="styles.Root" :collection="collection" @input-value-change="handleInputChange">
    <Combobox.Label :class="styles.Label">Assignee</Combobox.Label>
    <Combobox.Control :class="styles.Control">
      <Combobox.Input :class="styles.Input" placeholder="e.g. John Smith" />
      <div :class="styles.Indicators">
        <Combobox.ClearTrigger :class="styles.ClearTrigger">Clear</Combobox.ClearTrigger>
        <Combobox.Trigger :class="styles.Trigger">Open</Combobox.Trigger>
      </div>
    </Combobox.Control>
    <Teleport to="body">
      <Combobox.Positioner>
        <Combobox.Content :class="styles.Content">
          <Combobox.Item v-for="item in collection.items" :key="item.value" :item="item" :class="styles.Item">
            <Combobox.ItemText :class="styles.ItemText">
              <Combobox.Context v-slot="context">
                <Highlight :text="item.label" :query="context.inputValue" ignore-case />
              </Combobox.Context>
            </Combobox.ItemText>
          </Combobox.Item>
        </Combobox.Content>
      </Combobox.Positioner>
    </Teleport>
  </Combobox.Root>
</template>
