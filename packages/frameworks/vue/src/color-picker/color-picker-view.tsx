import { colorPickerAnatomy } from '@ark-ui/anatomy'
import type { ColorFormat } from '@zag-js/color-picker'
import type { PropType } from 'vue'
import { defineComponent } from 'vue'
import { ark } from '../factory'
import { useColorPickerContext } from './color-picker-context'

export interface ColorPickerViewProps {
  format: ColorFormat
}

export const ColorPickerView = defineComponent<ColorPickerViewProps>(
  (props, { slots, attrs }) => {
    const api = useColorPickerContext()
    return () =>
      api.value.format === props.format ? (
        <ark.div data-format={props.format} {...colorPickerAnatomy.build().view.attrs} {...attrs}>
          {slots.default?.()}
        </ark.div>
      ) : null
  },
  {
    name: 'ColorPickerView',
    props: {
      format: {
        type: String as PropType<ColorPickerViewProps['format']>,
        required: true,
      },
    },
  },
)
