import { forwardRef } from '@polymorphic-factory/react'
import { ark, type HTMLArkProps } from '../factory'
import { parts } from './color-picker.anatomy'

export type ColorPickerSwatchGroupProps = HTMLArkProps<'div'>

export const ColorPickerSwatchGroup = forwardRef<'div', ColorPickerSwatchGroupProps>(
  (props, ref) => <ark.div {...parts.swatchGroup.attrs} {...props} ref={ref} />,
)
