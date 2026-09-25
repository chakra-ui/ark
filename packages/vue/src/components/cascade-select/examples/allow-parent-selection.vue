<script setup lang="ts">
import { CascadeSelect, createCascadeCollection } from '@ark-ui/vue/cascade-select'
import { ChevronsUpDownIcon, XIcon } from 'lucide-vue-next'
import styles from 'styles/cascade-select.module.css'
import TreeNode from './tree-node.vue'

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
        label: 'Electronics',
        value: 'electronics',
        children: [
          {
            label: 'Phones',
            value: 'phones',
            children: [
              { label: 'Android', value: 'android' },
              { label: 'iPhone', value: 'iphone' },
            ],
          },
          {
            label: 'Laptops',
            value: 'laptops',
            children: [
              { label: 'Gaming', value: 'gaming-laptop' },
              { label: 'Ultrabook', value: 'ultrabook' },
            ],
          },
        ],
      },
      {
        label: 'Clothing',
        value: 'clothing',
        children: [
          { label: 'Shirts', value: 'shirts' },
          { label: 'Pants', value: 'pants' },
        ],
      },
    ],
  },
})
</script>

<template>
  <CascadeSelect.Root :class="styles.Root" :collection="collection" allowParentSelection>
    <CascadeSelect.Label :class="styles.Label">Category</CascadeSelect.Label>
    <CascadeSelect.Control :class="styles.Control">
      <CascadeSelect.Trigger :class="styles.Trigger">
        <CascadeSelect.ValueText :class="styles.ValueText" placeholder="Select a category" />
        <CascadeSelect.Indicator :class="styles.Indicator">
          <ChevronsUpDownIcon />
        </CascadeSelect.Indicator>
      </CascadeSelect.Trigger>
      <CascadeSelect.ClearTrigger :class="styles.ClearTrigger">
        <XIcon />
      </CascadeSelect.ClearTrigger>
    </CascadeSelect.Control>
    <Teleport to="body">
      <CascadeSelect.Positioner>
        <CascadeSelect.Content :class="styles.Content">
          <TreeNode :node="collection.rootNode" :collection="collection" />
        </CascadeSelect.Content>
      </CascadeSelect.Positioner>
    </Teleport>
    <CascadeSelect.HiddenInput />
  </CascadeSelect.Root>
</template>
