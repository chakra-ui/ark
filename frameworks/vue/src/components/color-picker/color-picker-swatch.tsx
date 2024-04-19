import type { SwatchProps } from '@zag-js/color-picker'
import { type PropType, defineComponent, ref } from 'vue'
import type { Assign } from '../../types'
import { type HTMLArkProps, ark } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'
import { ColorPickerSwatchPropsProvider } from './use-color-picker-swatch-props-context'

export interface ColorPickerSwatchProps extends Assign<HTMLArkProps<'div'>, SwatchProps> {
  readOnly?: SwatchProps['respectAlpha']
}

export const ColorPickerSwatch = defineComponent<ColorPickerSwatchProps>(
  (props, { slots, attrs }) => {
    const api = useColorPickerContext()
    ColorPickerSwatchPropsProvider(ref(props))

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
