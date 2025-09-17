<script lang="ts">
import type { MarkerProps } from '@zag-js/angle-slider'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface AngleSliderMarkerBaseProps extends MarkerProps, PolymorphicProps {}
export interface AngleSliderMarkerProps
  extends AngleSliderMarkerBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useAngleSliderContext } from './use-angle-slider-context'
import { useForwardExpose } from '../../utils/use-forward-expose'

const props = defineProps<AngleSliderMarkerProps>()

const angleSlider = useAngleSliderContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="angleSlider.getMarkerProps(props)" :as-child="asChild">
    <slot />
  </ark.div>
</template>
