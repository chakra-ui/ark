import type { ColorFormat } from '@zag-js/color-picker'
import type { PropType } from 'vue'
import { defineComponent } from 'vue'
import { useColorPickerContext } from './color-picker-context'

export interface ColorPickerViewProps {
  format: ColorFormat
}

export const ColorPickerView = defineComponent({
  name: 'ColorPickerView',
  props: {
    format: {
      type: String as PropType<ColorPickerViewProps['format']>,
      required: true,
    },
  },
  setup(props, { slots }) {
    const api = useColorPickerContext()
    return () => (api.value.format === props.format ? slots.default?.() : null)
  },
})
