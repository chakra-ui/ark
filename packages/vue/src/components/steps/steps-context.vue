<script lang="ts">
import type { SlotsType, UnwrapRef } from 'vue'
import type { UseStepsContext } from './use-steps-context'

export interface StepsContextProps
  extends SlotsType<{
    default: UnwrapRef<UseStepsContext>
  }> {}
</script>

<script setup lang="ts">
import { useStepsContext } from './use-steps-context'

const steps = useStepsContext()

defineSlots<{
  default(context: UnwrapRef<UseStepsContext>): unknown
}>()
</script>

<template>
  <slot v-bind="steps"></slot>
</template>
