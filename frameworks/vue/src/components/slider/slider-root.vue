<script lang="ts">
import type { RootEmits, RootProps } from './slider.types'

export interface SliderRootProps extends RootProps, PolimoprhicProps {}
export interface SliderRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { ark, type PolimoprhicProps } from '../factory'
import { useSlider } from './use-slider'
import { SliderProvider } from './use-slider-context'

const props = defineProps<SliderRootProps>()
const emits = defineEmits<SliderRootEmits>()

const slider = useSlider(props, emits)
SliderProvider(slider)
</script>

<template>
  <ark.div v-bind="slider.rootProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
