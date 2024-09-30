<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface CarouselViewportBaseProps extends PolymorphicProps {}
export interface CarouselViewportProps
  extends CarouselViewportBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useCarouselContext } from './use-carousel-context'
import { useForwardExpose } from '../../utils'

defineProps<CarouselViewportProps>()
const carousel = useCarouselContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="carousel.getViewportProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
