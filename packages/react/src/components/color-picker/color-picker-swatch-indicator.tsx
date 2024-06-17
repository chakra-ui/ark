import { mergeProps } from '@zag-js/react'
import { type HTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'
import { useColorPickerSwatchPropsContext } from './use-color-picker-swatch-props-context'

export interface ColorPickerSwatchIndicatorBaseProps extends PolymorphicProps {}
export interface ColorPickerSwatchIndicatorProps
  extends HTMLAttributes<HTMLDivElement>,
    ColorPickerSwatchIndicatorBaseProps {}

export const ColorPickerSwatchIndicator = forwardRef<
  HTMLDivElement,
  ColorPickerSwatchIndicatorProps
>((props, ref) => {
  const colorPicker = useColorPickerContext()
  const swatchProps = useColorPickerSwatchPropsContext()
  const mergedProps = mergeProps(colorPicker.getSwatchIndicatorProps(swatchProps), props)

  return <ark.div {...mergedProps} ref={ref} />
})

ColorPickerSwatchIndicator.displayName = 'ColorPickerSwatchIndicator'
