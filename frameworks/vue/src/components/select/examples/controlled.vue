<script setup lang="ts">
import { ChevronDownIcon } from 'lucide-vue-next'
import { ref } from 'vue'
import { Select } from '../..'

const basicItems = ref(['React', 'Solid', 'Vue'])
const advancedItems = ref([
  { label: 'React', value: 'react' },
  { label: 'Solid', value: 'solid' },
  { label: 'Vue', value: 'vue' },
  { label: 'Svelte', value: 'svelte', disabled: true },
])

const value = ref(['vue'])
</script>

<template>
  <Select.Root :items="advancedItems" v-model="value">
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
          <Select.ItemGroup id="framework">
            <Select.ItemGroupLabel htmlFor="framework">Frameworks</Select.ItemGroupLabel>
            <Select.Item v-for="item in advancedItems" :key="item.value" :item="item">
              <Select.ItemText>{{ item.label }}</Select.ItemText>
              <Select.ItemIndicator>✓</Select.ItemIndicator>
            </Select.Item>
          </Select.ItemGroup>
        </Select.Content>
      </Select.Positioner>
    </Teleport>
  </Select.Root>
</template>
