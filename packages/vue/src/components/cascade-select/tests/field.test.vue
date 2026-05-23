<script setup lang="ts">
import { Field, type FieldRootProps } from '../../field'
import { CascadeSelect, createCascadeCollection } from '../'
import TreeNode from './tree-node.test.vue'

interface Node {
  label: string
  value: string
  children?: Node[]
}

const collection = createCascadeCollection<Node>({
  nodeToValue: (node) => node.value,
  nodeToString: (node) => node.label,
  rootNode: {
    label: 'Root',
    value: 'root',
    children: [
      {
        label: 'Fruits',
        value: 'fruits',
        children: [
          { label: 'Apple', value: 'apple' },
          { label: 'Banana', value: 'banana' },
        ],
      },
    ],
  },
})

const props = defineProps<FieldRootProps>()
</script>

<template>
  <Field.Root v-bind="props">
    <CascadeSelect.Root :collection="collection">
      <CascadeSelect.Label>Label</CascadeSelect.Label>
      <CascadeSelect.Control>
        <CascadeSelect.Trigger>
          <CascadeSelect.ValueText placeholder="Select a category" />
          <CascadeSelect.Indicator>▼</CascadeSelect.Indicator>
        </CascadeSelect.Trigger>
        <CascadeSelect.ClearTrigger>Clear</CascadeSelect.ClearTrigger>
      </CascadeSelect.Control>
      <CascadeSelect.Positioner>
        <CascadeSelect.Content>
          <TreeNode :node="collection.rootNode" :collection="collection" />
        </CascadeSelect.Content>
      </CascadeSelect.Positioner>
      <CascadeSelect.HiddenInput />
    </CascadeSelect.Root>
    <Field.HelperText>Additional Info</Field.HelperText>
    <Field.ErrorText>Error Info</Field.ErrorText>
  </Field.Root>
</template>
