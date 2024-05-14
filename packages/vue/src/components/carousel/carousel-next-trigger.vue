<script lang="ts">
import type { PolymorphicProps } from '../factory'

export interface CarouselNextTriggerProps extends PolymorphicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useCarouselContext } from './use-carousel-context'

defineProps<CarouselNextTriggerProps>()
const carousel = useCarouselContext()
</script>

<template>
  <ark.button v-bind="carousel.nextTriggerProps" :as-child="asChild">
    <slot />
  </ark.button>
</template>
