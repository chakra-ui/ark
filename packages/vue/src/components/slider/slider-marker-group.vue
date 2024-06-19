<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface SliderMarkerGroupBaseProps extends PolymorphicProps {}
export interface SliderMarkerGroupProps
  extends SliderMarkerGroupBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useSliderContext } from './use-slider-context'

defineProps<SliderMarkerGroupProps>()
const slider = useSliderContext()
</script>

<template>
  <ark.div v-bind="slider.getMarkerGroupProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
