import { createContext } from '../create-context'

type CellProps = {
  value: number
}

export const [DatePickerCellProvider, useDatePickerCellContext] = createContext<CellProps>({
  name: 'DatePickerCellContext',
  hookName: 'useDatePickerCellContext',
  providerName: '<DatePickerCellProvider />',
})
