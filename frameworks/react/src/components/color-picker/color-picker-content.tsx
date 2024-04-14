import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { usePresenceContext } from '../presence'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerContentProps extends HTMLArkProps<'div'> {}

export const ColorPickerContent = forwardRef<HTMLDivElement, ColorPickerContentProps>(
  (props, ref) => {
    const colorPicker = useColorPickerContext()
    const presence = usePresenceContext()
    const mergedProps = mergeProps(colorPicker.contentProps, presence.getPresenceProps(ref), props)

    if (presence.isUnmounted) {
      return null
    }

    return <ark.div {...mergedProps} />
  },
)

ColorPickerContent.displayName = 'ColorPickerContent'
