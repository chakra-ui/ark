<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface CarouselPrevTriggerProps
  extends PolymorphicProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useCarouselContext } from './use-carousel-context'

defineProps<CarouselPrevTriggerProps>()
const carousel = useCarouselContext()
</script>

<template>
  <ark.button v-bind="carousel.getPrevTriggerProps()" :as-child="asChild">
    <slot />
  </ark.button>
</template>
