<script lang="ts">
import type { SlotsType, UnwrapRef } from 'vue'
import type { UseRadioGroupItemContext } from './use-radio-group-item-context.ts'

export interface RadioGroupItemContextProps extends SlotsType<{
  default: UnwrapRef<UseRadioGroupItemContext>
}> {}
</script>

<script setup lang="ts">
import { useRadioGroupItemContext } from './use-radio-group-item-context.ts'

const item = useRadioGroupItemContext()

defineSlots<{
  default(item: UnwrapRef<UseRadioGroupItemContext>): unknown
}>()
</script>

<template>
  <slot v-bind="item"></slot>
</template>
