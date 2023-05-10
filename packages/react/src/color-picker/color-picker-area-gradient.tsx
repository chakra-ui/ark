import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useColorPickerAreaContext } from './color-picker-area-context'
import { useColorPickerContext } from './color-picker-context'

export type ColorPickerAreaGradientProps = HTMLArkProps<'div'>

export const ColorPickerAreaGradient = forwardRef<'div'>((props, ref) => {
  const colorAreaProps = useColorPickerAreaContext()
  const { getAreaGradientProps } = useColorPickerContext()
  const mergedProps = mergeProps(getAreaGradientProps(colorAreaProps), props)

  return <ark.div {...mergedProps} ref={ref} />
})
