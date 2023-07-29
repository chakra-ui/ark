import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { useDatePickerContext } from './date-picker-context'

export type DatePickerNextTriggerProps = ComponentPropsWithoutRef<typeof ark.button>

export const DatePickerNextTrigger = forwardRef<HTMLButtonElement, DatePickerNextTriggerProps>(
  (props, ref) => {
    const { getNextTriggerProps, view } = useDatePickerContext()
    const mergedProps = mergeProps(getNextTriggerProps({ view }), props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

DatePickerNextTrigger.displayName = 'DatePickerNextTrigger'
