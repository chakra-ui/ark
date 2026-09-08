<script lang="ts">
import type { ItemProps, ItemState } from '@zag-js/carousel'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps, PolymorphicSlots } from '../factory.ts'

export interface CarouselItemState extends ItemState {}
export interface CarouselItemBaseProps extends ItemProps, PolymorphicProps {}
export interface CarouselItemProps
  extends
    CarouselItemBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useCarouselContext } from './use-carousel-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = defineProps<CarouselItemProps>()

defineSlots<PolymorphicSlots<CarouselItemState>>()
const carousel = useCarouselContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="carousel.getItemProps(props)" :state="carousel.getItemState(props)" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.div>
</template>
