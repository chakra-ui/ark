import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useColorPickerContext } from './color-picker-context'

export type ColorPickerContentProps = HTMLArkProps<'div'>

export const ColorPickerContent = (props: ColorPickerContentProps) => {
  const colorPicker = useColorPickerContext()
  const contentProps = mergeProps(() => colorPicker().contentProps, props)

  return <ark.div {...contentProps} />
}
