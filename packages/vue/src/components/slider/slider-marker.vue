<script lang="ts">
import type { MarkerProps } from '@zag-js/slider'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface SliderMarkerBaseProps extends MarkerProps, PolymorphicProps {}
export interface SliderMarkerProps
  extends SliderMarkerBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useSliderContext } from './use-slider-context'
import { useForwardExpose } from '../../utils'

const props = defineProps<SliderMarkerProps>()
const slider = useSliderContext()

useForwardExpose()
</script>

<template>
  <ark.span v-bind="slider.getMarkerProps(props)" :as-child="asChild">
    <slot />
  </ark.span>
</template>
