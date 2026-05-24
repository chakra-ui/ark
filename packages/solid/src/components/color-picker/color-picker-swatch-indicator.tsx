import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useColorPickerContext } from './use-color-picker-context.ts'
import { useColorPickerSwatchPropsContext } from './use-color-picker-swatch-props-context.ts'

export interface ColorPickerSwatchIndicatorBaseProps extends PolymorphicProps<'div'> {}
export interface ColorPickerSwatchIndicatorProps extends HTMLProps<'div'>, ColorPickerSwatchIndicatorBaseProps {}

export const ColorPickerSwatchIndicator = (props: ColorPickerSwatchIndicatorProps) => {
  const api = useColorPickerContext()
  const swatchProps = useColorPickerSwatchPropsContext()
  const mergedProps = mergeProps(() => api().getSwatchIndicatorProps(swatchProps), props)

  return <ark.div {...mergedProps} />
}
