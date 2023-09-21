import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useDatePickerContext } from './date-picker-context'

export interface DatePickerControlProps extends HTMLArkProps<'div'> {}

export const DatePickerControl = forwardRef<HTMLDivElement, DatePickerControlProps>(
  (props, ref) => {
    const api = useDatePickerContext()
    const mergedProps = mergeProps(api.controlProps, props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

DatePickerControl.displayName = 'DatePickerControl'
