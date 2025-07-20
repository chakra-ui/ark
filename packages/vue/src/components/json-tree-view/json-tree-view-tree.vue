<script lang="ts">
export interface JsonTreeViewTreeBaseProps extends JsonTreeViewNodeBaseProps {}

export interface JsonTreeViewTreeProps extends TreeView.TreeProps, JsonTreeViewTreeBaseProps {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { createSplitProps } from '../create-split-props'
import { TreeView, useTreeViewContext } from '../tree-view'
import JsonTreeViewNode, { type JsonTreeViewNodeBaseProps } from './json-tree-view-node.vue'

const props = defineProps<JsonTreeViewTreeProps>()

const splitTreeNodeProps = createSplitProps<JsonTreeViewNodeBaseProps>()
const [nodeProps, treeProps] = splitTreeNodeProps(props, ['indentGuide'])

const tree = useTreeViewContext()
const children = computed(() => tree.value.collection.getNodeChildren(tree.value.collection.rootNode))

defineSlots<{
  default(props: { node: import('@zag-js/json-tree-utils').JsonNodeHastElement }): unknown
  arrow(): unknown
  indentGuide(): unknown
}>()
</script>

<template>
  <TreeView.Tree data-scope="json-tree-view" v-bind="treeProps">
    <JsonTreeViewNode
      v-for="(child, index) in children"
      :key="index"
      :node="child"
      :index-path="[index]"
      v-bind="nodeProps"
    >
      <template #default="{ node: childNode }">
        <slot :node="childNode" />
      </template>
      <template #arrow>
        <slot name="arrow" />
      </template>
      <template #indentGuide>
        <slot name="indentGuide" />
      </template>
    </JsonTreeViewNode>
  </TreeView.Tree>
</template>
