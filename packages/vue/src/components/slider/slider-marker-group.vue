<script lang="ts">
import type { PolymorphicProps } from '../factory'

export interface SliderMarkerGroupProps extends PolymorphicProps {}
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
