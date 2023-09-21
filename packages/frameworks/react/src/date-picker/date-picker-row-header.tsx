import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useDatePickerContext } from './date-picker-context'

export interface DatePickerRowHeaderProps extends HTMLArkProps<'div'> {}

export const DatePickerRowHeader = forwardRef<HTMLDivElement, DatePickerRowHeaderProps>(
  (props, ref) => {
    const api = useDatePickerContext()
    const mergedProps = mergeProps(api.getHeaderProps({ view: 'day' }), props)

    return <ark.div role="row" {...mergedProps} aria-hidden={false} ref={ref} />
  },
)

DatePickerRowHeader.displayName = 'DatePickerRowHeader'
