<script setup lang="ts">
import { CascadeSelect, type CascadeSelectRootEmits, type CascadeSelectRootProps, createCascadeCollection } from '../..'
import { useForwardPropsEmits } from '../../..'
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
      {
        label: 'Vegetables',
        value: 'vegetables',
        children: [
          { label: 'Carrot', value: 'carrot' },
          { label: 'Broccoli', value: 'broccoli' },
        ],
      },
    ],
  },
})

const props = defineProps<Omit<CascadeSelectRootProps<Node>, 'collection'>>()
const emits = defineEmits<CascadeSelectRootEmits>()
const localProps = useForwardPropsEmits(props, emits)
</script>

<template>
  <CascadeSelect.Root :collection="collection" v-bind="localProps">
    <CascadeSelect.Label>Category</CascadeSelect.Label>
    <CascadeSelect.Control>
      <CascadeSelect.Trigger>
        <CascadeSelect.ValueText placeholder="Select a category" />
        <CascadeSelect.Indicator>▼</CascadeSelect.Indicator>
      </CascadeSelect.Trigger>
      <CascadeSelect.ClearTrigger>Clear</CascadeSelect.ClearTrigger>
    </CascadeSelect.Control>
    <CascadeSelect.Positioner data-testid="positioner">
      <CascadeSelect.Content>
        <TreeNode :node="collection.rootNode" :collection="collection" />
      </CascadeSelect.Content>
    </CascadeSelect.Positioner>
    <CascadeSelect.HiddenInput />
  </CascadeSelect.Root>
</template>
