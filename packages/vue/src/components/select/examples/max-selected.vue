<script setup lang="ts">
// biome-ignore lint/style/useImportType: intentional
import { Select, createListCollection } from '@ark-ui/vue/select'
import { ChevronsUpDownIcon, XIcon } from 'lucide-vue-next'
import { computed, ref } from 'vue'
import styles from 'styles/select.module.css'

const items = ['React', 'Solid', 'Vue', 'Svelte']

const value = ref<string[]>([])
const MAX_SELECTION = 2

const hasReachedMax = (value: string[]) => value.length >= MAX_SELECTION

const collection = computed(() =>
  createListCollection({
    items: items.map((item) => ({
      label: item,
      value: item,
      disabled: hasReachedMax(value.value) && !value.value.includes(item),
    })),
  }),
)

const handleValueChange = (details: Select.ValueChangeDetails) => {
  if (hasReachedMax(value.value) && details.value.length > value.value.length) return
  value.value = details.value
}
</script>

<template>
  <Select.Root :class="styles.Root" :collection="collection" multiple :value="value" @value-change="handleValueChange">
    <Select.Label :class="styles.Label">Framework</Select.Label>
    <Select.Control :class="styles.Control">
      <Select.Trigger :class="styles.Trigger">
        <Select.ValueText :class="styles.ValueText" placeholder="Select" />
        <Select.Indicator :class="styles.Indicator">
          <ChevronsUpDownIcon />
        </Select.Indicator>
      </Select.Trigger>
      <Select.ClearTrigger :class="styles.ClearTrigger">
        <XIcon />
      </Select.ClearTrigger>
    </Select.Control>
    <Teleport to="body">
      <Select.Positioner>
        <Select.Content :class="styles.Content">
          <Select.ItemGroup :class="styles.ItemGroup">
            <Select.ItemGroupLabel :class="styles.ItemGroupLabel">Frameworks</Select.ItemGroupLabel>
            <Select.Item v-for="item in collection.items" :key="item.value" :item="item" :class="styles.Item">
              <Select.ItemText :class="styles.ItemText">{{ item.label }}</Select.ItemText>
              <Select.ItemIndicator :class="styles.ItemIndicator">✓</Select.ItemIndicator>
            </Select.Item>
          </Select.ItemGroup>
        </Select.Content>
      </Select.Positioner>
    </Teleport>
    <Select.HiddenSelect />
  </Select.Root>
</template>
