import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { ComponentWithProps } from '../utils'
import { useColorPickerAreaContext } from './color-picker-area-context'
import { useColorPickerContext } from './color-picker-context'

export interface ColorPickerAreaThumbProps extends HTMLArkProps<'div'> {}

export const ColorPickerAreaThumb: ComponentWithProps<ColorPickerAreaThumbProps> = defineComponent({
  name: 'ColorPickerAreaThumb',
  setup(_, { slots, attrs }) {
    const api = useColorPickerContext()
    const areaProps = useColorPickerAreaContext()

    return () => (
      <ark.div {...api.value.getAreaThumbProps(areaProps.value)} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
})
