import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { composeRefs } from '../../utils/compose-refs'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { usePresenceContext } from '../presence'
import { useDatePickerContext } from './use-date-picker-context'

export interface DatePickerContentBaseProps extends PolymorphicProps {}
export interface DatePickerContentProps extends HTMLProps<'div'>, DatePickerContentBaseProps {}

export const DatePickerContent = forwardRef<HTMLDivElement, DatePickerContentProps>(
  (props, ref) => {
    const datePicker = useDatePickerContext()
    const presence = usePresenceContext()
    const mergedProps = mergeProps(datePicker.getContentProps(), presence.getPresenceProps(), props)

    if (presence.unmounted) {
      return null
    }

    return <ark.div {...mergedProps} ref={composeRefs(presence.ref, ref)} />
  },
)

DatePickerContent.displayName = 'DatePickerContent'
