<script lang="ts">
import type { ColorFormat } from '@zag-js/color-picker'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface ColorPickerViewBaseProps extends PolymorphicProps {}
export interface ColorPickerViewProps
  extends ColorPickerViewBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {
  format: ColorFormat
}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { colorPickerAnatomy } from './color-picker.anatomy'
import { useColorPickerContext } from './use-color-picker-context'
import { ColorPickerFormatPropsProvider } from './use-color-picker-format-context'

const props = defineProps<ColorPickerViewProps>()
const colorPicker = useColorPickerContext()

ColorPickerFormatPropsProvider(props)
</script>

<template>
  <ark.div
    v-if="colorPicker.format === format"
    v-bind="colorPickerAnatomy.build().view.attrs"
    :data-format="format"
    :as-child="asChild"
  >
    <slot />
  </ark.div>
</template>
