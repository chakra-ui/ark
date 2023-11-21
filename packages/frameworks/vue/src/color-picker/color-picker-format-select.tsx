import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useColorPickerContext } from './color-picker-context'

export interface ColorPickerFormatSelectProps extends HTMLArkProps<'button'> {}

export const ColorPickerFormatSelect = defineComponent({
  name: 'ColorPickerFormatSelect',
  setup(_, { attrs }) {
    const api = useColorPickerContext()

    return () => (
      <ark.select {...api.value.formatSelectProps} {...attrs}>
        {['hex', 'rgb', 'hsl'].map((format) => (
          <ark.option value={format}>{format}</ark.option>
        ))}
      </ark.select>
    )
  },
})
