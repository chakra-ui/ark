import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useDatePickerContext } from './date-picker-context'
import { useDatePickerViewContext } from './date-picker-view-context'

export interface DatePickerPrevTriggerProps extends HTMLArkProps<'button'> {}

export const DatePickerPrevTrigger = forwardRef<HTMLButtonElement, DatePickerPrevTriggerProps>(
  (props, ref) => {
    const api = useDatePickerContext()
    const viewProps = useDatePickerViewContext()
    const mergedProps = mergeProps(api.getPrevTriggerProps(viewProps), props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

DatePickerPrevTrigger.displayName = 'DatePickerPrevTrigger'
