<script lang="ts">
import type { PolimoprhicProps } from '../factory'

export interface SliderMarkerGroupProps extends PolimoprhicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useSliderContext } from './use-slider-context'

defineProps<SliderMarkerGroupProps>()
const slider = useSliderContext()
</script>

<template>
  <ark.div v-bind="slider.markerGroupProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
