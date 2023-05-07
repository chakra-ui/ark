import { ark, type HTMLArkProps } from '../factory'
import { useColorPickerContext } from './color-picker-context'

export type ColorPickerEyeDropperTriggerProps = HTMLArkProps<'button'>

export const ColorPickerEyeDropperTrigger = (props: ColorPickerEyeDropperTriggerProps) => {
  const dialog = useColorPickerContext()
  return <ark.button {...dialog().eyeDropperTriggerProps} {...props} />
}
