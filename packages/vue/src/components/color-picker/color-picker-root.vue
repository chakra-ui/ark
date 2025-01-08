<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { BooleanDefaults } from '../../types'
import type { RenderStrategyProps } from '../../utils'
import type { PolymorphicProps } from '../factory'
import type { RootEmits, RootProps } from './color-picker.types'

export interface ColorPickerRootBaseProps
  extends RootProps,
    RenderStrategyProps,
    PolymorphicProps {}
export interface ColorPickerRootProps
  extends ColorPickerRootBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
export interface ColorPickerRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
iimport { computed } from 'vue'
import { RenderStrategyPropsProvider,useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { useColorPicker } from './use-color-picker'
import { ColorPickerProvider } from './use-color-picker-context'
const props = withDefaults(defineProps<ColorPickerRootProps>(), {
  closeOnSelect: undefined,
  defaultOpen: undefined,
  disabled: undefined,
  invalid: undefined,
  open: undefined,
  openAutoFocus: undefined,
  readOnly: undefined,
  required: undefined,
} satisfies BooleanDefaults<RootProps>)

const emits = defineEmits<ColorPickerRootEmits>()

const colorPicker = useColorPicker(props, emits)
ColorPickerProvider(colorPicker)

RenderStrategyPropsProvider(
  computed(() => ({ lazyMount: props.lazyMount, unmountOnExit: props.unmountOnExit })),
)

useForwardExpose()
</script>

<template>
  <ark.div v-bind="colorPicker.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
