<script lang="ts">
import type { PolimoprhicProps } from '../factory'

export interface CarouselViewportProps extends PolimoprhicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useCarouselContext } from './use-carousel-context'

defineProps<CarouselViewportProps>()
const carousel = useCarouselContext()
</script>

<template>
  <ark.div v-bind="carousel.viewportProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
