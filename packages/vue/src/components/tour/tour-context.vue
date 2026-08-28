<script lang="ts">
import type { SlotsType, UnwrapRef } from 'vue'
import type { UseTourContext } from './use-tour-context.ts'

export interface TourContextProps extends SlotsType<{
  default: UnwrapRef<UseTourContext>
}> {}
</script>

<script setup lang="ts">
import { useTourContext } from './use-tour-context.ts'

const tour = useTourContext()

defineSlots<{
  default(tour: UnwrapRef<UseTourContext>): unknown
}>()
</script>

<template>
  <slot v-bind="tour"></slot>
</template>
