import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { ComponentWithProps } from '../utils'
import { useColorPickerAreaContext } from './color-picker-area-context'
import { useColorPickerContext } from './color-picker-context'

export type ColorPickerAreaGradientProps = HTMLArkProps<'div'>

export const ColorPickerAreaGradient: ComponentWithProps<ColorPickerAreaGradientProps> =
  defineComponent({
    name: 'ColorPickerAreaGradient',
    setup(_, { slots, attrs }) {
      const api = useColorPickerContext()
      const gradientProps = useColorPickerAreaContext()

      return () => (
        <ark.div {...api.value.getAreaGradientProps(gradientProps.value)} {...attrs}>
          {slots.default?.()}
        </ark.div>
      )
    },
  })
