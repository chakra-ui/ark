<script lang="ts">
import type { InputHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface AngleSliderHiddenInputBaseProps extends PolymorphicProps {}
export interface AngleSliderHiddenInputProps
  extends AngleSliderHiddenInputBaseProps,
    /**
     * @vue-ignore
     */
    InputHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useAngleSliderContext } from './use-angle-slider-context'
import { useForwardExpose } from '../../utils'

defineProps<AngleSliderHiddenInputProps>()

const angleSlider = useAngleSliderContext()

useForwardExpose()
</script>

<template>
  <ark.input v-bind="angleSlider.getHiddenInputProps()" :as-child="asChild">
    <slot />
  </ark.input>
</template>
