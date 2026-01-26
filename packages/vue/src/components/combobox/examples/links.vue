<script setup lang="ts">
// biome-ignore lint/style/useImportType: intentional
import { Combobox, useListCollection } from '@ark-ui/vue/combobox'
import { useFilter } from '@ark-ui/vue/locale'
import styles from 'styles/combobox.module.css'

const initialItems = [
  { label: 'GitHub', href: 'https://github.com', value: 'github' },
  { label: 'Stack Overflow', href: 'https://stackoverflow.com', value: 'stackoverflow' },
  { label: 'MDN Web Docs', href: 'https://developer.mozilla.org', value: 'mdn' },
  { label: 'Dev.to', href: 'https://dev.to', value: 'devto' },
  { label: 'Hacker News', href: 'https://news.ycombinator.com', value: 'hackernews' },
  { label: 'Reddit Programming', href: 'https://reddit.com/r/programming', value: 'reddit' },
]

const filters = useFilter({ sensitivity: 'base' })

const { collection, filter } = useListCollection({
  initialItems,
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
    selection-behavior="preserve"
  >
    <Combobox.Label :class="styles.Label">Developer Resources</Combobox.Label>
    <Combobox.Control :class="styles.Control">
      <Combobox.Input :class="styles.Input" placeholder="e.g. GitHub" />
      <div :class="styles.Indicators">
        <Combobox.Trigger :class="styles.Trigger">Open</Combobox.Trigger>
      </div>
    </Combobox.Control>
    <Teleport to="body">
      <Combobox.Positioner>
        <Combobox.Content :class="styles.Content">
          <Combobox.Item
            v-for="item in collection.items"
            :key="item.value"
            :item="item"
            :class="styles.Item"
            :as-child="true"
          >
            <a :href="item.href">
              <Combobox.ItemText :class="styles.ItemText">{{ item.label }}</Combobox.ItemText>
              <Combobox.ItemIndicator :class="styles.ItemIndicator">✓</Combobox.ItemIndicator>
            </a>
          </Combobox.Item>
        </Combobox.Content>
      </Combobox.Positioner>
    </Teleport>
  </Combobox.Root>
</template>
