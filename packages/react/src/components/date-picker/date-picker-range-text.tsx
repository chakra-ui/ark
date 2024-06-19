import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'

export interface DatePickerRangeTextBaseProps extends PolymorphicProps {}
export interface DatePickerRangeTextProps extends HTMLProps<'div'>, DatePickerRangeTextBaseProps {}

export const DatePickerRangeText = forwardRef<HTMLDivElement, DatePickerRangeTextProps>(
  (props, ref) => {
    const datePicker = useDatePickerContext()
    const mergedProps = mergeProps(datePicker.getRangeTextProps(), props)

    return (
      <ark.div {...mergedProps} ref={ref}>
        {datePicker.visibleRangeText.start}
      </ark.div>
    )
  },
)

DatePickerRangeText.displayName = 'DatePickerRangeText'
