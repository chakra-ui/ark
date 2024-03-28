import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'

export interface DatePickerRangeTextProps extends HTMLArkProps<'div'> {}

export const DatePickerRangeText = forwardRef<HTMLDivElement, DatePickerRangeTextProps>(
  (props, ref) => {
    const context = useDatePickerContext()
    const mergedProps = mergeProps(context.rangeTextProps, props)

    return (
      <ark.div {...mergedProps} ref={ref}>
        {context.visibleRangeText.start}
      </ark.div>
    )
  },
)

DatePickerRangeText.displayName = 'DatePickerRangeText'
