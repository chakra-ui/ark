import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useColorPickerAreaContext } from './color-picker-area-context'
import { useColorPickerContext } from './color-picker-context'

export interface ColorPickerAreaGradientProps extends HTMLArkProps<'div'> {}

export const ColorPickerAreaGradient = forwardRef<HTMLDivElement, ColorPickerAreaGradientProps>(
  (props, ref) => {
    const colorAreaProps = useColorPickerAreaContext()
    const api = useColorPickerContext()
    const mergedProps = mergeProps(api.getAreaGradientProps(colorAreaProps), props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

ColorPickerAreaGradient.displayName = 'ColorPickerAreaGradient'
