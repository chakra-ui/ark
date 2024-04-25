<script lang="ts">
import type { SlotsType, UnwrapRef } from 'vue'
import type { UseTreeViewItemContext } from './use-tree-view-item-context'

export interface TreeViewItemContextProps
  extends SlotsType<{
    default: UnwrapRef<UseTreeViewItemContext>
  }> {}
</script>

<script setup lang="ts">
import { useTreeViewItemContext } from './use-tree-view-item-context'
const item = useTreeViewItemContext()

defineSlots<{
  default(item: UnwrapRef<UseTreeViewItemContext>): unknown
}>()
</script>

<template>
  <slot v-bind="item"></slot>
</template>

