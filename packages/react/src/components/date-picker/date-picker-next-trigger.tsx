import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'
import { useDatePickerViewPropsContext } from './use-date-picker-view-props-context'

export type DatePickerNextTriggerBaseProps = {}
export interface DatePickerNextTriggerProps
  extends HTMLArkProps<'button'>,
    DatePickerNextTriggerBaseProps {}

export const DatePickerNextTrigger = forwardRef<HTMLButtonElement, DatePickerNextTriggerProps>(
  (props, ref) => {
    const datePicker = useDatePickerContext()
    const viewProps = useDatePickerViewPropsContext()
    const mergedProps = mergeProps(datePicker.getNextTriggerProps(viewProps), props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

DatePickerNextTrigger.displayName = 'DatePickerNextTrigger'
