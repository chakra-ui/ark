<script lang="ts">
import type { PolymorphicProps } from '../factory'

export interface CarouselIndicatorGroupProps extends PolymorphicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useCarouselContext } from './use-carousel-context'

defineProps<CarouselIndicatorGroupProps>()
const carousel = useCarouselContext()
</script>

<template>
  <ark.div v-bind="carousel.indicatorGroupProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
