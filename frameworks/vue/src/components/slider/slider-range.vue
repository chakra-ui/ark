<script lang="ts">
import type { PolimoprhicProps } from '../factory'

export interface SliderRangeProps extends PolimoprhicProps {}
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