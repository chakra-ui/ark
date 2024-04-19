import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerControlProps extends HTMLArkProps<'div'> {}

export const ColorPickerControl = defineComponent<ColorPickerControlProps>(
  (_, { slots, attrs }) => {
    const api = useColorPickerContext()

    return () => (
      <ark.div {...api.value.controlProps} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'ColorPickerControl',
  },
)
