<script lang="ts">
import type { JsonNodeHastElement } from '@zag-js/json-tree-utils'
import type { TreeViewTreeProps } from '../tree-view/tree-view-tree.vue'
import type { JsonTreeViewNodeBaseProps } from './json-tree-view-node.vue'

export interface JsonTreeViewTreeBaseProps extends JsonTreeViewNodeBaseProps {}

export interface JsonTreeViewTreeProps extends TreeViewTreeProps, JsonTreeViewTreeBaseProps {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { createSplitProps } from '../create-split-props'
import TreeViewTree from '../tree-view/tree-view-tree.vue'
import { useTreeViewContext } from '../tree-view/use-tree-view-context'
import JsonTreeViewNode from './json-tree-view-node.vue'

const props = defineProps<JsonTreeViewTreeProps>()

const splitTreeNodeProps = createSplitProps<JsonTreeViewNodeBaseProps>()
const [nodeProps, treeProps] = splitTreeNodeProps(props, ['indentGuide'])

const tree = useTreeViewContext()
const children = computed(() => tree.value.collection.getNodeChildren(tree.value.collection.rootNode))

defineSlots<{
  default(props: { node: JsonNodeHastElement }): unknown
  arrow(): unknown
  indentGuide(): unknown
}>()
</script>

<template>
  <TreeViewTree data-scope="json-tree-view" v-bind="treeProps">
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
  </TreeViewTree>
</template>
