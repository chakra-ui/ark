import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useDatePickerContext } from './date-picker-context'

export interface DatePickerRangeTextProps extends HTMLArkProps<'div'> {}

export const DatePickerRangeText = forwardRef<HTMLDivElement, DatePickerRangeTextProps>(
  (props, ref) => {
    const api = useDatePickerContext()
    const mergedProps = mergeProps(api.rangeTextProps, props)

    return (
      <ark.div {...mergedProps} ref={ref}>
        {api.visibleRangeText.start}
      </ark.div>
    )
  },
)

DatePickerRangeText.displayName = 'DatePickerRangeText'
