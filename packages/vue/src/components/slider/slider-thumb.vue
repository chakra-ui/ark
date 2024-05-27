<script lang="ts">
import type { ThumbProps } from '@zag-js/slider'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'
import { SliderThumbPropsProvider } from './use-slider-thumb-props-context'

export interface SliderThumbProps
  extends PolymorphicProps,
    ThumbProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useSliderContext } from './use-slider-context'

const props = defineProps<SliderThumbProps>()
const slider = useSliderContext()

SliderThumbPropsProvider(props)
</script>

<template>
  <ark.div v-bind="slider.getThumbProps(props)" :as-child="asChild">
    <slot />
  </ark.div>
</template>
