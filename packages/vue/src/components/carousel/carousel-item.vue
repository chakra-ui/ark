<script lang="ts">
import type { ItemProps } from '@zag-js/carousel'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface CarouselItemBaseProps extends ItemProps, PolymorphicProps {}
export interface CarouselItemProps
  extends CarouselItemBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useCarouselContext } from './use-carousel-context'
import { useForwardExpose } from '../../utils'

const props = defineProps<CarouselItemProps>()
const carousel = useCarouselContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="carousel.getItemProps(props)" :as-child="asChild">
    <slot />
  </ark.div>
</template>
