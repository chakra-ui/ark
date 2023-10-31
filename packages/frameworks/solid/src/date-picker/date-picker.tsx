import { mergeProps } from '@zag-js/solid'
import { type JSX } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { DatePickerProvider } from './date-picker-context'
import { useDatePicker, type UseDatePickerProps, type UseDatePickerReturn } from './use-date-picker'

export type DatePickerProps = Assign<
  HTMLArkProps<'div'>,
  UseDatePickerProps & {
    children?: JSX.Element | ((state: UseDatePickerReturn) => JSX.Element)
  }
>

export const DatePicker = (props: DatePickerProps) => {
  const [datePickerProps, localProps] = createSplitProps<UseDatePickerProps>()(props, [
    'closeOnSelect',
    'dir',
    'disabled',
    'fixedWeeks',
    'focusedValue',
    'format',
    'getRootNode',
    'id',
    'ids',
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
    'open',
    'parse',
    'positioning',
    'readOnly',
    'selectionMode',
    'startOfWeek',
    'timeZone',
    'value',
    'view',
  ])

  const api = useDatePicker(datePickerProps)
  const mergedProps = mergeProps(() => api().rootProps, localProps)
  const getChildren = () => runIfFn(localProps.children, api)

  return (
    <DatePickerProvider value={api}>
      <ark.div {...mergedProps}>{getChildren()}</ark.div>
    </DatePickerProvider>
  )
}
