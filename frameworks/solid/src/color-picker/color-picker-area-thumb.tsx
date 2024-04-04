import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useColorPickerAreaContext } from './use-color-picker-area-context'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerAreaThumbProps extends HTMLArkProps<'div'> {}

export const ColorPickerAreaThumb = (props: ColorPickerAreaThumbProps) => {
  const colorAreaProps = useColorPickerAreaContext()
  const api = useColorPickerContext()
  const mergedProps = mergeProps(() => api().getAreaThumbProps(colorAreaProps), props)

  return <ark.div {...mergedProps()} />
}
