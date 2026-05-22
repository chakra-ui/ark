'use client'

import { mergeProps } from '@zag-js/react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'

export interface DatePickerYearSelectBaseProps extends PolymorphicProps {}
export interface DatePickerYearSelectProps extends HTMLProps<'select'>, DatePickerYearSelectBaseProps {}

export const DatePickerYearSelect = ({ ref, ...props }: DatePickerYearSelectProps) => {
  const datePicker = useDatePickerContext()
  const mergedProps = mergeProps(datePicker.getYearSelectProps(), props)

  return (
    <ark.select {...mergedProps} ref={ref}>
      {datePicker.getYears().map((year, i) => (
        <option key={i} value={year.value}>
          {year.label}
        </option>
      ))}
    </ark.select>
  )
}

DatePickerYearSelect.displayName = 'DatePickerYearSelect'
