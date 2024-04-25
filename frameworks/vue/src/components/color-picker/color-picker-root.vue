<script lang="ts">
import type { RenderStrategyProps } from '../../utils/render-strategy'
import type { RootEmits, RootProps } from './color-picker.types'

export interface ColorPickerRootProps extends RootProps, RenderStrategyProps, PolimoprhicProps {}
export interface ColorPickerRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { ark, type PolimoprhicProps } from '../factory'
import { useColorPicker } from './use-color-picker'
import { ColorPickerProvider } from './use-color-picker-context'
import { RenderStrategyProvider } from '../../utils/use-render-strategy'
import { computed } from 'vue'

const props = withDefaults(defineProps<ColorPickerRootProps>(), { open: undefined })
const emits = defineEmits<ColorPickerRootEmits>()

const colorPicker = useColorPicker(props, emits)
ColorPickerProvider(colorPicker)

RenderStrategyProvider(
  computed(() => ({ lazyMount: props.lazyMount, unmountOnExit: props.unmountOnExit })),
)
</script>

<template>
  <ark.div v-bind="colorPicker.rootProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
