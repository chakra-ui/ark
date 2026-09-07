<script lang="ts">
import type { LabelHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface AngleSliderLabelBaseProps extends PolymorphicProps {}
export interface AngleSliderLabelProps
  extends
    AngleSliderLabelBaseProps,
    /**
     * @vue-ignore
     */
    LabelHTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { ark } from '../factory.ts'
import { useAngleSliderContext } from './use-angle-slider-context.ts'

defineProps<AngleSliderLabelProps>()

const angleSlider = useAngleSliderContext()

useForwardExpose()
</script>

<template>
  <ark.label v-bind="angleSlider.getLabelProps()" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.label>
</template>
