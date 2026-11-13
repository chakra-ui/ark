<script lang="ts">
import type { SlotsType, UnwrapRef } from 'vue'
import type { UseCascadeSelectItemContext } from './use-cascade-select-item-context'

export interface CascadeSelectItemContextProps extends SlotsType<{
  default: UnwrapRef<UseCascadeSelectItemContext>
}> {}
</script>

<script setup lang="ts">
import { useCascadeSelectItemContext } from './use-cascade-select-item-context'

const item = useCascadeSelectItemContext()

defineSlots<{
  default(item: UnwrapRef<UseCascadeSelectItemContext>): unknown
}>()
</script>

<template>
  <slot v-bind="item" />
</template>
