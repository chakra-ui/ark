import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'
import { useDatePickerTableContext } from './use-date-picker-table-context'

export interface DatePickerTableHeadProps extends HTMLArkProps<'thead'> {}

export const DatePickerTableHead = forwardRef<HTMLTableSectionElement, DatePickerTableHeadProps>(
  (props, ref) => {
    const context = useDatePickerContext()
    const tableContext = useDatePickerTableContext()
    const mergedProps = mergeProps(context.getTableHeadProps(tableContext), props)

    return <ark.thead {...mergedProps} ref={ref} />
  },
)

DatePickerTableHead.displayName = 'DatePickerTableHead'
