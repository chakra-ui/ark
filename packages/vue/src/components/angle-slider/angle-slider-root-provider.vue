<script lang="ts">
import type { RootState } from '@zag-js/angle-slider'
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { PolymorphicProps, PolymorphicSlots } from '../factory.ts'
import type { UseAngleSliderReturn } from './use-angle-slider.ts'

interface RootProviderProps {
  value: UnwrapRef<UseAngleSliderReturn>
}

export interface AngleSliderRootProviderState extends RootState {}
export interface AngleSliderRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface AngleSliderRootProviderProps
  extends
    AngleSliderRootProviderBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { ark } from '../factory.ts'
import { AngleSliderProvider } from './use-angle-slider-context.ts'

const props = defineProps<AngleSliderRootProviderProps>()

defineSlots<PolymorphicSlots<AngleSliderRootProviderState>>()
const angleSlider = computed(() => props.value)

AngleSliderProvider(angleSlider)

useForwardExpose()
</script>

<template>
  <ark.div v-bind="angleSlider.getRootProps()" :state="angleSlider.getRootState()" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.div>
</template>
