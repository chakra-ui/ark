import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HtmlArkProps } from '../factory'
import { useColorPickerAreaContext } from './color-picker-area-context'
import { useColorPickerContext } from './color-picker-context'

export type ColorPickerAreaGradientProps = HtmlArkProps<'div'>

export const ColorPickerAreaGradient = forwardRef<HTMLDivElement, ColorPickerAreaGradientProps>(
  (props, ref) => {
    const colorAreaProps = useColorPickerAreaContext()
    const { getAreaGradientProps } = useColorPickerContext()
    const mergedProps = mergeProps(getAreaGradientProps(colorAreaProps), props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

ColorPickerAreaGradient.displayName = 'ColorPickerAreaGradient'
