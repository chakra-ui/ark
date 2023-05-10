import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { ComponentWithProps } from '../utils'
import { useColorPickerContext } from './color-picker-context'
import { useColorPickerSwatchContext } from './color-picker-swatch.context'

export type ColorPickerSwatchBackgroundProps = HTMLArkProps<'div'>

export const ColorPickerSwatchBackground: ComponentWithProps<ColorPickerSwatchBackgroundProps> =
  defineComponent({
    name: 'ColorPickerSwatchBackground',
    setup(_, { slots, attrs }) {
      const swatchContext = useColorPickerSwatchContext()

      const rootContext = useColorPickerContext()

      return () => (
        <ark.div {...rootContext.value.getSwatchBackgroundProps(swatchContext.value)} {...attrs}>
          {slots.default?.()}
        </ark.div>
      )
    },
  })
