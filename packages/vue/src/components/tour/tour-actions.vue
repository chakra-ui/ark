<script lang="ts">
import type { StepAction } from '@zag-js/tour'
import type { SlotsType, UnwrapRef } from 'vue'

export interface TourActionsProps
  extends SlotsType<{
    default: UnwrapRef<StepAction[]>
  }> {}
</script>

<script setup lang="ts">
import { useTourContext } from './use-tour-context'

const tour = useTourContext()

defineSlots<{
  default(tour: UnwrapRef<StepAction[]>): unknown
}>()
</script>

<template>
  <slot v-bind="tour.step?.actions ?? []"></slot>
</template>
