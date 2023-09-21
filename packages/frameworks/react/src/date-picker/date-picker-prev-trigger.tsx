import type { ViewProps } from '@zag-js/date-picker'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useDatePickerContext } from './date-picker-context'

export interface DatePickerPrevTriggerProps extends Assign<HTMLArkProps<'button'>, ViewProps> {}

export const DatePickerPrevTrigger = forwardRef<HTMLButtonElement, DatePickerPrevTriggerProps>(
  (props, ref) => {
    const api = useDatePickerContext()
    const mergedProps = mergeProps(api.getPrevTriggerProps({ view: api.view }), props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

DatePickerPrevTrigger.displayName = 'DatePickerPrevTrigger'
