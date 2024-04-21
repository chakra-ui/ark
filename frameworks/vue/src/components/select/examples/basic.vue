<script setup lang="ts">
import { ChevronDownIcon } from 'lucide-vue-next'
import { ref } from 'vue'
import { Select } from '../..'

const items = ref(['React', 'Solid', 'Vue'])
</script>

<template>
  <Select.Root :items="items">
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
            <Select.Item v-for="item in items" :key="item" :item="item">
              <Select.ItemText>{{ item }}</Select.ItemText>
              <Select.ItemIndicator>✓</Select.ItemIndicator>
            </Select.Item>
          </Select.ItemGroup>
        </Select.Content>
      </Select.Positioner>
    </Teleport>
  </Select.Root>
</template>
