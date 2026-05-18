<script lang="ts">
import type { ColorFormat } from '@zag-js/color-picker'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface ColorPickerViewBaseProps extends PolymorphicProps {}
export interface ColorPickerViewProps
  extends
    ColorPickerViewBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {
  format: ColorFormat
}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { colorPickerAnatomy } from './color-picker.anatomy.ts'
import { useColorPickerContext } from './use-color-picker-context.ts'
import { ColorPickerFormatPropsProvider } from './use-color-picker-format-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = defineProps<ColorPickerViewProps>()
const colorPicker = useColorPickerContext()

ColorPickerFormatPropsProvider(props)

useForwardExpose()
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
