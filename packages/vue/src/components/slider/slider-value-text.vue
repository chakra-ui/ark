<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface SliderValueTextBaseProps extends PolymorphicProps {}
export interface SliderValueTextProps
  extends
    SliderValueTextBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { ark } from '../factory.ts'
import { useSliderContext } from './use-slider-context.ts'

defineProps<SliderValueTextProps>()
const slider = useSliderContext()
const slots = defineSlots()

useForwardExpose()
</script>

<template>
  <ark.span v-bind="slider.getValueTextProps()" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot>{{ slots.default?.() || slider.value.join(', ') }}</slot>
    </template>
  </ark.span>
</template>
