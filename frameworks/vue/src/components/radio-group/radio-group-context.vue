<script lang="ts">
import type { SlotsType, UnwrapRef } from 'vue'
import type { UseRadioGroupContext } from './use-radio-group-context'

export interface RadioGroupContextProps
  extends SlotsType<{
    default: UnwrapRef<UseRadioGroupContext>
  }> {}
</script>

<script setup lang="ts">
import { useRadioGroupContext } from './use-radio-group-context'

const radioGroup = useRadioGroupContext()

defineSlots<{
  default(radioGroup: UnwrapRef<UseRadioGroupContext>): unknown
}>()
</script>

<template>
  <slot v-bind="radioGroup"></slot>
</template>
