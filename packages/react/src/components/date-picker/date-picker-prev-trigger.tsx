import { mergeProps } from '@zag-js/react'
import { type ButtonHTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'
import { useDatePickerViewPropsContext } from './use-date-picker-view-props-context'

export interface DatePickerPrevTriggerBaseProps extends PolymorphicProps {}
export interface DatePickerPrevTriggerProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    DatePickerPrevTriggerBaseProps {}

export const DatePickerPrevTrigger = forwardRef<HTMLButtonElement, DatePickerPrevTriggerProps>(
  (props, ref) => {
    const datePicker = useDatePickerContext()
    const viewProps = useDatePickerViewPropsContext()
    const mergedProps = mergeProps(datePicker.getPrevTriggerProps(viewProps), props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

DatePickerPrevTrigger.displayName = 'DatePickerPrevTrigger'
