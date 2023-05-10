import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useColorPickerAreaContext } from './color-picker-area-context'
import { useColorPickerContext } from './color-picker-context'

export type ColorPickerAreaThumbProps = HTMLArkProps<'div'>

export const ColorPickerAreaThumb = (props: ColorPickerAreaThumbProps) => {
  const colorPicker = useColorPickerContext()
  const area = useColorPickerAreaContext()
  const areaThumbProps = mergeProps(() => colorPicker().getAreaThumbProps(area), props)
  return <ark.div {...areaThumbProps} />
}
