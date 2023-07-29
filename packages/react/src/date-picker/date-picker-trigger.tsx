import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { useDatePickerContext } from './date-picker-context'

export type DatePickerTriggerProps = ComponentPropsWithoutRef<typeof ark.button>

export const DatePickerTrigger = forwardRef<HTMLButtonElement, DatePickerTriggerProps>(
  (props, ref) => {
    const { triggerProps } = useDatePickerContext()
    const mergedProps = mergeProps(triggerProps, props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

DatePickerTrigger.displayName = 'DatePickerTrigger'
