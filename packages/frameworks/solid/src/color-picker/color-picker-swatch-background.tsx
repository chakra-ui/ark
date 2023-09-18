import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useColorPickerContext } from './color-picker-context'
import { useColorPickerSwatchContext } from './color-picker-swatch-context'

export type ColorPickerSwatchBackgroundProps = HTMLArkProps<'div'>

export const ColorPickerSwatchBackground = (props: ColorPickerSwatchBackgroundProps) => {
  const api = useColorPickerContext()
  const colorChannelProps = useColorPickerSwatchContext()
  const mergedProps = mergeProps(api().getSwatchBackgroundProps(colorChannelProps), props)

  return <ark.div {...mergedProps} />
}
