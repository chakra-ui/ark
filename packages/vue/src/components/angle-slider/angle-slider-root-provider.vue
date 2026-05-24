<script lang="ts">
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { PolymorphicProps } from '../factory.ts'
import type { UseAngleSliderReturn } from './use-angle-slider.ts'

interface RootProviderProps {
  value: UnwrapRef<UseAngleSliderReturn>
}

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
const angleSlider = computed(() => props.value)

AngleSliderProvider(angleSlider)

useForwardExpose()
</script>

<template>
  <ark.div v-bind="angleSlider.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
