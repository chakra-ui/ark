import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'
import { useDatePickerViewPropsContext } from './use-date-picker-view-props-context'

export interface DatePickerViewTriggerProps extends HTMLArkProps<'button'> {}

export const DatePickerViewTrigger = forwardRef<HTMLButtonElement, DatePickerViewTriggerProps>(
  (props, ref) => {
    const datePicker = useDatePickerContext()
    const viewProps = useDatePickerViewPropsContext()
    const mergedProps = mergeProps(datePicker.getViewTriggerProps(viewProps), props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

DatePickerViewTrigger.displayName = 'DatePickerViewTrigger'
