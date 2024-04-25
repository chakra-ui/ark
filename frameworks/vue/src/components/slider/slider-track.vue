<script lang="ts">
import type { PolimoprhicProps } from '../factory'

export interface SliderTrackProps extends PolimoprhicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useSliderContext } from './use-slider-context'

defineProps<SliderTrackProps>()
const slider = useSliderContext()
</script>

<template>
  <ark.div v-bind="slider.trackProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
