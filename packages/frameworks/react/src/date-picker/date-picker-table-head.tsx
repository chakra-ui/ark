import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'

export interface DatePickerTableHeadProps extends HTMLArkProps<'thead'> {}

export const DatePickerTableHead = forwardRef<HTMLTableSectionElement, DatePickerTableHeadProps>(
  (props, ref) => {
    // const api = useDatePickerContext()
    //   const tableProps = useDatePickerTableContext()
    //   const mergedProps = mergeProps(api.tab(tableProps), props)

    return <ark.thead {...props} data-scope="date-picker" data-part="table-head" ref={ref} />
  },
)

DatePickerTableHead.displayName = 'DatePickerTableHead'
