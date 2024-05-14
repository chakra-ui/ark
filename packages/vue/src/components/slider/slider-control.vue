<script lang="ts">
import type { PolymorphicProps } from '../factory'

export interface SliderControlProps extends PolymorphicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useSliderContext } from './use-slider-context'

defineProps<SliderControlProps>()
const slider = useSliderContext()
</script>

<template>
  <ark.div v-bind="slider.controlProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
