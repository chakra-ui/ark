<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface CarouselAutoplayIndicatorBaseProps extends PolymorphicProps {
  /**
   * The fallback content to render when autoplay is paused.
   */
  fallback?: string
}
export interface CarouselAutoplayIndicatorProps
  extends CarouselAutoplayIndicatorBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { carouselAnatomy } from './carousel.anatomy'
import { useCarouselContext } from './use-carousel-context'
import { useForwardExpose } from '../../utils/use-forward-expose'

const parts = carouselAnatomy.build()

defineProps<CarouselAutoplayIndicatorProps>()
const carousel = useCarouselContext()

useForwardExpose()
</script>

<template>
  <ark.span v-bind="parts.autoplayIndicator.attrs" :as-child="asChild">
    <template v-if="carousel.isPlaying">
      <slot />
    </template>
    <template v-else>
      <slot name="fallback" :fallback="fallback">
        {{ fallback }}
      </slot>
    </template>
  </ark.span>
</template>
