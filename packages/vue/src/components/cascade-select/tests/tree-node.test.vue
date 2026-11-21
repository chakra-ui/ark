<script setup lang="ts">
import { CascadeSelect, useCascadeSelectContext } from '../'
import type { CascadeSelectCollection } from '../'
import { computed } from 'vue'

defineOptions({ name: 'TreeNode' })

interface Node {
  label: string
  value: string
  children?: Node[]
}

interface Props {
  node: Node
  collection: CascadeSelectCollection<Node>
  indexPath?: number[]
  value?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  indexPath: () => [],
  value: () => [],
})

const cascadeSelect = useCascadeSelectContext()
const nodeState = computed(() =>
  cascadeSelect.value.getItemState({ item: props.node, indexPath: props.indexPath, value: props.value }),
)
</script>

<template>
  <CascadeSelect.List :item="node" :indexPath="indexPath" :value="value">
    <CascadeSelect.Item
      v-for="(child, i) in collection.getNodeChildren(node)"
      :key="collection.getNodeValue(child)"
      :item="child"
      :indexPath="[...indexPath, i]"
      :value="[...value, collection.getNodeValue(child)]"
    >
      <CascadeSelect.ItemText>{{ collection.stringifyNode(child) }}</CascadeSelect.ItemText>
      <CascadeSelect.ItemIndicator v-if="!collection.isBranchNode(child)">✓</CascadeSelect.ItemIndicator>
    </CascadeSelect.Item>
  </CascadeSelect.List>
  <TreeNode
    v-if="nodeState.highlightedChild && collection.isBranchNode(nodeState.highlightedChild)"
    :node="nodeState.highlightedChild as Node"
    :collection="collection"
    :indexPath="[...indexPath, nodeState.highlightedIndex]"
    :value="[...value, collection.getNodeValue(nodeState.highlightedChild as Node)]"
  />
</template>
