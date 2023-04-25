import { ark, type HTMLArkProps } from '../factory'
import { parts } from './color-picker.anatomy'

export type ColorPickerSwatchGroupProps = HTMLArkProps<'div'>

export const ColorPickerSwatchGroup = (props: ColorPickerSwatchGroupProps) => (
  <ark.div {...parts.swatchGroup.attrs} {...props} />
)
