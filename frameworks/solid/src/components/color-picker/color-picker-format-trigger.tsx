import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../../factory'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerFormatTriggerProps extends HTMLArkProps<'button'> {}

export const ColorPickerFormatTrigger = (props: ColorPickerFormatTriggerProps) => {
  const api = useColorPickerContext()
  const mergedProps = mergeProps(() => api().formatTriggerProps, props)

  return <ark.button {...mergedProps} />
}
