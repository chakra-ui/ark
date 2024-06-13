import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'
import { useDatePickerViewPropsContext } from './use-date-picker-view-props-context'

export type DatePickerViewControlBaseProps = {}
export interface DatePickerViewControlProps
  extends HTMLArkProps<'div'>,
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
