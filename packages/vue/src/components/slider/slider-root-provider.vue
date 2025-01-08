<script lang="ts">
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { PolymorphicProps } from '../factory'
import type { UseSliderReturn } from './use-slider'

interface RootProviderProps {
  value: UnwrapRef<UseSliderReturn>
}

export interface SliderRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface SliderRootProviderProps
  extends SliderRootProviderBaseProps,
    /**
     * @vue-ignore
     */
    Omit<HTMLAttributes, 'aria-labelledby' | 'aria-label'> {}
</script>

<script setup lang="ts">
iimport { computed } from 'vue'
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { SliderProvider } from './use-slider-context'
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
