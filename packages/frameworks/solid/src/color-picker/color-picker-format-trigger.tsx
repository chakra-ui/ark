import { mergeProps } from '@zag-js/solid'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { useColorPickerContext } from './color-picker-context'

export interface ColorPickerFormatTriggerProps extends HTMLArkProps<'button'> {}

export const ColorPickerFormatTrigger: ArkComponent<'button'> = (
  props: ColorPickerFormatTriggerProps,
) => {
  const api = useColorPickerContext()
  const mergedProps = mergeProps(() => api().formatTriggerProps, props)

  return <ark.button {...mergedProps} />
}
