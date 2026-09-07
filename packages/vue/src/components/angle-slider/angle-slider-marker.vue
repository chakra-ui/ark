<script lang="ts">
import type { MarkerProps } from '@zag-js/angle-slider'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

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

const angleSlider = useAngleSliderContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="angleSlider.getMarkerProps(props)" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.div>
</template>
