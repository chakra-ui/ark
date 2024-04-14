import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useColorPickerContext } from './color-picker-context'

export interface ColorPickerFormatTriggerProps extends HTMLArkProps<'button'> {}

export const ColorPickerFormatTrigger = defineComponent<ColorPickerFormatTriggerProps>(
  (_, { slots, attrs }) => {
    const api = useColorPickerContext()

    return () => (
      <ark.button {...api.value.formatTriggerProps} {...attrs}>
        {slots.default?.()}
      </ark.button>
    )
  },
  {
    name: 'ColorPickerFormatTrigger',
  },
)
