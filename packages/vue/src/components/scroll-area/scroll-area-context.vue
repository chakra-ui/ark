<script lang="ts">
import type { SlotsType, UnwrapRef } from 'vue'
import type { UseScrollAreaContext } from './use-scroll-area-context'

export interface ScrollAreaContextProps
  extends SlotsType<{
    default: UnwrapRef<UseScrollAreaContext>
  }> {}
</script>

<script setup lang="ts">
import { useScrollAreaContext } from './use-scroll-area-context'

const scrollArea = useScrollAreaContext()

defineSlots<{
  default(scrollArea: UnwrapRef<UseScrollAreaContext>): unknown
}>()
</script>

<template>
  <slot v-bind="scrollArea"></slot>
</template>
