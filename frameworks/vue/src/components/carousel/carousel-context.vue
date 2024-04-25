<script lang="ts">
import type { SlotsType, UnwrapRef } from 'vue'
import type { UseCarouselContext } from './use-carousel-context'

export interface CarouselContextProps
  extends SlotsType<{
    default: UnwrapRef<UseCarouselContext>
  }> {}
</script>

<script setup lang="ts">
import { useCarouselContext } from './use-carousel-context'

const carousel = useCarouselContext()

defineSlots<{
  default(carousel: UnwrapRef<UseCarouselContext>): unknown
}>()
</script>

<template>
  <slot v-bind="carousel"></slot>
</template>
