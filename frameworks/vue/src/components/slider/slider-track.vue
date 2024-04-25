<script lang="ts">
import type { PolymorphicProps } from '../factory'

export interface SliderTrackProps extends PolymorphicProps {}
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
