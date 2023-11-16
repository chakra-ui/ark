import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useColorPickerContext } from './color-picker-context'

export type ColorPickerFormatSelectProps = HTMLArkProps<'button'>

export const ColorPickerFormatSelect = defineComponent({
  name: 'ColorPickerFormatSelect',
  setup(_, { slots, attrs }) {
    const api = useColorPickerContext()

    return () => (
      <ark.select {...api.value.formatSelectProps} {...attrs}>
        {slots.default?.()}
      </ark.select>
    )
  },
})
