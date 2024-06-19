<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface CarouselIndicatorGroupBaseProps extends PolymorphicProps {}
export interface CarouselIndicatorGroupProps
  extends CarouselIndicatorGroupBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useCarouselContext } from './use-carousel-context'

defineProps<CarouselIndicatorGroupProps>()
const carousel = useCarouselContext()
</script>

<template>
  <ark.div v-bind="carousel.getIndicatorGroupProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
