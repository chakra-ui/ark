<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface CarouselProgressTextBaseProps extends PolymorphicProps {}
export interface CarouselProgressTextProps
  extends
    CarouselProgressTextBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { ark } from '../factory.ts'
import { carouselAnatomy } from './carousel.anatomy.ts'
import { useCarouselContext } from './use-carousel-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const parts = carouselAnatomy.build()

defineProps<CarouselProgressTextProps>()
const carousel = useCarouselContext()

const progressText = computed(() => {
  const currentPage = carousel.value.page + 1
  const totalPages = carousel.value.pageSnapPoints.length
  return `${currentPage} / ${totalPages}`
})

useForwardExpose()
</script>

<template>
  <ark.span v-bind="parts.progressText.attrs" :as-child="asChild">
    <slot>{{ progressText }}</slot>
  </ark.span>
</template>
