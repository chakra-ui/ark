import { type PropsWithChildren, type ReactNode } from 'react'
import { runIfFn } from '../run-if-fn'
import { type Assign } from '../types'
import { DatePickerProvider, type DatePickerContext } from './date-picker-context'
import { useDatePicker, type UseDatePickerProps } from './use-date-picker'

export interface DatePickerProps
  extends Assign<
    PropsWithChildren<UseDatePickerProps>,
    { children?: ReactNode | ((props: DatePickerContext) => ReactNode) }
  > {}

export const DatePicker = (props: DatePickerProps) => {
  const { children, ...useDatePickerProps } = props
  const api = useDatePicker(useDatePickerProps)
  const view = runIfFn(children, api)

  return <DatePickerProvider value={api}>{view}</DatePickerProvider>
}
