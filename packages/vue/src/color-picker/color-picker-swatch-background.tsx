import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { ComponentWithProps } from '../utils'
import { useColorPickerContext } from './color-picker-context'
import { useColorPickerSwatchContext } from './color-picker-swatch-context'

export type ColorPickerSwatchBackgroundProps = HTMLArkProps<'div'>

export const ColorPickerSwatchBackground: ComponentWithProps<ColorPickerSwatchBackgroundProps> =
  defineComponent({
    name: 'ColorPickerSwatchBackground',
    setup(_, { slots, attrs }) {
      const api = useColorPickerContext()
      const swatchProps = useColorPickerSwatchContext()

      return () => (
        <ark.div {...api.value.getSwatchBackgroundProps(swatchProps.value)} {...attrs}>
          {slots.default?.()}
        </ark.div>
      )
    },
  })
