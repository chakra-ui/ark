<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { BooleanDefaults } from '../../types.ts'
import type { PolymorphicProps } from '../factory.ts'
import type { RootEmits, RootProps } from './angle-slider.types.ts'

export interface AngleSliderRootBaseProps extends RootProps, PolymorphicProps {}
export interface AngleSliderRootProps
  extends
    AngleSliderRootBaseProps,
    /**
     * @vue-ignore
     */
    Omit<HTMLAttributes, 'dir'> {}
export interface AngleSliderRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useAngleSlider } from './use-angle-slider.ts'
import { AngleSliderProvider } from './use-angle-slider-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = withDefaults(defineProps<AngleSliderRootProps>(), {
  disabled: undefined,
  invalid: undefined,
  readOnly: undefined,
} satisfies BooleanDefaults<RootProps>)

const emits = defineEmits<AngleSliderRootEmits>()

const angleSlider = useAngleSlider(props, emits)

AngleSliderProvider(angleSlider)

useForwardExpose()
</script>

<template>
  <ark.div v-bind="angleSlider.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
