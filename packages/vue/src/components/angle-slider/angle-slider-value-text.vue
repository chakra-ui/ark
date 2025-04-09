<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface AngleSliderValueTextBaseProps extends PolymorphicProps {}
export interface AngleSliderValueTextProps
  extends AngleSliderValueTextBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useAngleSliderContext } from './use-angle-slider-context'
import { useForwardExpose } from '../../utils'

defineProps<AngleSliderValueTextProps>()
const angleSlider = useAngleSliderContext()
const slots = defineSlots()

useForwardExpose()
</script>

<template>
  <ark.span v-bind="angleSlider.getValueTextProps()" :as-child="asChild">
    <slot>{{ slots.default?.() || angleSlider.valueAsDegree }}</slot>
  </ark.span>
</template>
