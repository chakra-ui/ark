<script lang="ts">
import type { RootEmits, RootProps } from './carousel.types'
import type { BooleanDefaults } from '../../types'

export interface CarouselRootProps extends RootProps, PolymorphicProps {}
export interface CarouselRootEmits extends RootEmits {}
interface BooleanProps extends BooleanDefaults<RootProps> {}
</script>

<script setup lang="ts">
import { ark, type PolymorphicProps } from '../factory'
import { useCarousel } from './use-carousel'
import { CarouselProvider } from './use-carousel-context'

const props = withDefaults(defineProps<CarouselRootProps>(), {
  loop: undefined,
} satisfies BooleanProps)

const emits = defineEmits<CarouselRootEmits>()

const carousel = useCarousel(props, emits)
CarouselProvider(carousel)
</script>

<template>
  <ark.div v-bind="carousel.rootProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
