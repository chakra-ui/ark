import { mergeProps } from '@zag-js/solid'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { useColorPickerContext } from './color-picker-context'

export interface ColorPickerSwatchGroupProps extends HTMLArkProps<'div'> {}

export const ColorPickerSwatchGroup: ArkComponent<'div'> = (props) => {
  const api = useColorPickerContext()
  const mergedProps = mergeProps(() => api().swatchGroupProps, props)

  return <ark.div {...mergedProps} />
}
