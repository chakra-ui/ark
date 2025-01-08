<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface SliderControlBaseProps extends PolymorphicProps {}
export interface SliderControlProps
  extends SliderControlBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { useSliderContext } from './use-slider-context'

defineProps<SliderControlProps>()
const slider = useSliderContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="slider.getControlProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
