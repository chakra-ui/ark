import { colorPickerAnatomy } from '@ark-ui/anatomy'
import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'

export interface ColorPickerSwatchGroupProps extends HTMLArkProps<'div'> {}

export const ColorPickerSwatchGroup = defineComponent({
  name: 'ColorPickerSwatchGroup',
  setup(_, { slots, attrs }) {
    return () => (
      <ark.div {...colorPickerAnatomy.build().swatchGroup.attrs} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
})
