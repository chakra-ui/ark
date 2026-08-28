'use client'

import type { ColorFormat } from '@zag-js/color-picker'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { colorPickerAnatomy } from './color-picker.anatomy.ts'
import { useColorPickerContext } from './use-color-picker-context.ts'
import { ColorPickerFormatPropsProvider } from './use-color-picker-format-context.ts'

interface FormatOptions {
  format: ColorFormat
}

export interface ColorPickerViewBaseProps extends FormatOptions, PolymorphicProps {}
export interface ColorPickerViewProps extends HTMLProps<'div'>, ColorPickerViewBaseProps {}

const splitFormatOptions = createSplitProps<FormatOptions>()

export const ColorPickerView = forwardRef<HTMLDivElement, ColorPickerViewProps>((props, ref) => {
  const colorPicker = useColorPickerContext()
  const [formatProps, restProps] = splitFormatOptions(props, ['format'])

  if (colorPicker.format !== formatProps.format) {
    return null
  }

  return (
    <ColorPickerFormatPropsProvider value={formatProps}>
      <ark.div ref={ref} data-format={props.format} {...colorPickerAnatomy.build().view.attrs} {...restProps} />
    </ColorPickerFormatPropsProvider>
  )
})

ColorPickerView.displayName = 'ColorPickerView'
