<script lang="ts">
import type { SlotsType, UnwrapRef } from 'vue'

export interface TreeViewNodeContextProps
  extends SlotsType<{
    default: UnwrapRef<UseTreeViewNodeContext>
  }> {}
</script>

<script setup lang="ts">
import { useTreeViewNodeContext, type UseTreeViewNodeContext } from './use-tree-view-node-context'

const item = useTreeViewNodeContext()
defineSlots<{
  default(item: UnwrapRef<UseTreeViewNodeContext>): unknown
}>()
</script>

<template>
  <slot v-bind="item"></slot>
</template>
