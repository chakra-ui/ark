<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface AngleSliderMarkerGroupBaseProps extends PolymorphicProps {}
export interface AngleSliderMarkerGroupProps
  extends AngleSliderMarkerGroupBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useAngleSliderContext } from './use-angle-slider-context'
import { useForwardExpose } from '../../utils'

defineProps<AngleSliderMarkerGroupProps>()
const angleSlider = useAngleSliderContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="angleSlider.getMarkerGroupProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
