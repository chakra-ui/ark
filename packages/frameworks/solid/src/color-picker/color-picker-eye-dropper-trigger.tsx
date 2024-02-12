import { mergeProps } from '@zag-js/solid'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { useColorPickerContext } from './color-picker-context'

export interface ColorPickerEyeDropperTriggerProps extends HTMLArkProps<'button'> {}

export const ColorPickerEyeDropperTrigger: ArkComponent<'button'> = (
  props: ColorPickerEyeDropperTriggerProps,
) => {
  const api = useColorPickerContext()
  const mergedProps = mergeProps(() => api().eyeDropperTriggerProps, props)

  return <ark.button {...mergedProps} />
}
