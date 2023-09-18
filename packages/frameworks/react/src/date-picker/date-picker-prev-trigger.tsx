import type { ViewProps } from '@zag-js/date-picker'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useDatePickerContext } from './date-picker-context'

export type DatePickerPrevTriggerProps = Assign<HTMLArkProps<'button'>, ViewProps>

export const DatePickerPrevTrigger = forwardRef<HTMLButtonElement, DatePickerPrevTriggerProps>(
  (props, ref) => {
    const { getPrevTriggerProps, view } = useDatePickerContext()
    const mergedProps = mergeProps(getPrevTriggerProps({ view }), props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

DatePickerPrevTrigger.displayName = 'DatePickerPrevTrigger'
