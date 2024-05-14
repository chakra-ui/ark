<script lang="ts">
import type { PolymorphicProps } from '../factory'

export interface SliderLabelProps extends PolymorphicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useSliderContext } from './use-slider-context'

defineProps<SliderLabelProps>()
const slider = useSliderContext()
</script>

<template>
  <ark.label v-bind="slider.labelProps" :as-child="asChild">
    <slot />
  </ark.label>
</template>
