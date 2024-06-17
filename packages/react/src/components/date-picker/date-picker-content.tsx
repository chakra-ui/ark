import { mergeProps } from '@zag-js/react'
import { type HTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { usePresenceContext } from '../presence'
import { useDatePickerContext } from './use-date-picker-context'

export interface DatePickerContentBaseProps extends PolymorphicProps {}
export interface DatePickerContentProps
  extends HTMLAttributes<HTMLDivElement>,
    DatePickerContentBaseProps {}

export const DatePickerContent = forwardRef<HTMLDivElement, DatePickerContentProps>(
  (props, ref) => {
    const datePicker = useDatePickerContext()
    const presence = usePresenceContext()
    const mergedProps = mergeProps(
      datePicker.getContentProps(),
      presence.getPresenceProps(ref),
      props,
    )

    if (presence.unmounted) {
      return null
    }

    return <ark.div {...mergedProps} />
  },
)

DatePickerContent.displayName = 'DatePickerContent'
