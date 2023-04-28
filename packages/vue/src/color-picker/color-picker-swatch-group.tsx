import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { ComponentWithProps } from '../utils'
import { parts } from './color-picker.anatomy'

export type ColorPickerSwatchGroupProps = HTMLArkProps<'div'>

export const ColorPickerSwatchGroup: ComponentWithProps<ColorPickerSwatchGroupProps> =
  defineComponent({
    name: 'ColorPickerSwatchGroup',
    setup(_, { slots, attrs }) {
      return () => (
        <ark.div {...parts.swatchGroup.attrs} {...attrs}>
          {slots.default?.()}
        </ark.div>
      )
    },
  })
