import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useColorPickerAreaContext } from './color-picker-area-context'
import { useColorPickerContext } from './color-picker-context'

export type ColorPickerAreaThumbProps = HTMLArkProps<'div'>

export const ColorPickerAreaThumb = (props: ColorPickerAreaThumbProps) => {
  const api = useColorPickerContext()
  const colorAreaProps = useColorPickerAreaContext()
  const mergedProps = mergeProps(api().getAreaThumbProps(colorAreaProps), props)

  return <ark.div {...mergedProps} />
}
