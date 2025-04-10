<script lang="ts">
import type { SlotsType, UnwrapRef } from 'vue'
import type { TreeNode } from '../collection'
import type { UseTreeViewContext } from './use-tree-view-context'

export interface TreeViewContextProps<T extends TreeNode>
  extends SlotsType<{
    default: UnwrapRef<UseTreeViewContext<T>>
  }> {}
</script>

<script setup lang="ts" generic="T extends TreeNode">
import { useTreeViewContext } from './use-tree-view-context'

const treeView = useTreeViewContext()

defineSlots<{
  default(treeView: UnwrapRef<UseTreeViewContext<T>>): unknown
}>()
</script>

<template>
  <slot v-bind="treeView" />
</template>
