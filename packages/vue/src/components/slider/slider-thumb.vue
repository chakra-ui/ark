<script lang="ts">
import type { ThumbProps } from '@zag-js/slider'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'
import { SliderThumbPropsProvider } from './use-slider-thumb-props-context.ts'

export interface SliderThumbBaseProps extends ThumbProps, PolymorphicProps {}
export interface SliderThumbProps
  extends
    SliderThumbBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useSliderContext } from './use-slider-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = defineProps<SliderThumbProps>()
const slider = useSliderContext()

SliderThumbPropsProvider(props)

useForwardExpose()
</script>

<template>
  <ark.div v-bind="slider.getThumbProps(props)" :as-child="asChild">
    <slot />
  </ark.div>
</template>
