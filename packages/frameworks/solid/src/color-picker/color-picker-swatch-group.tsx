import { colorPickerAnatomy } from '@ark-ui/anatomy'
import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'

export type ColorPickerSwatchGroupProps = HTMLArkProps<'div'>

export const ColorPickerSwatchGroup = (props: ColorPickerSwatchGroupProps) => {
  const mergedProps = mergeProps(() => colorPickerAnatomy.build().swatchGroup.attrs, props)

  return <ark.div {...mergedProps} />
}
