import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { usePresenceContext } from '../presence'
import { useTimePickerContext } from './use-time-picker-context'

export interface TimePickerContentBaseProps extends PolymorphicProps {}
export interface TimePickerContentProps extends HTMLProps<'div'>, TimePickerContentBaseProps {}

export const TimePickerContent = forwardRef<HTMLDivElement, TimePickerContentProps>(
  (props, ref) => {
    const timePicker = useTimePickerContext()
    const presence = usePresenceContext()
    const mergedProps = mergeProps(
      timePicker.getContentProps(),
      presence.getPresenceProps(ref),
      props,
    )

    if (presence.unmounted) {
      return null
    }

    return <ark.div {...mergedProps} ref={ref} />
  },
)

TimePickerContent.displayName = 'TimePickerContent'
