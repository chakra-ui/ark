import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'
import { useColorPickerSwatchPropsContext } from './use-color-picker-swatch-props-context'

export interface ColorPickerSwatchIndicatorProps extends HTMLArkProps<'div'> {}

export const ColorPickerSwatchIndicator = (props: ColorPickerSwatchIndicatorProps) => {
  const api = useColorPickerContext()
  const swatchProps = useColorPickerSwatchPropsContext()
  const mergedProps = mergeProps(() => api().getSwatchIndicatorProps(swatchProps), props)

  return <ark.div {...mergedProps} />
}
