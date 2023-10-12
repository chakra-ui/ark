import { defineComponent } from 'vue'
import { ark } from '../factory'
import { ColorPickerProvider } from './color-picker-context'
import { emits, props } from './color-picker.props'
import { useColorPicker, type UseColorPickerProps } from './use-color-picker'

export type ColorPickerProps = UseColorPickerProps

export const ColorPicker = defineComponent({
  name: 'ColorPicker',
  props,
  emits,
  setup(props, { slots, emit, attrs }) {
    const api = useColorPicker(props, emit)
    ColorPickerProvider(api)

    return () => (
      <>
        <ark.div {...api.value.rootProps} {...attrs}>
          {slots?.default?.(api.value)}
        </ark.div>
        <input {...api.value.hiddenInputProps} />
      </>
    )
  },
})
