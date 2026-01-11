<script setup lang="ts">
import { Combobox, createListCollection } from '../..'
import { Field } from '../../field'

interface Item {
  label: string
  value: string
}

const props = defineProps<{
  disabled?: boolean
  invalid?: boolean
  readOnly?: boolean
  required?: boolean
}>()

const collection = createListCollection<Item>({
  items: [
    { label: 'React', value: 'react' },
    { label: 'Solid', value: 'solid' },
    { label: 'Vue', value: 'vue' },
  ],
})
</script>

<template>
  <Field.Root
    :disabled="props.disabled"
    :invalid="props.invalid"
    :read-only="props.readOnly"
    :required="props.required"
  >
    <Combobox.Root :collection="collection">
      <Combobox.Label>Label</Combobox.Label>
      <Combobox.Control>
        <Combobox.Input />
        <Combobox.Trigger>Open</Combobox.Trigger>
        <Combobox.ClearTrigger>Clear</Combobox.ClearTrigger>
      </Combobox.Control>
      <Teleport to="body">
        <Combobox.Positioner>
          <Combobox.Content>
            <Combobox.Item v-for="item in collection.items" :key="item.value" :item="item">
              <Combobox.ItemText>{{ item.label }}</Combobox.ItemText>
              <Combobox.ItemIndicator>✓</Combobox.ItemIndicator>
            </Combobox.Item>
          </Combobox.Content>
        </Combobox.Positioner>
      </Teleport>
    </Combobox.Root>
    <Field.HelperText>Additional Info</Field.HelperText>
    <Field.ErrorText>Error Info</Field.ErrorText>
  </Field.Root>
</template>
