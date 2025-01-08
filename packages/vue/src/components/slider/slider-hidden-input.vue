<script lang="ts">
import type { InputHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface SliderHiddenInputBaseProps extends PolymorphicProps {}
export interface SliderHiddenInputProps
  extends SliderHiddenInputBaseProps,
    /**
     * @vue-ignore
     */
    InputHTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { useSliderContext } from './use-slider-context'
import { useSliderThumbPropsContext } from './use-slider-thumb-props-context'

defineProps<SliderHiddenInputProps>()

const slider = useSliderContext()
const thumbProps = useSliderThumbPropsContext()

useForwardExpose()
</script>

<template>
  <ark.input v-bind="slider.getHiddenInputProps(thumbProps)" :as-child="asChild">
    <slot />
  </ark.input>
</template>
