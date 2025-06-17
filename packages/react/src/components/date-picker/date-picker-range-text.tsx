import { mergeProps } from '@zag-js/react'
import { uniq } from '@zag-js/utils'
import { forwardRef, useMemo } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'

export interface DatePickerRangeTextBaseProps extends PolymorphicProps {}
export interface DatePickerRangeTextProps extends HTMLProps<'div'>, DatePickerRangeTextBaseProps {}

export const DatePickerRangeText = forwardRef<HTMLDivElement, DatePickerRangeTextProps>((props, ref) => {
  const datePicker = useDatePickerContext()
  const mergedProps = mergeProps(datePicker.getRangeTextProps(), props)
  const visibleRangeText = useMemo(() => {
    const { start, end } = datePicker.visibleRangeText
    return uniq([start, end]).filter(Boolean).join(' - ')
  }, [datePicker.visibleRangeText])

  return (
    <ark.div {...mergedProps} ref={ref}>
      {visibleRangeText}
    </ark.div>
  )
})

DatePickerRangeText.displayName = 'DatePickerRangeText'
