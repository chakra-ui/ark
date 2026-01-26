<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface AngleSliderControlBaseProps extends PolymorphicProps {}
export interface AngleSliderControlProps
  extends
    AngleSliderControlBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useAngleSliderContext } from './use-angle-slider-context'
import { useForwardExpose } from '../../utils/use-forward-expose'

defineProps<AngleSliderControlProps>()

const angleSlider = useAngleSliderContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="angleSlider.getControlProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
