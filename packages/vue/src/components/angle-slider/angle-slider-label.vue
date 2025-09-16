<script lang="ts">
import type { LabelHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface AngleSliderLabelBaseProps extends PolymorphicProps {}
export interface AngleSliderLabelProps
  extends AngleSliderLabelBaseProps,
    /**
     * @vue-ignore
     */
    LabelHTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils/use-forward-expose'
import { ark } from '../factory'
import { useAngleSliderContext } from './use-angle-slider-context'

defineProps<AngleSliderLabelProps>()

const angleSlider = useAngleSliderContext()

useForwardExpose()
</script>

<template>
  <ark.label v-bind="angleSlider.getLabelProps()" :as-child="asChild">
    <slot />
  </ark.label>
</template>
