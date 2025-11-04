<script lang="ts">
export type CarouselAutoplayIndicatorBaseProps = {}
export interface CarouselAutoplayIndicatorProps extends CarouselAutoplayIndicatorBaseProps {}
</script>

<script setup lang="ts">
import { useCarouselContext } from './use-carousel-context'

defineProps<CarouselAutoplayIndicatorProps>()
const carousel = useCarouselContext()
</script>

<template>
  <slot v-if="carousel.isPlaying" name="paused" />
  <slot v-else name="playing" />
</template>
