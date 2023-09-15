import { type JSX } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import { runIfFn } from '../run-if-fn'
import { DatePickerProvider } from './date-picker-context'
import { useDatePicker, type UseDatePickerProps, type UseDatePickerReturn } from './use-date-picker'

export type DatePickerProps = UseDatePickerProps & {
  children?: JSX.Element | ((state: UseDatePickerReturn) => JSX.Element)
}

export const DatePicker = (props: DatePickerProps) => {
  const [useDatePickerProps, localProps] = createSplitProps<UseDatePickerProps>()(props, [
    'dir',
    'disabled',
    'fixedWeeks',
    'focusedValue',
    'format',
    'getRootNode',
    'id',
    'ids',
    'inline',
    'isDateUnavailable',
    'isDateUnavailable',
    'locale',
    'max',
    'messages',
    'min',
    'modal',
    'name',
    'numOfMonths',
    'onFocusChange',
    'onOpenChange',
    'onValueChange',
    'onViewChange',
    'parse',
    'positioning',
    'readOnly',
    'selectionMode',
    'startOfWeek',
    'timeZone',
    'value',
    'view',
  ])

  const api = useDatePicker(useDatePickerProps)
  const getChildren = () => runIfFn(localProps.children, api)

  return <DatePickerProvider value={api}>{getChildren()}</DatePickerProvider>
}
