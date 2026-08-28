'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useColorPickerContext } from './use-color-picker-context.ts'
import { useColorPickerSwatchPropsContext } from './use-color-picker-swatch-props-context.ts'

export interface ColorPickerSwatchIndicatorBaseProps extends PolymorphicProps {}
export interface ColorPickerSwatchIndicatorProps extends HTMLProps<'div'>, ColorPickerSwatchIndicatorBaseProps {}

export const ColorPickerSwatchIndicator = forwardRef<HTMLDivElement, ColorPickerSwatchIndicatorProps>((props, ref) => {
  const colorPicker = useColorPickerContext()
  const swatchProps = useColorPickerSwatchPropsContext()
  const mergedProps = mergeProps(colorPicker.getSwatchIndicatorProps(swatchProps), props)

  return <ark.div {...mergedProps} ref={ref} />
})

ColorPickerSwatchIndicator.displayName = 'ColorPickerSwatchIndicator'
