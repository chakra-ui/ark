<script lang="ts">
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { PolymorphicProps } from '../factory'
import type { UseSliderReturn } from './use-slider'

interface RootProviderProps {
  value: UnwrapRef<UseSliderReturn>
}

export interface SliderRootProviderProps
  extends RootProviderProps,
    PolymorphicProps,
    /**
     * @vue-ignore
     */
    Omit<HTMLAttributes, 'aria-labelledby' | 'aria-label'> {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { ark } from '../factory'
import { SliderProvider } from './use-slider-context'

const props = defineProps<SliderRootProviderProps>()
const slider = computed(() => props.value)

SliderProvider(slider)
</script>

<template>
  <ark.div v-bind="slider.rootProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
