<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface SliderRangeProps
  extends PolymorphicProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useSliderContext } from './use-slider-context'

defineProps<SliderRangeProps>()
const slider = useSliderContext()
</script>

<template>
  <ark.div v-bind="slider.rangeProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
