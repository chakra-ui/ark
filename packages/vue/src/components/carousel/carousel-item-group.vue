<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface CarouselItemGroupBaseProps extends PolymorphicProps {}
export interface CarouselItemGroupProps
  extends CarouselItemGroupBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useCarouselContext } from './use-carousel-context'

defineProps<CarouselItemGroupProps>()
const carousel = useCarouselContext()
</script>

<template>
  <ark.div v-bind="carousel.getItemGroupProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
