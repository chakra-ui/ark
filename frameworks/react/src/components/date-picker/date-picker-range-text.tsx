import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../../factory'
import { useDatePickerContext } from './use-date-picker-context'

export interface DatePickerRangeTextProps extends HTMLArkProps<'div'> {}

export const DatePickerRangeText = forwardRef<HTMLDivElement, DatePickerRangeTextProps>(
  (props, ref) => {
    const datePicker = useDatePickerContext()
    const mergedProps = mergeProps(datePicker.rangeTextProps, props)

    return (
      <ark.div {...mergedProps} ref={ref}>
        {datePicker.visibleRangeText.start}
      </ark.div>
    )
  },
)

DatePickerRangeText.displayName = 'DatePickerRangeText'
