import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useColorPickerContext } from './color-picker-context'

export interface ColorPickerPositionerProps extends HTMLArkProps<'div'> {}

export const ColorPickerPositioner = (props: ColorPickerPositionerProps) => {
  const api = useColorPickerContext()
  const mergedProps = mergeProps(() => api().positionerProps, props)

  return <ark.div {...mergedProps} />
}
