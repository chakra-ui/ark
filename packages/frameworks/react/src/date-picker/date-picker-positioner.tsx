import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useDatePickerContext } from './date-picker-context'

export interface DatePickerPositionerProps extends HTMLArkProps<'div'> {}

export const DatePickerPositioner = forwardRef<HTMLDivElement, DatePickerPositionerProps>(
  (props, ref) => {
    const api = useDatePickerContext()
    const mergedProps = mergeProps(api.positionerProps, props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

DatePickerPositioner.displayName = 'DatePickerPositioner'
