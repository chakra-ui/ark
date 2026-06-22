<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { BooleanDefaults } from '../../types.ts'
import type { PolymorphicProps } from '../factory.ts'
import type { RootEmits, RootProps } from './carousel.types.ts'

export interface CarouselRootBaseProps extends RootProps, PolymorphicProps {}
export interface CarouselRootProps
  extends
    CarouselRootBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
export interface CarouselRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useCarousel } from './use-carousel.ts'
import { CarouselProvider } from './use-carousel-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = withDefaults(defineProps<CarouselRootProps>(), {
  allowMouseDrag: undefined,
  loop: undefined,
  autoPlay: undefined,
  autoSize: undefined,
} satisfies BooleanDefaults<RootProps>)

const emits = defineEmits<CarouselRootEmits>()

const carousel = useCarousel(props, emits)
CarouselProvider(carousel)

useForwardExpose()
</script>

<template>
  <ark.div v-bind="carousel.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
