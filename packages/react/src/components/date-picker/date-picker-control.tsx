import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'

export interface DatePickerControlBaseProps extends PolymorphicProps {}
export interface DatePickerControlProps extends HTMLProps<'div'>, DatePickerControlBaseProps {}

export const DatePickerControl = forwardRef<HTMLDivElement, DatePickerControlProps>(
  (props, ref) => {
    const datePicker = useDatePickerContext()
    const mergedProps = mergeProps(datePicker.getControlProps(), props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

DatePickerControl.displayName = 'DatePickerControl'
