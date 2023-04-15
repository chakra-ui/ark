import { Children, cloneElement, type ReactElement } from 'react'
import { useDatePickerContext } from './date-picker-context'

export type DatePickerClearTriggerProps = { children: ReactElement }

export const DatePickerClearTrigger = (props: DatePickerClearTriggerProps) => {
  const { clearTriggerProps } = useDatePickerContext()

  const onlyChild = Children.only(props.children)
  return cloneElement(onlyChild, clearTriggerProps)
}
