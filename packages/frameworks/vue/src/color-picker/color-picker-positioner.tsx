import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useColorPickerContext } from './color-picker-context'

export type ColorPickerPositionerProps = HTMLArkProps<'div'>

export const ColorPickerPositioner = defineComponent({
  name: 'ColorPickerPositioner',
  setup(_, { slots, attrs }) {
    const api = useColorPickerContext()

    return () => (
      <ark.div {...api.value.positionerProps} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
})
