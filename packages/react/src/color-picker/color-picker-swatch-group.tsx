import { forwardRef } from 'react'
import { ark, type HtmlArkProps } from '../factory'
import { parts } from './color-picker.anatomy'

export type ColorPickerSwatchGroupProps = HtmlArkProps<'div'>

export const ColorPickerSwatchGroup = forwardRef<HTMLDivElement, ColorPickerSwatchGroupProps>(
  (props, ref) => <ark.div {...parts.swatchGroup.attrs} {...props} ref={ref} />,
)

ColorPickerSwatchGroup.displayName = 'ColorPickerSwatchGroup'
