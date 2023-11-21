import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useColorPickerContext } from './color-picker-context'
import { useColorPickerSwatchContext } from './color-picker-swatch-context'

export interface ColorPickerSwatchIndicatorProps extends HTMLArkProps<'div'> {}

export const ColorPickerSwatchIndicator = forwardRef<
  HTMLDivElement,
  ColorPickerSwatchIndicatorProps
>((props, ref) => {
  const api = useColorPickerContext()
  const swatchProps = useColorPickerSwatchContext()
  const mergedProps = mergeProps(api.getSwatchIndicatorProps(swatchProps), props)

  return <ark.div {...mergedProps} ref={ref} />
})

ColorPickerSwatchIndicator.displayName = 'ColorPickerSwatchIndicator'
