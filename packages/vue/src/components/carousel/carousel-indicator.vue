<script lang="ts">
import type { IndicatorProps } from '@zag-js/carousel'
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface CarouselIndicatorBaseProps extends IndicatorProps, PolymorphicProps {}
export interface CarouselIndicatorProps
  extends CarouselIndicatorBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useCarouselContext } from './use-carousel-context'

const props = defineProps<CarouselIndicatorProps>()
const carousel = useCarouselContext()
</script>

<template>
  <ark.button v-bind="carousel.getIndicatorProps(props)" :as-child="asChild">
    <slot />
  </ark.button>
</template>
