import { colorPickerAnatomy } from '@ark-ui/anatomy'
import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerValueTextProps extends HTMLArkProps<'span'> {}

export const ColorPickerValueText = defineComponent<ColorPickerValueTextProps>(
  (_, { slots, attrs }) => {
    const api = useColorPickerContext()

    return () => (
      <ark.span {...colorPickerAnatomy.build().valueText.attrs} {...attrs}>
        {slots.default?.() || api.value.valueAsString}
      </ark.span>
    )
  },
  {
    name: 'ColorPickerValueText',
    props: {
      placeholder: {
        type: String,
      },
    },
  },
)
