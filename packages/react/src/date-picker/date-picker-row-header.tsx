import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HtmlArkProps } from '../factory'
import { useDatePickerContext } from './date-picker-context'

export type DatePickerRowHeaderProps = HtmlArkProps<'div'>

export const DatePickerRowHeader = forwardRef<HTMLDivElement, DatePickerRowHeaderProps>(
  (props, ref) => {
    const { getHeaderProps } = useDatePickerContext()
    const mergedProps = mergeProps(getHeaderProps({ view: 'day' }), props)

    return <ark.div role="row" {...mergedProps} aria-hidden={false} ref={ref} />
  },
)

DatePickerRowHeader.displayName = 'DatePickerRowHeader'
