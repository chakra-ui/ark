<script lang="ts">
import type { BooleanDefaults } from '../../types.ts'
import type { IndicatorProps, IndicatorState } from '@zag-js/carousel'
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps, PolymorphicSlots } from '../factory.ts'

export interface CarouselIndicatorState extends IndicatorState {}
export interface CarouselIndicatorBaseProps extends IndicatorProps, PolymorphicProps {}
export interface CarouselIndicatorProps
  extends
    CarouselIndicatorBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useCarouselContext } from './use-carousel-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = withDefaults(defineProps<CarouselIndicatorProps>(), {
  readOnly: undefined,
} satisfies BooleanDefaults<IndicatorProps>)

defineSlots<PolymorphicSlots<CarouselIndicatorState>>()
const carousel = useCarouselContext()

useForwardExpose()
</script>

<template>
  <ark.button v-bind="carousel.getIndicatorProps(props)" :state="carousel.getIndicatorState(props)" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.button>
</template>
