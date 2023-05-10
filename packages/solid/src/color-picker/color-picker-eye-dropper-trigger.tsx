import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useColorPickerContext } from './color-picker-context'

export type ColorPickerEyeDropperTriggerProps = HTMLArkProps<'button'>

export const ColorPickerEyeDropperTrigger = (props: ColorPickerEyeDropperTriggerProps) => {
  const dialog = useColorPickerContext()
  const triggerProps = mergeProps(() => dialog().eyeDropperTriggerProps, props)
  return <ark.button {...triggerProps} />
}
