import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useColorPickerContext } from './color-picker-context'

export interface ColorPickerFormatSelectProps extends HTMLArkProps<'select'> {}

export const ColorPickerFormatSelect = (props: ColorPickerFormatSelectProps) => {
  const api = useColorPickerContext()
  const mergedProps = mergeProps(() => api().formatSelectProps, props)

  return <ark.select {...mergedProps} />
}
