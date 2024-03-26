import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'
import { useDatePickerViewContext } from './use-date-picker-view-context'

export interface DatePickerNextTriggerProps extends HTMLArkProps<'button'> {}

export const DatePickerNextTrigger = forwardRef<HTMLButtonElement, DatePickerNextTriggerProps>(
  (props, ref) => {
    const context = useDatePickerContext()
    const viewProps = useDatePickerViewContext()
    const mergedProps = mergeProps(context.getNextTriggerProps(viewProps), props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

DatePickerNextTrigger.displayName = 'DatePickerNextTrigger'
