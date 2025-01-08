<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface SliderRangeBaseProps extends PolymorphicProps {}
export interface SliderRangeProps
  extends SliderRangeBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { useSliderContext } from './use-slider-context'

defineProps<SliderRangeProps>()
const slider = useSliderContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="slider.getRangeProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
