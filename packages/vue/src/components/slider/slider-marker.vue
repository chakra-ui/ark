<script lang="ts">
import type { MarkerProps } from '@zag-js/slider'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface SliderMarkerBaseProps extends MarkerProps, PolymorphicProps {}
export interface SliderMarkerProps
  extends
    SliderMarkerBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useSliderContext } from './use-slider-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = defineProps<SliderMarkerProps>()
const slider = useSliderContext()

useForwardExpose()
</script>

<template>
  <ark.span v-bind="slider.getMarkerProps(props)" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.span>
</template>
