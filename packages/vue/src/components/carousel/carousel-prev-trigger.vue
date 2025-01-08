<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface CarouselPrevTriggerBaseProps extends PolymorphicProps {}
export interface CarouselPrevTriggerProps
  extends CarouselPrevTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { useCarouselContext } from './use-carousel-context'

defineProps<CarouselPrevTriggerProps>()
const carousel = useCarouselContext()

useForwardExpose()
</script>

<template>
  <ark.button v-bind="carousel.getPrevTriggerProps()" :as-child="asChild">
    <slot />
  </ark.button>
</template>
