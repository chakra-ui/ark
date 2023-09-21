import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useColorPickerContext } from './color-picker-context'
import { useColorPickerSwatchContext } from './color-picker-swatch-context'

export interface ColorPickerSwatchBackgroundProps extends HTMLArkProps<'div'> {}

export const ColorPickerSwatchBackground = forwardRef<
  HTMLDivElement,
  ColorPickerSwatchBackgroundProps
>((props, ref) => {
  const api = useColorPickerContext()
  const colorSwatchProps = useColorPickerSwatchContext()
  const mergedProps = mergeProps(api.getSwatchBackgroundProps(colorSwatchProps), props)

  return <ark.div {...mergedProps} ref={ref} />
})

ColorPickerSwatchBackground.displayName = 'ColorPickerSwatchBackground'
