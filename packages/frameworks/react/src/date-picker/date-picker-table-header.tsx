import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useDatePickerContext } from './date-picker-context'
import { useDatePickerTableContext } from './date-picker-table-context'

export interface DatePickerTableHeaderProps extends HTMLArkProps<'thead'> {}

export const DatePickerTableHeader = forwardRef<
  HTMLTableSectionElement,
  DatePickerTableHeaderProps
>((props, ref) => {
  const api = useDatePickerContext()
  const tableProps = useDatePickerTableContext()
  const mergedProps = mergeProps(api.getTableHeaderProps(tableProps), props)

  return <ark.thead {...mergedProps} ref={ref} />
})

DatePickerTableHeader.displayName = 'DatePickerTableHeader'
