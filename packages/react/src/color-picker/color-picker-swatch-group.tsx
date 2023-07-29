import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { parts } from './color-picker.anatomy'

export type ColorPickerSwatchGroupProps = ComponentPropsWithoutRef<typeof ark.div>

export const ColorPickerSwatchGroup = forwardRef<HTMLDivElement, ColorPickerSwatchGroupProps>(
  (props, ref) => <ark.div {...parts.swatchGroup.attrs} {...props} ref={ref} />,
)

ColorPickerSwatchGroup.displayName = 'ColorPickerSwatchGroup'
