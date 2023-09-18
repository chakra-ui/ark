import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useDatePickerContext } from './date-picker-context'

export type DatePickerClearTriggerProps = HTMLArkProps<'button'>

export const DatePickerClearTrigger = forwardRef<HTMLButtonElement, DatePickerClearTriggerProps>(
  (props, ref) => {
    const { clearTriggerProps } = useDatePickerContext()
    const mergedProps = mergeProps(clearTriggerProps, props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

DatePickerClearTrigger.displayName = 'DatePickerClearTrigger'
