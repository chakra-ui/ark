<script lang="ts">
import type { InputHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface SliderHiddenInputBaseProps extends PolymorphicProps {}
export interface SliderHiddenInputProps
  extends
    SliderHiddenInputBaseProps,
    /**
     * @vue-ignore
     */
    InputHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useSliderContext } from './use-slider-context.ts'
import { useSliderThumbPropsContext } from './use-slider-thumb-props-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<SliderHiddenInputProps>()

const slider = useSliderContext()
const thumbProps = useSliderThumbPropsContext()

useForwardExpose()
</script>

<template>
  <ark.input v-bind="slider.getHiddenInputProps(thumbProps)" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.input>
</template>
