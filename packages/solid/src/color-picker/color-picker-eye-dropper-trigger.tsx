import { ark, type HTMLArkProps } from '../factory'
import { useColorPickerContext } from './color-picker-context'

export type ColorPickerEyeDropperTriggerProps = HTMLArkProps<'div'>

export const ColorPickerEyeDropperTrigger = (props: ColorPickerEyeDropperTriggerProps) => {
  const dialog = useColorPickerContext()

  return <ark.div {...dialog().eyeDropperTriggerProps} {...props} />
}
