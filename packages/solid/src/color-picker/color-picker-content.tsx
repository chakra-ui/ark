import { ark, type HTMLArkProps } from '../factory'
import { useColorPickerContext } from './color-picker-context'

export type ColorPickerContentProps = HTMLArkProps<'div'>

export const ColorPickerContent = (props: ColorPickerContentProps) => {
  const colorPicker = useColorPickerContext()

  return <ark.div {...colorPicker().contentProps} {...props} />
}
