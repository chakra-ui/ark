<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface CarouselAutoplayTriggerBaseProps extends PolymorphicProps {}
export interface CarouselAutoplayTriggerProps
  extends CarouselAutoplayTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useCarouselContext } from './use-carousel-context'
import { useForwardExpose } from '../../utils'

defineProps<CarouselAutoplayTriggerProps>()
const carousel = useCarouselContext()

useForwardExpose()
</script>

<template>
  <ark.button v-bind="carousel.getAutoplayTriggerProps()" :as-child="asChild">
    <slot />
  </ark.button>
</template>
