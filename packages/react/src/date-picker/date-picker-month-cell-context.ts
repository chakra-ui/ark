import { createContext } from '../create-context'

type MonthCellProps = {
  value: number
}

export const [DatePickerMonthCellProvider, useDatePickerMonthCellContext] =
  createContext<MonthCellProps>({
    name: 'DatePickerMonthCellContext',
    hookName: 'useDatePickerMonthCellContext',
    providerName: '<DatePickerMonthCellProvider />',
  })
