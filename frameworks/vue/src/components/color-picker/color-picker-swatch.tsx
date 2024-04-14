import type { SwatchProps } from '@zag-js/color-picker'
import { type PropType, defineComponent, reactive } from 'vue'
import { type HTMLArkProps, ark } from '../../factory'
import type { Assign } from '../../types'
import { useColorPickerContext } from './color-picker-context'
import { ColorPickerSwatchProvider } from './color-picker-swatch-context'

export interface ColorPickerSwatchProps extends Assign<HTMLArkProps<'div'>, SwatchProps> {
  readOnly?: SwatchProps['respectAlpha']
}

export const ColorPickerSwatch = defineComponent<ColorPickerSwatchProps>(
  (props, { slots, attrs }) => {
    const api = useColorPickerContext()
    ColorPickerSwatchProvider(reactive(props))

    return () => (
      <ark.div {...api.value.getSwatchProps(props)} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'ColorPickerSwatch',
    props: {
      readOnly: {
        type: Boolean as PropType<SwatchProps['respectAlpha']>,
        default: undefined,
      },
      value: {
        type: [String, Object] as PropType<SwatchProps['value']>,
        required: true,
      },
    },
  },
)
