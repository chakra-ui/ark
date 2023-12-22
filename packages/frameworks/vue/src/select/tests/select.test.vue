<script setup lang="ts">
import { ref } from 'vue'
import { Select } from '../'

const items = ref([
  { label: 'React', value: 'react' },
  { label: 'Solid', value: 'solid' },
  { label: 'Vue', value: 'vue' },
  { label: 'Svelte', value: 'svelte', disabled: true },
])
</script>

<template>
  <Select.Root :items="items">
    <Select.Label>Framework</Select.Label>
    <Select.Control>
      <Select.Trigger>
        <Select.ValueText placeholder="Select a Framework" />
        <Select.Indicator>▼</Select.Indicator>
      </Select.Trigger>
      <Select.ClearTrigger>Clear</Select.ClearTrigger>
    </Select.Control>
    <Teleport to="body">
      <Select.Positioner data-testid="positioner">
        <Select.Content>
          <Select.ItemGroup id="framework">
            <Select.ItemGroupLabel htmlFor="framework">Frameworks</Select.ItemGroupLabel>
            <Select.Item v-for="item in items" :key="item.value" :item="item">
              <Select.ItemText>{{ item.label }}</Select.ItemText>
              <Select.ItemIndicator>✓</Select.ItemIndicator>
            </Select.Item>
          </Select.ItemGroup>
        </Select.Content>
      </Select.Positioner>
    </Teleport>
  </Select.Root>
</template>
