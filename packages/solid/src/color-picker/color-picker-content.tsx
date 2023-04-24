import { ark, type HTMLArkProps } from '../factory'
import { useColorPickerContext } from './color-picker-context'

export type ColorPickerContentProps = HTMLArkProps<'div'>

export const ColorPickerContent = (props: ColorPickerContentProps) => {
  const dialog = useColorPickerContext()

  return <ark.div {...dialog().contentProps} {...props} />
}
