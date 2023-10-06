import { ark, type HTMLArkProps } from '../factory'

export interface DatePickerTableHeadProps extends HTMLArkProps<'thead'> {}

export const DatePickerTableHead = (props: DatePickerTableHeadProps) => {
  // const api = useDatePickerContext()
  //   const tableProps = useDatePickerTableContext()
  //   const mergedProps = mergeProps(api().tab(tableProps), props)

  return <ark.thead {...props} data-scope="date-picker" data-part="table-head" />
}
