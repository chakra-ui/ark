<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { BooleanDefaults } from '../../types'
import type { RootEmits, RootProps } from './slider.types'

export interface SliderRootProps
  extends RootProps,
    PolymorphicProps,
    /**
     * @vue-ignore
     */
    Omit<HTMLAttributes, 'aria-labelledby' | 'aria-label'> {}
export interface SliderRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { ark, type PolymorphicProps } from '../factory'
import { useSlider } from './use-slider'
import { SliderProvider } from './use-slider-context'

const props = withDefaults(defineProps<SliderRootProps>(), {
  disabled: undefined,
  invalid: undefined,
  readOnly: undefined,
} satisfies BooleanDefaults<RootProps>)

const emits = defineEmits<SliderRootEmits>()

const slider = useSlider(props, emits)
SliderProvider(slider)
</script>

<template>
  <ark.div v-bind="slider.rootProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
