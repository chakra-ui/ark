import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../../factory'
import { useColorPickerContext } from './color-picker-context'
import { useColorPickerSwatchContext } from './color-picker-swatch-context'

export interface ColorPickerSwatchIndicatorProps extends HTMLArkProps<'div'> {}

export const ColorPickerSwatchIndicator = defineComponent<ColorPickerSwatchIndicatorProps>(
  (_, { slots, attrs }) => {
    const api = useColorPickerContext()
    const swatchProps = useColorPickerSwatchContext()

    return () => (
      <ark.div {...api.value.getSwatchIndicatorProps(swatchProps)} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'ColorPickerSwatchIndicator',
  },
)
