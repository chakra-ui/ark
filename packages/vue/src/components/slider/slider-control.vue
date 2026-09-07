<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface SliderControlBaseProps extends PolymorphicProps {}
export interface SliderControlProps
  extends
    SliderControlBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useSliderContext } from './use-slider-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<SliderControlProps>()
const slider = useSliderContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="slider.getControlProps()" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.div>
</template>
