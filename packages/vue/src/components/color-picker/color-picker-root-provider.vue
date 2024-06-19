<script lang="ts">
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { RenderStrategyProps } from '../../utils'
import type { PolymorphicProps } from '../factory'
import type { UseColorPickerReturn } from './use-color-picker'

interface RootProviderProps {
  value: UnwrapRef<UseColorPickerReturn>
}

export interface ColorPickerRootProviderBaseProps
  extends RootProviderProps,
    RenderStrategyProps,
    PolymorphicProps {}
export interface ColorPickerRootProviderProps
  extends ColorPickerRootProviderBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { RenderStrategyPropsProvider } from '../../utils'
import { ark } from '../factory'
import { ColorPickerProvider } from './use-color-picker-context'

const props = defineProps<ColorPickerRootProviderProps>()
const colorPicker = computed(() => props.value)

ColorPickerProvider(colorPicker)
RenderStrategyPropsProvider(
  computed(() => ({ lazyMount: props.lazyMount, unmountOnExit: props.unmountOnExit })),
)
</script>

<template>
  <ark.div v-bind="colorPicker.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
