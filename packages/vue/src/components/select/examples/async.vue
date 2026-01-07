<script setup lang="ts">
// biome-ignore lint/style/useImportType: intentional
import { Select, createListCollection } from '@ark-ui/vue/select'
import { ChevronsUpDownIcon } from 'lucide-vue-next'
import { computed, ref } from 'vue'
import styles from 'styles/select.module.css'

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
  <Select.Root :class="styles.Root" :collection="collection" @open-change="handleOpenChange">
    <Select.Label :class="styles.Label">Framework</Select.Label>
    <Select.Control :class="styles.Control">
      <Select.Trigger :class="styles.Trigger">
        <Select.ValueText :class="styles.ValueText" placeholder="Select" />
        <Select.Indicator :class="styles.Indicator">
          <ChevronsUpDownIcon />
        </Select.Indicator>
      </Select.Trigger>
    </Select.Control>
    <Teleport to="body">
      <Select.Positioner>
        <Select.Content :class="styles.Content">
          <div v-if="loading" :class="styles.Item">Loading...</div>
          <div v-else-if="error" :class="styles.Item">Error: {{ error.message }}</div>
          <template v-else>
            <Select.Item v-for="item in collection.items" :key="item" :item="item" :class="styles.Item">
              <Select.ItemText :class="styles.ItemText">{{ item }}</Select.ItemText>
              <Select.ItemIndicator :class="styles.ItemIndicator">✓</Select.ItemIndicator>
            </Select.Item>
          </template>
        </Select.Content>
      </Select.Positioner>
    </Teleport>
    <Select.HiddenSelect />
  </Select.Root>
</template>
