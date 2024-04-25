<script lang="ts">
import type { SlotsType, UnwrapRef } from 'vue'
import type { UseSelectContext } from './use-select-context'

export interface SelectContextProps
  extends SlotsType<{
    default: UnwrapRef<UseSelectContext>
  }> {}
</script>

<script setup lang="ts">
import { useSelectContext } from './use-select-context'

const select = useSelectContext()

defineSlots<{
  default(select: UnwrapRef<UseSelectContext>): unknown
}>()
</script>

<template>
  <slot v-bind="select"></slot>
</template>
