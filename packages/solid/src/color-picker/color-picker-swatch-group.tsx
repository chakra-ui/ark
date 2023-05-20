import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { parts } from './color-picker.anatomy'

export type ColorPickerSwatchGroupProps = HTMLArkProps<'div'>

export const ColorPickerSwatchGroup = (props: ColorPickerSwatchGroupProps) => {
  const groupProps = mergeProps(parts.swatchGroup.attrs, props)
  return <ark.div {...groupProps} />
}
