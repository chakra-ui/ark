import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { usePresenceContext } from '../presence'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerPositionerBaseProps extends PolymorphicProps {}
export interface ColorPickerPositionerProps
  extends HTMLProps<'div'>,
    ColorPickerPositionerBaseProps {}

export const ColorPickerPositioner = forwardRef<HTMLDivElement, ColorPickerPositionerProps>(
  (props, ref) => {
    const colorPicker = useColorPickerContext()
    const mergedProps = mergeProps(colorPicker.getPositionerProps(), props)
    const presence = usePresenceContext()

    if (presence.unmounted) {
      return null
    }

    return <ark.div {...mergedProps} ref={ref} />
  },
)

ColorPickerPositioner.displayName = 'ColorPickerPositioner'
