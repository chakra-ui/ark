<script lang="ts">
export interface TreeViewNodeCheckboxIndicatorBaseProps {
  indeterminate?: unknown
  fallback?: unknown
}
export interface TreeViewNodeCheckboxIndicatorProps extends TreeViewNodeCheckboxIndicatorBaseProps {}
</script>

<script setup lang="ts">
import { useTreeViewNodeContext } from './use-tree-view-node-context'

defineProps<TreeViewNodeCheckboxIndicatorProps>()
defineSlots<{
  default(): void
  indeterminate(): void
  fallback(): void
}>()

const nodeState = useTreeViewNodeContext()
</script>

<template>
  <template v-if="nodeState.checked === 'indeterminate'">
    <slot name="indeterminate" />
  </template>
  <template v-else-if="nodeState.checked === true">
    <slot />
  </template>
  <template v-else>
    <slot name="fallback" />
  </template>
</template>
