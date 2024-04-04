import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerControlProps extends HTMLArkProps<'div'> {}

export const ColorPickerControl = (props: ColorPickerControlProps) => {
  const api = useColorPickerContext()
  const mergedProps = mergeProps(() => api().controlProps, props)

  return <ark.div {...mergedProps()} />
}
