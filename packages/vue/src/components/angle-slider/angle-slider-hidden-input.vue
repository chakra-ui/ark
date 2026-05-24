<script lang="ts">
import type { InputHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface AngleSliderHiddenInputBaseProps extends PolymorphicProps {}
export interface AngleSliderHiddenInputProps
  extends
    AngleSliderHiddenInputBaseProps,
    /**
     * @vue-ignore
     */
    InputHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useAngleSliderContext } from './use-angle-slider-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<AngleSliderHiddenInputProps>()

const angleSlider = useAngleSliderContext()

useForwardExpose()
</script>

<template>
  <ark.input v-bind="angleSlider.getHiddenInputProps()" :as-child="asChild">
    <slot />
  </ark.input>
</template>
