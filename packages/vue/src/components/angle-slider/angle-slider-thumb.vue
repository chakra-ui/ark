<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface AngleSliderThumbBaseProps extends PolymorphicProps {}
export interface AngleSliderThumbProps
  extends AngleSliderThumbBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useAngleSliderContext } from './use-angle-slider-context'
import { useForwardExpose } from '../../utils/use-forward-expose'

defineProps<AngleSliderThumbProps>()

const angleSlider = useAngleSliderContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="angleSlider.getThumbProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
