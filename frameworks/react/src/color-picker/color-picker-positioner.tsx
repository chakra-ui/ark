import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { usePresenceContext } from '../presence'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerPositionerProps extends HTMLArkProps<'div'> {}

export const ColorPickerPositioner = forwardRef<HTMLDivElement, ColorPickerPositionerProps>(
  (props, ref) => {
    const colorPicker = useColorPickerContext()
    const mergedProps = mergeProps(colorPicker.positionerProps, props)
    const presenceApi = usePresenceContext()

    if (presenceApi.isUnmounted) {
      return null
    }

    return <ark.div {...mergedProps} ref={ref} />
  },
)

ColorPickerPositioner.displayName = 'ColorPickerPositioner'
