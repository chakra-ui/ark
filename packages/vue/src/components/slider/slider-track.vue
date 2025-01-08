<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface SliderTrackBaseProps extends PolymorphicProps {}
export interface SliderTrackProps
  extends SliderTrackBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { useSliderContext } from './use-slider-context'

defineProps<SliderTrackProps>()
const slider = useSliderContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="slider.getTrackProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
