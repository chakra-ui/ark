<script lang="ts">
import type { RootState } from '@zag-js/slider'
import type { HTMLAttributes } from 'vue'
import type { BooleanDefaults } from '../../types.ts'
import type { PolymorphicProps, PolymorphicSlots } from '../factory.ts'
import type { RootEmits, RootProps } from './slider.types.ts'

export interface SliderRootState extends RootState {}
export interface SliderRootBaseProps extends RootProps, PolymorphicProps {}
export interface SliderRootProps
  extends
    SliderRootBaseProps,
    /**
     * @vue-ignore
     */
    Omit<HTMLAttributes, 'aria-labelledby' | 'aria-label' | 'dir'> {}
export interface SliderRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useSlider } from './use-slider.ts'
import { SliderProvider } from './use-slider-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = withDefaults(defineProps<SliderRootProps>(), {
  disabled: undefined,
  invalid: undefined,
  readOnly: undefined,
} satisfies BooleanDefaults<RootProps>)

defineSlots<PolymorphicSlots<SliderRootState>>()

const emits = defineEmits<SliderRootEmits>()

const slider = useSlider(props, emits)

SliderProvider(slider)

useForwardExpose()
</script>

<template>
  <ark.div v-bind="slider.getRootProps()" :state="slider.getRootState()" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.div>
</template>
