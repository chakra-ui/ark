import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HtmlArkProps } from '../factory'
import { useColorPickerContext } from './color-picker-context'
import { useColorPickerSwatchContext } from './color-picker-swatch-context'

export type ColorPickerSwatchBackgroundProps = HtmlArkProps<'div'>

export const ColorPickerSwatchBackground = forwardRef<
  HTMLDivElement,
  ColorPickerSwatchBackgroundProps
>((props, ref) => {
  const { getSwatchBackgroundProps } = useColorPickerContext()
  const colorSwatchProps = useColorPickerSwatchContext()
  const mergedProps = mergeProps(getSwatchBackgroundProps(colorSwatchProps), props)

  return <ark.div {...mergedProps} ref={ref} />
})

ColorPickerSwatchBackground.displayName = 'ColorPickerSwatchBackground'
