import { type PropsWithChildren, type ReactNode } from 'react'
import { runIfFn } from '../run-if-fn'
import { type Assign } from '../types'
import { DatePickerProvider, type DatePickerContext } from './date-picker-context'
import { useDatePicker, type UseDatePickerProps } from './use-date-picker'

export type DatePickerProps = Assign<
  PropsWithChildren<UseDatePickerProps>,
  {
    children?: ReactNode | ((props: DatePickerContext) => ReactNode)
  }
>

export const DatePicker = (props: DatePickerProps) => {
  const { children, ...useDatePickerProps } = props
  const datePicker = useDatePicker(useDatePickerProps)
  const view = runIfFn(children, datePicker)

  return <DatePickerProvider value={datePicker}>{view}</DatePickerProvider>
}
