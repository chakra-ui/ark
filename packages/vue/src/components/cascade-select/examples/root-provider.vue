<script setup lang="ts">
import { CascadeSelect, createCascadeCollection, useCascadeSelect } from '@ark-ui/vue/cascade-select'
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
        label: 'Americas',
        value: 'americas',
        children: [
          {
            label: 'United States',
            value: 'us',
            children: [
              { label: 'New York', value: 'new-york' },
              { label: 'California', value: 'california' },
            ],
          },
        ],
      },
      {
        label: 'Europe',
        value: 'europe',
        children: [
          {
            label: 'France',
            value: 'france',
            children: [
              { label: 'Paris', value: 'paris' },
              { label: 'Lyon', value: 'lyon' },
            ],
          },
        ],
      },
    ],
  },
})

const cascadeSelect = useCascadeSelect({ collection })
</script>

<template>
  <output>value: {{ JSON.stringify(cascadeSelect.value) }}</output>

  <CascadeSelect.RootProvider :class="styles.Root" :value="cascadeSelect">
    <CascadeSelect.Label :class="styles.Label">Location</CascadeSelect.Label>
    <CascadeSelect.Control :class="styles.Control">
      <CascadeSelect.Trigger :class="styles.Trigger">
        <CascadeSelect.ValueText :class="styles.ValueText" :placeholder="'Select a location'" />
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
  </CascadeSelect.RootProvider>
</template>
