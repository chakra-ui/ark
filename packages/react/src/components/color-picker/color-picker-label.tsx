'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useColorPickerContext } from './use-color-picker-context.ts'

export interface ColorPickerLabelBaseProps extends PolymorphicProps {}
export interface ColorPickerLabelProps extends HTMLProps<'label'>, ColorPickerLabelBaseProps {}

export const ColorPickerLabel = forwardRef<HTMLLabelElement, ColorPickerLabelProps>((props, ref) => {
  const colorPicker = useColorPickerContext()
  const mergedProps = mergeProps(colorPicker.getLabelProps(), props)

  return <ark.label {...mergedProps} ref={ref} />
})

ColorPickerLabel.displayName = 'ColorPickerLabel'
