<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { BooleanDefaults } from '../../types'
import type { PolymorphicProps } from '../factory'
import type { RootEmits, RootProps } from './carousel.types'

export interface CarouselRootBaseProps extends RootProps, PolymorphicProps {}
export interface CarouselRootProps
  extends CarouselRootBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
export interface CarouselRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useCarousel } from './use-carousel'
import { CarouselProvider } from './use-carousel-context'
import { useForwardExpose } from '../../utils'

const props = withDefaults(defineProps<CarouselRootProps>(), {
  loop: undefined,
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
