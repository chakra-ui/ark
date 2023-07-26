import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { ComponentWithProps } from '../utils'
import { useColorPickerAreaContext } from './color-picker-area-context'
import { useColorPickerContext } from './color-picker-context'

export type ColorPickerAreaThumbProps = HTMLArkProps<'div'>

export const ColorPickerAreaThumb: ComponentWithProps<ColorPickerAreaThumbProps> = defineComponent({
  name: 'ColorPickerAreaThumb',
  setup(_, { slots, attrs }) {
    const areaContext = useColorPickerAreaContext()

    const rootContext = useColorPickerContext()

    return () => (
      <ark.div {...rootContext.value.getAreaThumbProps(areaContext.value)} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
})
