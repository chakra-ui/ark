<script lang="ts">
import type { LabelHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface SliderLabelBaseProps extends PolymorphicProps {}
export interface SliderLabelProps
  extends
    SliderLabelBaseProps,
    /**
     * @vue-ignore
     */
    LabelHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useSliderContext } from './use-slider-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<SliderLabelProps>()
const slider = useSliderContext()

useForwardExpose()
</script>

<template>
  <ark.label v-bind="slider.getLabelProps()" :as-child="asChild">
    <slot />
  </ark.label>
</template>
