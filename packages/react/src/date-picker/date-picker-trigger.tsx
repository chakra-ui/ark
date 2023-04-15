import { Children, cloneElement, type ReactElement } from 'react'
import { useDatePickerContext } from './date-picker-context'

export type DatePickerTriggerProps = { children: ReactElement }

export const DatePickerTrigger = (props: DatePickerTriggerProps) => {
  const { triggerProps } = useDatePickerContext()

  const onlyChild = Children.only(props.children)
  return cloneElement(onlyChild, triggerProps)
}
