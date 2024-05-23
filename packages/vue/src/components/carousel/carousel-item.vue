<script lang="ts">
import type { ItemProps } from '@zag-js/carousel'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface CarouselItemProps
  extends ItemProps,
    PolymorphicProps,
    /* @vue-ignore */ HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useCarouselContext } from './use-carousel-context'

const props = defineProps<CarouselItemProps>()
const carousel = useCarouselContext()
</script>

<template>
  <ark.div v-bind="carousel.getItemProps(props)" :as-child="asChild">
    <slot />
  </ark.div>
</template>
