import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HtmlArkProps } from '../factory'
import { useDatePickerContext } from './date-picker-context'

export type DatePickerTriggerProps = HtmlArkProps<'button'>

export const DatePickerTrigger = forwardRef<HTMLButtonElement, DatePickerTriggerProps>(
  (props, ref) => {
    const { triggerProps } = useDatePickerContext()
    const mergedProps = mergeProps(triggerProps, props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

DatePickerTrigger.displayName = 'DatePickerTrigger'
