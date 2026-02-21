<script lang="ts">
import type { SlotsType, UnwrapRef } from 'vue'
import type { UseCascadeSelectContext } from './use-cascade-select-context'

export interface CascadeSelectContextProps extends SlotsType<{
  default: UnwrapRef<UseCascadeSelectContext>
}> {}
</script>

<script setup lang="ts">
import { useCascadeSelectContext } from './use-cascade-select-context'

const cascadeSelect = useCascadeSelectContext()

defineSlots<{
  default(cascadeSelect: UnwrapRef<UseCascadeSelectContext>): unknown
}>()
</script>

<template>
  <slot v-bind="cascadeSelect" />
</template>
