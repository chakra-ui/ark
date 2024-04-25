<script lang="ts">
import type { PolimoprhicProps } from '../factory'

export interface CarouselPrevTriggerProps extends PolimoprhicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useCarouselContext } from './use-carousel-context'

defineProps<CarouselPrevTriggerProps>()
const carousel = useCarouselContext()
</script>

<template>
  <ark.button v-bind="carousel.prevTriggerProps" :as-child="asChild">
    <slot />
  </ark.button>
</template>
