import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '~/factory'
import { useColorPickerContext } from './color-picker-context'

export interface ColorPickerFormatSelectProps extends HTMLArkProps<'button'> {}

export const ColorPickerFormatSelect = defineComponent<ColorPickerFormatSelectProps>(
  (_, { attrs }) => {
    const api = useColorPickerContext()

    return () => (
      <ark.select {...api.value.formatSelectProps} {...attrs}>
        {['rgba', 'hsla', 'hsba'].map((format) => (
          <ark.option key={format} value={format}>
            {format}
          </ark.option>
        ))}
      </ark.select>
    )
  },
  {
    name: 'ColorPickerFormatSelect',
  },
)
