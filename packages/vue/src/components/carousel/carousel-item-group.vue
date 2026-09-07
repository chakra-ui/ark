<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface CarouselItemGroupBaseProps extends PolymorphicProps {}
export interface CarouselItemGroupProps
  extends
    CarouselItemGroupBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useCarouselContext } from './use-carousel-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<CarouselItemGroupProps>()
const carousel = useCarouselContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="carousel.getItemGroupProps()" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.div>
</template>
