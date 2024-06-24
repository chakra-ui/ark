<script setup lang="ts">
import { ref } from 'vue'
import { Field, Select } from '../..'
import { ChevronDownIcon } from './icons'

const items = ref(['React', 'Solid', 'Vue'])
</script>

<template>
  <Field.Root>
    <Select.Root :items="items">
      <Select.Label>Label</Select.Label>
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
              <Select.Item v-for="item in items" :key="item" :item="item">
                <Select.ItemText>{{ item }}</Select.ItemText>
                <Select.ItemIndicator>✓</Select.ItemIndicator>
              </Select.Item>
            </Select.ItemGroup>
          </Select.Content>
        </Select.Positioner>
      </Teleport>
      <Select.HiddenSelect />
    </Select.Root>
    <Field.HelperText>Additional Info</Field.HelperText>
    <Field.ErrorText>Error Info</Field.ErrorText>
  </Field.Root>
</template>
