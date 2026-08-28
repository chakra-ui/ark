<script lang="ts">
import type { SlotsType, UnwrapRef } from 'vue'
import type { UseSelectItemContext } from './use-select-item-context.ts'

export interface SelectItemContextProps extends SlotsType<{
  default: UnwrapRef<UseSelectItemContext>
}> {}
</script>

<script setup lang="ts">
import { useSelectItemContext } from './use-select-item-context.ts'

const item = useSelectItemContext()

defineSlots<{
  default(item: UnwrapRef<UseSelectItemContext>): unknown
}>()
</script>

<template>
  <slot v-bind="item"></slot>
</template>
