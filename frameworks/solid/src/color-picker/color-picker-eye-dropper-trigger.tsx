import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerEyeDropperTriggerProps extends HTMLArkProps<'button'> {}

export const ColorPickerEyeDropperTrigger = (props: ColorPickerEyeDropperTriggerProps) => {
  const api = useColorPickerContext()
  const mergedProps = mergeProps(() => api().eyeDropperTriggerProps, props)

  return <ark.button {...mergedProps()} />
}
