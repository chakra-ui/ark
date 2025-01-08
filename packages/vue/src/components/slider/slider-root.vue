<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { BooleanDefaults } from '../../types'
import type { PolymorphicProps } from '../factory'
import type { RootEmits, RootProps } from './slider.types'

export interface SliderRootBaseProps extends RootProps, PolymorphicProps {}
export interface SliderRootProps
  extends SliderRootBaseProps,
    /**
     * @vue-ignore
     */
    Omit<HTMLAttributes, 'aria-labelledby' | 'aria-label'> {}
export interface SliderRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
iimport { useForwardExpose } from '../../utils'
import { ark } from '../factory'
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

useForwardExpose()
</script>

<template>
  <ark.div v-bind="slider.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
