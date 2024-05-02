<script lang="ts">
import type { BooleanDefaults } from '../../types'
import type { RenderStrategyProps } from '../../utils'
import type { RootEmits, RootProps } from './color-picker.types'

export interface ColorPickerRootProps extends RootProps, RenderStrategyProps, PolymorphicProps {}
export interface ColorPickerRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { ark, type PolymorphicProps } from '../factory'
import { useColorPicker } from './use-color-picker'
import { ColorPickerProvider } from './use-color-picker-context'
import { RenderStrategyPropsProvider } from '../../utils'
import { computed } from 'vue'

const defaults: BooleanDefaults<RootProps> = {
  closeOnSelect: undefined,
  defaultOpen: undefined,
  disabled: undefined,
  open: undefined,
  readOnly: undefined,
}

const props = withDefaults(defineProps<ColorPickerRootProps>(), defaults)
const emits = defineEmits<ColorPickerRootEmits>()

const colorPicker = useColorPicker(props, emits)
ColorPickerProvider(colorPicker)

RenderStrategyPropsProvider(
  computed(() => ({ lazyMount: props.lazyMount, unmountOnExit: props.unmountOnExit })),
)
</script>

<template>
  <ark.div v-bind="colorPicker.rootProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
