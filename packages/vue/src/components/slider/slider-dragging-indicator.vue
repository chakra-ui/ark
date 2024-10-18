<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface SliderDraggingIndicatorBaseProps extends PolymorphicProps {}
export interface SliderDraggingIndicatorProps
  extends SliderDraggingIndicatorBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useSlots } from 'vue'
import { useSliderContext } from './use-slider-context'
import { useForwardExpose } from '../../utils'
import { useSliderThumbPropsContext } from './use-slider-thumb-props-context'


defineProps<SliderDraggingIndicatorProps>()
const slider = useSliderContext()
const thumbProps = useSliderThumbPropsContext()
const slots = useSlots()

useForwardExpose()
</script>

<template>
  <ark.span v-bind="slider.getDraggingIndicatorProps(thumbProps)" :as-child="asChild">
    <slot>{{ slots.default?.() || slider.getThumbValue(thumbProps.index) }}</slot>
  </ark.span>
</template>
