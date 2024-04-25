<script lang="ts">
import type { PolymorphicProps } from '../factory'

export interface SliderValueTextProps extends PolymorphicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useSliderContext } from './use-slider-context'

defineProps<SliderValueTextProps>()
const slider = useSliderContext()
</script>

<template>
  <ark.div v-bind="slider.valueTextProps" :as-child="asChild">
    <!-- TODO   {slots.default?.() || api.value.value.join(', ')} -->
    <slot />
  </ark.div>
</template>
