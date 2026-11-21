<script setup lang="ts">
import { Select, createListCollection } from '@ark-ui/vue/select'

const collection = createListCollection({ items: ['React', 'Solid', 'Vue'] })

const props = defineProps<{ multiple?: boolean; defaultValue?: string[] }>()
</script>

<template>
  <form data-testid="form">
    <Select.Root
      :collection="collection"
      name="framework"
      :multiple="props.multiple"
      :default-value="props.defaultValue"
    >
      <Select.Label>Framework</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select a Framework" />
        </Select.Trigger>
      </Select.Control>
      <Select.Positioner>
        <Select.Content>
          <Select.Item v-for="item in collection.items" :key="item" :item="item">
            <Select.ItemText>{{ item }}</Select.ItemText>
          </Select.Item>
        </Select.Content>
      </Select.Positioner>
      <Select.HiddenInput />
    </Select.Root>
  </form>
</template>
