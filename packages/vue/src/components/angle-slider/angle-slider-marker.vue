<script lang="ts">
import type { MarkerProps, MarkerState } from '@zag-js/angle-slider'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps, PolymorphicSlots } from '../factory.ts'

export interface AngleSliderMarkerState extends MarkerState {}
export interface AngleSliderMarkerBaseProps extends MarkerProps, PolymorphicProps {}
export interface AngleSliderMarkerProps
  extends
    AngleSliderMarkerBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useAngleSliderContext } from './use-angle-slider-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = defineProps<AngleSliderMarkerProps>()

defineSlots<PolymorphicSlots<AngleSliderMarkerState>>()

const angleSlider = useAngleSliderContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="angleSlider.getMarkerProps(props)" :state="angleSlider.getMarkerState(props)" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.div>
</template>
