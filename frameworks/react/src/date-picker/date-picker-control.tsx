import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'

export interface DatePickerControlProps extends HTMLArkProps<'div'> {}

export const DatePickerControl = forwardRef<HTMLDivElement, DatePickerControlProps>(
  (props, ref) => {
    const context = useDatePickerContext()
    const mergedProps = mergeProps(context.controlProps, props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

DatePickerControl.displayName = 'DatePickerControl'
