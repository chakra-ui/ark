import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { composeRefs } from '../../utils/compose-refs'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { usePresenceContext } from '../presence'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerContentBaseProps extends PolymorphicProps {}
export interface ColorPickerContentProps extends HTMLProps<'div'>, ColorPickerContentBaseProps {}

export const ColorPickerContent = forwardRef<HTMLDivElement, ColorPickerContentProps>(
  (props, ref) => {
    const colorPicker = useColorPickerContext()
    const presence = usePresenceContext()
    const mergedProps = mergeProps(
      colorPicker.getContentProps(),
      presence.getPresenceProps(),
      props,
    )

    if (presence.unmounted) {
      return null
    }

    return <ark.div {...mergedProps} ref={composeRefs(presence.ref, ref)} />
  },
)

ColorPickerContent.displayName = 'ColorPickerContent'
