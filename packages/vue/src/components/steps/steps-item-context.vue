<script lang="ts">
import type { SlotsType, UnwrapRef } from 'vue'
import type { UseStepsItemContext } from './use-steps-item-context'

export interface StepsItemContextProps
  extends SlotsType<{
    default: UnwrapRef<UseStepsItemContext>
  }> {}
</script>

<script setup lang="ts">
import { useStepsItemContext } from './use-steps-item-context'

const itemContext = useStepsItemContext()

defineSlots<{
  default(context: UnwrapRef<UseStepsItemContext>): unknown
}>()
</script>

<template>
  <slot v-bind="itemContext"></slot>
</template>
