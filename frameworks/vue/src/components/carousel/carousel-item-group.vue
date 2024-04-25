<script lang="ts">
import type { PolimoprhicProps } from '../factory'

export interface CarouselItemGroupProps extends PolimoprhicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useCarouselContext } from './use-carousel-context'

defineProps<CarouselItemGroupProps>()
const carousel = useCarouselContext()
</script>

<template>
  <ark.div v-bind="carousel.itemGroupProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
