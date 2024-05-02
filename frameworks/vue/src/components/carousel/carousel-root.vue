<script lang="ts">
import type { RootEmits, RootProps } from './carousel.types'
import type { BooleanDefaults } from '../../types'

export interface CarouselRootProps extends RootProps, PolymorphicProps {}
export interface CarouselRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { ark, type PolymorphicProps } from '../factory'
import { useCarousel } from './use-carousel'
import { CarouselProvider } from './use-carousel-context'

const defaults: BooleanDefaults<RootProps> = {
  loop: undefined,
}

const props = withDefaults(defineProps<CarouselRootProps>(), defaults)
const emits = defineEmits<CarouselRootEmits>()

const carousel = useCarousel(props, emits)
CarouselProvider(carousel)
</script>

<template>
  <ark.div v-bind="carousel.rootProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
