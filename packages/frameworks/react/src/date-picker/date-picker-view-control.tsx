import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useDatePickerContext } from './date-picker-context'
import { useDatePickerViewContext } from './date-picker-view-context'

export interface DatePickerViewControlProps extends HTMLArkProps<'div'> {}

export const DatePickerViewControl = forwardRef<HTMLDivElement, DatePickerViewControlProps>(
  (props, ref) => {
    const api = useDatePickerContext()
    const viewProps = useDatePickerViewContext()
    const mergedProps = mergeProps(api.getViewControlProps(viewProps), props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

DatePickerViewControl.displayName = 'DatePickerViewControl'
