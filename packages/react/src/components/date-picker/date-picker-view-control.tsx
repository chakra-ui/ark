import { mergeProps } from '@zag-js/react'
import { type HTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'
import { useDatePickerViewPropsContext } from './use-date-picker-view-props-context'

export interface DatePickerViewControlBaseProps extends PolymorphicProps {}
export interface DatePickerViewControlProps
  extends HTMLAttributes<HTMLDivElement>,
    DatePickerViewControlBaseProps {}

export const DatePickerViewControl = forwardRef<HTMLDivElement, DatePickerViewControlProps>(
  (props, ref) => {
    const datePicker = useDatePickerContext()
    const viewProps = useDatePickerViewPropsContext()
    const mergedProps = mergeProps(datePicker.getViewControlProps(viewProps), props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

DatePickerViewControl.displayName = 'DatePickerViewControl'
