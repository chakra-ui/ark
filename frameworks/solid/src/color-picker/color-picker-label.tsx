import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerLabelProps extends HTMLArkProps<'label'> {}

export const ColorPickerLabel = (props: ColorPickerLabelProps) => {
  const api = useColorPickerContext()
  const mergedProps = mergeProps(() => api().labelProps, props)

  return <ark.label {...mergedProps} />
}
