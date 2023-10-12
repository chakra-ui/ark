import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useColorPickerAreaContext } from './color-picker-area-context'
import { useColorPickerContext } from './color-picker-context'

export interface ColorPickerAreaBackgroundProps extends HTMLArkProps<'div'> {}

export const ColorPickerAreaBackground = forwardRef<HTMLDivElement, ColorPickerAreaBackgroundProps>(
  (props, ref) => {
    const colorAreaProps = useColorPickerAreaContext()
    const api = useColorPickerContext()
    const mergedProps = mergeProps(api.getAreaBackgroundProps(colorAreaProps), props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

ColorPickerAreaBackground.displayName = 'ColorPickerAreaBackground'
