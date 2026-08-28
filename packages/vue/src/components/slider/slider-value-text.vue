<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface SliderValueTextBaseProps extends PolymorphicProps {}
export interface SliderValueTextProps
  extends
    SliderValueTextBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { ark } from '../factory.ts'
import { useSliderContext } from './use-slider-context.ts'

defineProps<SliderValueTextProps>()
const slider = useSliderContext()
const slots = defineSlots()

useForwardExpose()
</script>

<template>
  <ark.span v-bind="slider.getValueTextProps()" :as-child="asChild">
    <slot>{{ slots.default?.() || slider.value.join(', ') }}</slot>
  </ark.span>
</template>
