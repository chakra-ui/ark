import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'
import { useDatePickerViewContext } from './use-date-picker-view-context'

export interface DatePickerViewTriggerProps extends HTMLArkProps<'button'> {}

export const DatePickerViewTrigger = forwardRef<HTMLButtonElement, DatePickerViewTriggerProps>(
  (props, ref) => {
    const context = useDatePickerContext()
    const viewContext = useDatePickerViewContext()
    const mergedProps = mergeProps(context.getViewTriggerProps(viewContext), props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

DatePickerViewTrigger.displayName = 'DatePickerViewTrigger'
