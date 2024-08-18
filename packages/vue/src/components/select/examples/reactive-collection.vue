<script setup lang="ts">
import { CheckIcon } from 'lucide-vue-next'
import { computed, ref } from 'vue'
import { Select } from '../..'

const itemsBase = [
  { label: 'React', value: 'react' },
  { label: 'Solid', value: 'solid' },
  { label: 'Svelte', value: 'svelte', disabled: true },
  { label: 'Vue', value: 'vue' },
]

const number = ref(0)
const inc = () => number.value++
const dec = () => number.value--
const items = computed(() => {
  return itemsBase.map((item) => ({ ...item, label: `${item.label}-${number.value}` }))
})
</script>

<template>
  <div>
    <button type="button" @click="inc">Inc</button>
    <button type="button" @click="dec">Dec</button>
    <Select.Root :positioning="{ sameWidth: true }" :items="items">
      <Select.Label>Framework</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select a Framework" />
        </Select.Trigger>
      </Select.Control>
      <Select.Positioner>
        <Select.Content>
          <Select.ItemGroup>
            <Select.ItemGroupLabel>Framework</Select.ItemGroupLabel>
            <Select.Item v-for="item in items" :item="item" :key="item.label">
              <Select.ItemText>{{ item.label }}</Select.ItemText>
              <Select.ItemIndicator>
                <CheckIcon />
              </Select.ItemIndicator>
            </Select.Item>
          </Select.ItemGroup>
        </Select.Content>
      </Select.Positioner>
    </Select.Root>
  </div>
</template>
