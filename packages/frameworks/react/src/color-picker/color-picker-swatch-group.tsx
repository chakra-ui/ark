import { colorPickerAnatomy } from '@ark-ui/anatomy'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'

export interface ColorPickerSwatchGroupProps extends HTMLArkProps<'div'> {}

export const ColorPickerSwatchGroup = forwardRef<HTMLDivElement, ColorPickerSwatchGroupProps>(
  (props, ref) => (
    <ark.div {...colorPickerAnatomy.build().swatchGroup.attrs} {...props} ref={ref} />
  ),
)

ColorPickerSwatchGroup.displayName = 'ColorPickerSwatchGroup'
