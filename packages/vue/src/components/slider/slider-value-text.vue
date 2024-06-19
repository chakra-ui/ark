<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface SliderValueTextBaseProps extends PolymorphicProps {}
export interface SliderValueTextProps
  extends SliderValueTextBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
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
  <ark.span v-bind="slider.getValueTextProps()" :as-child="asChild">
    <slot>{{ slots.default?.() || slider.value.join(', ') }}</slot>
  </ark.span>
</template>
