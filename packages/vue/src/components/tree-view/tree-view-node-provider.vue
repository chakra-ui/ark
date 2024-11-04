<script lang="ts">
import type { NodeProps } from '@zag-js/tree-view'
import type { TreeNode } from '../collection'

export interface TreeViewNodeProviderBaseProps<T> extends NodeProps {
  node: T
}
export interface TreeViewNodeProviderProps<T extends TreeNode>
  extends TreeViewNodeProviderBaseProps<T> {}
</script>

<script setup lang="ts" generic="T extends TreeNode">
import { useForwardExpose } from '../../utils'
import { TreeViewNodePropsProvider } from './use-tree-view-node-props-context'

const props = defineProps<TreeViewNodeProviderBaseProps<T>>()
TreeViewNodePropsProvider(props)

useForwardExpose()
</script>

<template>
  <slot />
</template>
