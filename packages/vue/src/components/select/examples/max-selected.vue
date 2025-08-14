<script setup lang="ts">
// biome-ignore lint/style/useImportType: intentional
import { Select, createListCollection } from '@ark-ui/vue/select'
import { ChevronDownIcon } from 'lucide-vue-next'
import { computed, ref } from 'vue'

const items = ['React', 'Solid', 'Vue', 'Svelte']

const value = ref<string[]>([])
const maxSelected = 2

const hasReachedMax = (value: string[]) => value.length >= maxSelected

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
  if (hasReachedMax(value.value) && details.value.length) return
  value.value = details.value
}
</script>

<template>
  <Select.Root :collection="collection" multiple :value="value" @value-change="handleValueChange">
    <Select.Label>Framework</Select.Label>
    <Select.Control>
      <Select.Trigger>
        <Select.ValueText placeholder="Select a Framework" />
        <Select.Indicator>
          <ChevronDownIcon />
        </Select.Indicator>
      </Select.Trigger>
      <Select.ClearTrigger>Clear</Select.ClearTrigger>
    </Select.Control>
    <Teleport to="body">
      <Select.Positioner>
        <Select.Content>
          <Select.ItemGroup>
            <Select.ItemGroupLabel>Frameworks</Select.ItemGroupLabel>
            <Select.Item v-for="item in collection.items" :key="item.value" :item="item">
              <Select.ItemText>{{ item.label }}</Select.ItemText>
              <Select.ItemIndicator>✓</Select.ItemIndicator>
            </Select.Item>
          </Select.ItemGroup>
        </Select.Content>
      </Select.Positioner>
    </Teleport>
    <Select.HiddenSelect />
  </Select.Root>
</template>
