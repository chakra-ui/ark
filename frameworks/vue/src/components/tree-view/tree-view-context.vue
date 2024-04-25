<script lang="ts">
import type { SlotsType, UnwrapRef } from 'vue'
import type { UseTreeViewContext } from './use-tree-view-context'

export interface TreeViewContextProps
  extends SlotsType<{
    default: UnwrapRef<UseTreeViewContext>
  }> {}
</script>

<script setup lang="ts">
import { useTreeViewContext } from './use-tree-view-context'

const treeView = useTreeViewContext()

defineSlots<{
  default(treeView: UnwrapRef<UseTreeViewContext>): unknown
}>()
</script>

<template>
  <slot v-bind="treeView"></slot>
</template>

