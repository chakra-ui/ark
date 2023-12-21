<script setup lang="ts">
import { Select } from './'
import './select.css'

const items = ['React', 'Solid', 'Vue']
</script>

<template>
  <Story title="Select">
    <Variant title="Basic">
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
    </Variant>
  </Story>
</template>
