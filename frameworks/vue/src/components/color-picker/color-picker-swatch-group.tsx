import { colorPickerAnatomy } from '@ark-ui/anatomy'
import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'

export interface ColorPickerSwatchGroupProps extends HTMLArkProps<'div'> {}

export const ColorPickerSwatchGroup = defineComponent<ColorPickerSwatchGroupProps>(
  (_, { slots, attrs }) => {
    return () => (
      <ark.div {...colorPickerAnatomy.build().swatchGroup.attrs} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'ColorPickerSwatchGroup',
  },
)
