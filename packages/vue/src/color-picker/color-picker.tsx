import { defineComponent } from 'vue'
import { ColorPickerProvider } from './color-picker-context'
import { emits, props } from './color-picker.props'
import { useColorPicker, type UseColorPickerProps } from './use-color-picker'

export type ColorPickerProps = UseColorPickerProps

export const ColorPicker = defineComponent({
  name: 'ColorPicker',
  props,
  emits,
  setup(props, { slots, emit }) {
    const api = useColorPicker(props, emit)
    ColorPickerProvider(api)

    return () => slots.default?.(api.value)
  },
})
