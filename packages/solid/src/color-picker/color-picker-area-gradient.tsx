import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useColorPickerAreaContext } from './color-picker-area-context'
import { useColorPickerContext } from './color-picker-context'

export type ColorPickerAreaGradientProps = HTMLArkProps<'div'>

export const ColorPickerAreaGradient = (props: ColorPickerAreaGradientProps) => {
  const api = useColorPickerContext()
  const colorAreaProps = useColorPickerAreaContext()
  const mergedProps = mergeProps(api().getAreaGradientProps(colorAreaProps), props)

  return <ark.div {...mergedProps} />
}
