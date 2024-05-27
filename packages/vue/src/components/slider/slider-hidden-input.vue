<script lang="ts">
import type { InputHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface SliderHiddenInputProps
  extends PolymorphicProps,
    /**
     * @vue-ignore
     */
    InputHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useSliderContext } from './use-slider-context'
import { useSliderThumbPropsContext } from './use-slider-thumb-props-context'

defineProps<SliderHiddenInputProps>()
const slider = useSliderContext()
const thumbProps = useSliderThumbPropsContext()
</script>

<template>
  <ark.input v-bind="slider.getHiddenInputProps(thumbProps)" :as-child="asChild" />
</template>
