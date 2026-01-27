<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { BooleanDefaults } from '../../types'
import type { RenderStrategyProps } from '../../utils/use-render-strategy'
import type { PolymorphicProps } from '../factory'
import type { RootEmits, RootProps } from './color-picker.types'

export interface ColorPickerRootBaseProps extends RootProps, RenderStrategyProps, PolymorphicProps {}
export interface ColorPickerRootProps
  extends
    ColorPickerRootBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
export interface ColorPickerRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { RenderStrategyPropsProvider } from '../../utils/use-render-strategy'
import { useForwardExpose } from '../../utils/use-forward-expose'
import { ark } from '../factory'
import { PresenceProvider, usePresence } from '../presence'
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
  inline: undefined,
} satisfies BooleanDefaults<RootProps>)

const emits = defineEmits<ColorPickerRootEmits>()

const colorPicker = useColorPicker(props, emits)

const presence = usePresence(
  computed(() => ({
    present: colorPicker.value.open,
    lazyMount: props.lazyMount,
    unmountOnExit: props.unmountOnExit,
  })),
  emits,
)

ColorPickerProvider(colorPicker)
PresenceProvider(presence)

RenderStrategyPropsProvider(computed(() => ({ lazyMount: props.lazyMount, unmountOnExit: props.unmountOnExit })))

useForwardExpose()
</script>

<template>
  <ark.div v-bind="colorPicker.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
