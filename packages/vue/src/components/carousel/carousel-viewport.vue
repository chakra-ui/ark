<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface CarouselViewportProps
  extends PolymorphicProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useCarouselContext } from './use-carousel-context'

defineProps<CarouselViewportProps>()
const carousel = useCarouselContext()
</script>

<template>
  <ark.div v-bind="carousel.getViewportProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
