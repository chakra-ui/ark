import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../factory'
import { useColorPickerAreaContext } from './use-color-picker-area-context'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerAreaBackgroundProps extends HTMLArkProps<'div'> {}

export const ColorPickerAreaBackground = (props: ColorPickerAreaBackgroundProps) => {
  const colorAreaProps = useColorPickerAreaContext()
  const api = useColorPickerContext()
  const mergedProps = mergeProps(() => api().getAreaBackgroundProps(colorAreaProps), props)

  return <ark.div {...mergedProps} />
}
