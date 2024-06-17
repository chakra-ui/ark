import { mergeProps } from '@zag-js/react'
import { type ButtonHTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'
import { useDatePickerViewPropsContext } from './use-date-picker-view-props-context'

export interface DatePickerNextTriggerBaseProps extends PolymorphicProps {}
export interface DatePickerNextTriggerProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
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
