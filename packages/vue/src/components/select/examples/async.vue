<script setup lang="ts">
// biome-ignore lint/style/useImportType: <explanation>
import { Select, createListCollection } from '@ark-ui/vue/select'
import { ChevronDownIcon } from 'lucide-vue-next'
import { computed, ref } from 'vue'

function loadData() {
  return new Promise<string[]>((resolve) => {
    setTimeout(() => resolve(['React', 'Solid', 'Vue', 'Svelte', 'Angular', 'Ember']), 500)
  })
}

const data = ref<string[] | null>(null)
const loading = ref(false)
const error = ref<Error | null>(null)

const collection = computed(() =>
  createListCollection({
    items: data.value ?? [],
  }),
)

const handleOpenChange = async (details: Select.OpenChangeDetails) => {
  if (details.open && data.value === null) {
    loading.value = true
    error.value = null
    try {
      const result = await loadData()
      data.value = result
    } catch (err) {
      error.value = err as Error
    } finally {
      loading.value = false
    }
  }
}
</script>

<template>
  <Select.Root :collection="collection" @open-change="handleOpenChange">
    <Select.Label>Framework</Select.Label>
    <Select.Control>
      <Select.Trigger>
        <Select.ValueText placeholder="Select" />
        <Select.Indicator>
          <ChevronDownIcon />
        </Select.Indicator>
      </Select.Trigger>
      <Select.ClearTrigger>Clear</Select.ClearTrigger>
    </Select.Control>
    <Teleport to="body">
      <Select.Positioner>
        <Select.Content>
          <div v-if="loading">Loading...</div>
          <div v-else-if="error">Error: {{ error.message }}</div>
          <template v-else>
            <Select.Item v-for="item in collection.items" :key="item" :item="item">
              <Select.ItemText>{{ item }}</Select.ItemText>
              <Select.ItemIndicator>✓</Select.ItemIndicator>
            </Select.Item>
          </template>
        </Select.Content>
      </Select.Positioner>
    </Teleport>
    <Select.HiddenSelect />
  </Select.Root>
</template>
