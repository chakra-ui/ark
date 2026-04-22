<script lang="ts">
import type { SlotsType, UnwrapRef } from 'vue'
import type { TreeNode } from '../collection'
import type { UseCascadeSelectContext } from './use-cascade-select-context'

export interface CascadeSelectContextProps<T extends TreeNode> extends SlotsType<{
  default: UnwrapRef<UseCascadeSelectContext<T>>
}> {}
</script>

<script setup lang="ts" generic="T extends TreeNode">
import { useCascadeSelectContext } from './use-cascade-select-context'

const cascadeSelect = useCascadeSelectContext()

defineSlots<{
  default(cascadeSelect: UnwrapRef<UseCascadeSelectContext<T>>): unknown
}>()
</script>

<template>
  <slot v-bind="cascadeSelect" />
</template>
