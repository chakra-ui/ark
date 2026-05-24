<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface SliderDraggingIndicatorBaseProps extends PolymorphicProps {}
export interface SliderDraggingIndicatorProps
  extends
    SliderDraggingIndicatorBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useSliderContext } from './use-slider-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { useSliderThumbPropsContext } from './use-slider-thumb-props-context.ts'

defineProps<SliderDraggingIndicatorProps>()
const slider = useSliderContext()
const thumbProps = useSliderThumbPropsContext()
const slots = defineSlots()

useForwardExpose()
</script>

<template>
  <ark.span v-bind="slider.getDraggingIndicatorProps(thumbProps)" :as-child="asChild">
    <slot>{{ slots.default?.() || slider.getThumbValue(thumbProps.index) }}</slot>
  </ark.span>
</template>
