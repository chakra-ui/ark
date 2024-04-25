<script lang="ts">
import type { SlotsType, UnwrapRef } from 'vue'
import type { UseProgressContext } from './use-progress-context'

export interface ProgressContextProps
  extends SlotsType<{
    default: UnwrapRef<UseProgressContext>
  }> {}
</script>

<script setup lang="ts">
import { useProgressContext } from './use-progress-context'

const progress = useProgressContext()

defineSlots<{
  default(progress: UnwrapRef<UseProgressContext>): unknown
}>()
</script>

<template>
  <slot v-bind="progress"></slot>
</template>
