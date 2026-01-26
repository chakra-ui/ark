<script setup lang="ts">
import { Field, type FieldRootProps } from '../../field'
import { Select, createListCollection } from '../'

const collection = createListCollection({
  items: ['React', 'Solid', 'Vue', 'Svelte'],
})

const props = defineProps<FieldRootProps>()
</script>

<template>
  <Field.Root v-bind="props">
    <Select.Root :collection="collection">
      <Select.Label>Label</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select a Framework" />
          <Select.Indicator>▼</Select.Indicator>
        </Select.Trigger>
      </Select.Control>
      <Select.Positioner>
        <Select.Content>
          <Select.Item v-for="item in collection.items" :key="item" :item="item">
            <Select.ItemText>{{ item }}</Select.ItemText>
            <Select.ItemIndicator>✓</Select.ItemIndicator>
          </Select.Item>
        </Select.Content>
      </Select.Positioner>
      <Select.HiddenSelect />
    </Select.Root>
    <Field.HelperText>Additional Info</Field.HelperText>
    <Field.ErrorText>Error Info</Field.ErrorText>
  </Field.Root>
</template>
