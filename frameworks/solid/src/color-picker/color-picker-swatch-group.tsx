import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerSwatchGroupProps extends HTMLArkProps<'div'> {}

export const ColorPickerSwatchGroup = (props: ColorPickerSwatchGroupProps) => {
  const api = useColorPickerContext()
  const mergedProps = mergeProps(() => api().swatchGroupProps, props)

  return <ark.div {...mergedProps()} />
}
