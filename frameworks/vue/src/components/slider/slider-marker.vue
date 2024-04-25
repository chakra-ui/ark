<script lang="ts">
import type { MarkerProps } from '@zag-js/slider'
import type { PolimoprhicProps } from '../factory'

export interface SliderMarkerProps extends PolimoprhicProps, MarkerProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useSliderContext } from './use-slider-context'

const props = defineProps<SliderMarkerProps>()
const slider = useSliderContext()
</script>

<template>
  <ark.div v-bind="slider.getMarkerProps(props)" :as-child="asChild">
    <slot />
  </ark.div>
</template>