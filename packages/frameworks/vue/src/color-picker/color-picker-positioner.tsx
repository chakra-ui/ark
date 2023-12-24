import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useColorPickerContext } from './color-picker-context'

export interface ColorPickerPositionerProps extends HTMLArkProps<'div'> {}

export const ColorPickerPositioner = defineComponent<ColorPickerPositionerProps>(
  (_, { slots, attrs }) => {
    const api = useColorPickerContext()

    return () => (
      <ark.div {...api.value.positionerProps} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'ColorPickerPositioner',
  },
)
