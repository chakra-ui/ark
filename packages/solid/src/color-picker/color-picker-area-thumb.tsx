import { mergeProps } from 'solid-js'
import { ark, type HTMLArkProps } from '../factory'
import { useColorPickerAreaContext } from './color-picker-area-context'
import { useColorPickerContext } from './color-picker-context'

export type ColorPickerAreaThumbProps = HTMLArkProps<'div'>

export const ColorPickerAreaThumb = (props: ColorPickerAreaThumbProps) => {
  const colorPicker = useColorPickerContext()
  const area = useColorPickerAreaContext()

  const mergedProps = mergeProps(colorPicker().getAreaThumbProps(area), props)

  return <ark.div {...mergedProps} />
}
