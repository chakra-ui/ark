import { colorPickerAnatomy } from '@ark-ui/anatomy'
import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useColorPickerContext } from './color-picker-context'

export type ColorPickerValueTextProps = HTMLArkProps<'span'>

export const ColorPickerValueText = defineComponent({
  name: 'ColorPickerValueText',
  props: {
    placeholder: {
      type: String,
    },
  },
  setup(_, { slots, attrs }) {
    const api = useColorPickerContext()

    return () => (
      <ark.span {...colorPickerAnatomy.build().valueText.attrs} {...attrs}>
        {slots.default?.() || api.value.valueAsString}
      </ark.span>
    )
  },
})
