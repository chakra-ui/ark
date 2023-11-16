import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useColorPickerContext } from './color-picker-context'

export interface ColorPickerFormatTriggerProps extends HTMLArkProps<'button'> {}

export const ColorPickerFormatTrigger = (props: ColorPickerFormatTriggerProps) => {
  const api = useColorPickerContext()
  const mergedProps = mergeProps(() => api().formatTriggerProps, props)

  return <ark.button {...mergedProps} />
}
