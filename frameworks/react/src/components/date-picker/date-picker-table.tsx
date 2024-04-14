import type { TableProps } from '@zag-js/date-picker'
import { mergeProps } from '@zag-js/react'
import { forwardRef, useId } from 'react'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLArkProps, ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'
import { DatePickerTablePropsProvider } from './use-date-picker-table-props-context'
import { useDatePickerViewPropsContext } from './use-date-picker-view-props-context'

export interface DatePickerTableProps
  extends Assign<HTMLArkProps<'table'>, Pick<TableProps, 'columns'>> {}

export const DatePickerTable = forwardRef<HTMLTableElement, DatePickerTableProps>((props, ref) => {
  const [{ columns }, localProps] = createSplitProps<Pick<TableProps, 'columns'>>()(props, [
    'columns',
  ])
  const datePicker = useDatePickerContext()
  const viewProps = useDatePickerViewPropsContext()
  const tableProps = { columns, id: useId(), ...viewProps }
  const mergedProps = mergeProps(datePicker.getTableProps(tableProps), localProps)

  return (
    <DatePickerTablePropsProvider value={tableProps}>
      <ark.table {...mergedProps} ref={ref} />
    </DatePickerTablePropsProvider>
  )
})

DatePickerTable.displayName = 'DatePickerTable'
