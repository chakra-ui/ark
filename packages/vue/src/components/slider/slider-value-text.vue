<script lang="ts">
import type { PolymorphicProps } from '../factory'

export interface SliderValueTextProps extends PolymorphicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useSlots } from 'vue'
import { useSliderContext } from './use-slider-context'

defineProps<SliderValueTextProps>()
const slider = useSliderContext()
const slots = useSlots()
</script>

<template>
  <ark.span v-bind="slider.valueTextProps" :as-child="asChild">
    <slot>{{ slots.default?.() || slider.value.join(', ') }}</slot>
  </ark.span>
</template>
