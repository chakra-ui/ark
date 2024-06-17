import { mergeProps } from '@zag-js/react'
import { type HTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { usePresenceContext } from '../presence'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerContentBaseProps extends PolymorphicProps {}
export interface ColorPickerContentProps
  extends HTMLAttributes<HTMLDivElement>,
    ColorPickerContentBaseProps {}

export const ColorPickerContent = forwardRef<HTMLDivElement, ColorPickerContentProps>(
  (props, ref) => {
    const colorPicker = useColorPickerContext()
    const presence = usePresenceContext()
    const mergedProps = mergeProps(
      colorPicker.getContentProps(),
      presence.getPresenceProps(ref),
      props,
    )

    if (presence.unmounted) {
      return null
    }

    return <ark.div {...mergedProps} />
  },
)

ColorPickerContent.displayName = 'ColorPickerContent'
