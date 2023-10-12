import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useColorPickerContext } from './color-picker-context'

export interface ColorPickerPositionerProps extends HTMLArkProps<'div'> {}

export const ColorPickerPositioner = forwardRef<HTMLDivElement, ColorPickerPositionerProps>(
  (props, ref) => {
    const api = useColorPickerContext()
    const mergedProps = mergeProps(api.positionerProps, props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

ColorPickerPositioner.displayName = 'ColorPickerPositioner'
