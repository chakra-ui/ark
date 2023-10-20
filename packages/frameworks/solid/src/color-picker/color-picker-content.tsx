import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useColorPickerContext } from './color-picker-context'

export interface ColorPickerContentProps extends HTMLArkProps<'div'> {}

export const ColorPickerContent = (props: ColorPickerContentProps) => {
  const api = useColorPickerContext()
  const mergedProps = mergeProps(() => api().contentProps, props)

  return <ark.div {...mergedProps} />
}
