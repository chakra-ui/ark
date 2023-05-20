import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useColorPickerContext } from './color-picker-context'
import { useColorPickerSwatchContext } from './color-picker-swatch.context'

export type ColorPickerSwatchBackgroundProps = HTMLArkProps<'div'>

export const ColorPickerSwatchBackground = forwardRef<'div'>((props, ref) => {
  const { getSwatchBackgroundProps } = useColorPickerContext()
  const colorSwatchProps = useColorPickerSwatchContext()
  const mergedProps = mergeProps(getSwatchBackgroundProps(colorSwatchProps), props)

  return <ark.div {...mergedProps} ref={ref} />
})
