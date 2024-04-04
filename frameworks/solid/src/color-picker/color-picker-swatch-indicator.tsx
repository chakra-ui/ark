import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'
import { useColorPickerSwatchContext } from './use-color-picker-swatch-context'

export interface ColorPickerSwatchIndicatorProps extends HTMLArkProps<'div'> {}

export const ColorPickerSwatchIndicator = (props: ColorPickerSwatchIndicatorProps) => {
  const api = useColorPickerContext()
  const swatchProps = useColorPickerSwatchContext()
  const mergedProps = mergeProps(() => api().getSwatchIndicatorProps(swatchProps), props)

  return <ark.div {...mergedProps()} />
}
