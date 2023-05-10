import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { parts } from './color-picker.anatomy'

export type ColorPickerSwatchGroupProps = HTMLArkProps<'div'>

export const ColorPickerSwatchGroup = forwardRef<'div'>((props, ref) => (
  <ark.div {...parts.swatchGroup.attrs} {...props} ref={ref} />
))
