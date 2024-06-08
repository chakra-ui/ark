import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { usePresenceContext } from '../presence'
import { useDatePickerContext } from './use-date-picker-context'

export interface DatePickerContentProps extends HTMLArkProps<'div'> {}

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
