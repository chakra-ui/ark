import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'
import { useColorPickerSwatchPropsContext } from './use-color-picker-swatch-props-context'

export interface ColorPickerSwatchIndicatorProps extends HTMLArkProps<'div'> {}

export const ColorPickerSwatchIndicator = defineComponent<ColorPickerSwatchIndicatorProps>(
  (_, { slots, attrs }) => {
    const api = useColorPickerContext()
    const swatchProps = useColorPickerSwatchPropsContext()

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
