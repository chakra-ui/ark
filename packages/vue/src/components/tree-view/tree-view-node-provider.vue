<script lang="ts">
import type { NodeProps } from '@zag-js/tree-view'
import type { TreeNode } from '../collection'
import { TreeViewNodeStateProvider } from './use-tree-view-node-context'

export interface TreeViewNodeProviderBaseProps<T> extends NodeProps {
  node: T
}
export interface TreeViewNodeProviderProps<T extends TreeNode> extends TreeViewNodeProviderBaseProps<T> {}
</script>

<script setup lang="ts" generic="T extends TreeNode">
import { useForwardExpose } from '../../utils'
import { TreeViewNodePropsProvider } from './use-tree-view-node-props-context'
import { useTreeViewContext } from './use-tree-view-context'
import { computed } from 'vue'

const props = defineProps<TreeViewNodeProviderBaseProps<T>>()

const treeView = useTreeViewContext()
const nodeState = computed(() => treeView.value.getNodeState(props))

TreeViewNodeStateProvider(nodeState)
TreeViewNodePropsProvider(props)

useForwardExpose()
</script>

<template>
  <slot />
</template>
