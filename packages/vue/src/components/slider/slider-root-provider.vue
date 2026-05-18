<script lang="ts">
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { PolymorphicProps } from '../factory.ts'
import type { UseSliderReturn } from './use-slider.ts'

interface RootProviderProps {
  value: UnwrapRef<UseSliderReturn>
}

export interface SliderRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface SliderRootProviderProps
  extends
    SliderRootProviderBaseProps,
    /**
     * @vue-ignore
     */
    Omit<HTMLAttributes, 'aria-labelledby' | 'aria-label'> {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { ark } from '../factory.ts'
import { SliderProvider } from './use-slider-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = defineProps<SliderRootProviderProps>()
const slider = computed(() => props.value)

SliderProvider(slider)

useForwardExpose()
</script>

<template>
  <ark.div v-bind="slider.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
