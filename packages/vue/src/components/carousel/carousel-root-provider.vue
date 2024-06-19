<script lang="ts">
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { PolymorphicProps } from '../factory'
import type { UseCarouselReturn } from './use-carousel'

interface RootProviderProps {
  value: UnwrapRef<UseCarouselReturn>
}

export interface CarouselRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface CarouselRootProviderProps
  extends CarouselRootProviderBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { ark } from '../factory'
import { CarouselProvider } from './use-carousel-context'

const props = defineProps<CarouselRootProviderProps>()
const carousel = computed(() => props.value)

CarouselProvider(carousel)
</script>

<template>
  <ark.div v-bind="carousel.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
