import { type SwatchProps } from '@zag-js/color-picker'
import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useColorPickerContext } from './color-picker-context'
import { useColorPickerSwatchContext } from './color-picker-swatch-context'

export interface ColorPickerSwatchIndicatorProps extends Assign<HTMLArkProps<'div'>, SwatchProps> {}

export const ColorPickerSwatchIndicator = defineComponent({
  name: 'ColorPickerSwatchIndicator',
  setup(_, { slots, attrs }) {
    const api = useColorPickerContext()
    const swatchProps = useColorPickerSwatchContext()

    return () => (
      <ark.div {...api.value.getSwatchIndicatorProps(swatchProps)} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
})
