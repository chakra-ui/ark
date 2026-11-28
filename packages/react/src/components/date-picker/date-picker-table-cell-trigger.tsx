'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { getTableCellProps } from './get-table-cell-props.ts'
import { useDatePickerContext } from './use-date-picker-context.ts'
import { useDatePickerTableCellPropsContext } from './use-date-picker-table-cell-props-context.ts'
import { useDatePickerViewPropsContext } from './use-date-picker-view-props-context.ts'

export interface DatePickerTableCellTriggerBaseProps extends PolymorphicProps {}
export interface DatePickerTableCellTriggerProps extends HTMLProps<'div'>, DatePickerTableCellTriggerBaseProps {}

export const DatePickerTableCellTrigger = forwardRef<HTMLDivElement, DatePickerTableCellTriggerProps>((props, ref) => {
  const datePicker = useDatePickerContext()
  const tableCellProps = useDatePickerTableCellPropsContext()
  const viewProps = useDatePickerViewPropsContext()

  const triggerProps = getTableCellProps(viewProps.view, tableCellProps, {
    day: datePicker.getDayTableCellTriggerProps,
    month: datePicker.getMonthTableCellTriggerProps,
    year: datePicker.getYearTableCellTriggerProps,
  })

  const mergedProps = mergeProps(triggerProps, props)

  return <ark.div ref={ref} {...mergedProps} />
})

DatePickerTableCellTrigger.displayName = 'DatePickerTableCellTrigger'
