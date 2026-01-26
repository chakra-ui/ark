<script setup lang="ts">
// biome-ignore lint/style/useImportType: intentional
import { Combobox, useListCollection } from '@ark-ui/vue/combobox'
import { useFilter } from '@ark-ui/vue/locale'
import { ref } from 'vue'
import styles from 'styles/combobox.module.css'

const filters = useFilter({ sensitivity: 'base' })

const selectedItems = ref<{ label: string; value: string }[]>([])

const { collection, filter, remove } = useListCollection({
  initialItems: [
    { label: 'JavaScript', value: 'js' },
    { label: 'TypeScript', value: 'ts' },
    { label: 'Python', value: 'python' },
    { label: 'Go', value: 'go' },
    { label: 'Rust', value: 'rust' },
    { label: 'Java', value: 'java' },
  ],
  filter: filters.value.contains,
})

const handleInputChange = (details: Combobox.InputValueChangeDetails) => {
  filter(details.inputValue)
}

const handleValueChange = (details: Combobox.ValueChangeDetails) => {
  selectedItems.value = details.items
  remove(...details.value)
}
</script>

<template>
  <Combobox.Root
    :class="styles.Root"
    :collection="collection"
    @input-value-change="handleInputChange"
    @value-change="handleValueChange"
    multiple
  >
    <Combobox.Label :class="styles.Label">Skills</Combobox.Label>
    <div :class="styles.Tags">
      <span v-if="selectedItems.length === 0" :class="styles.TagPlaceholder">None selected</span>
      <span v-for="item in selectedItems" :key="item.value" :class="styles.Tag">{{ item.label }}</span>
    </div>
    <Combobox.Control :class="styles.Control">
      <Combobox.Input :class="styles.Input" placeholder="e.g. JavaScript" />
      <div :class="styles.Indicators">
        <Combobox.Trigger :class="styles.Trigger">Open</Combobox.Trigger>
      </div>
    </Combobox.Control>
    <Teleport to="body">
      <Combobox.Positioner>
        <Combobox.Content :class="styles.Content">
          <Combobox.Empty :class="styles.Item">No skills found</Combobox.Empty>
          <Combobox.Item v-for="item in collection.items" :key="item.value" :item="item" :class="styles.Item">
            <Combobox.ItemText :class="styles.ItemText">{{ item.label }}</Combobox.ItemText>
            <Combobox.ItemIndicator :class="styles.ItemIndicator">✓</Combobox.ItemIndicator>
          </Combobox.Item>
        </Combobox.Content>
      </Combobox.Positioner>
    </Teleport>
  </Combobox.Root>
</template>
