import { mergeProps } from '@zag-js/solid'
import { type JSX } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import {
  PresenceProvider,
  splitPresenceProps,
  usePresence,
  type UsePresenceProps,
} from '../presence'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { DatePickerProvider } from './date-picker-context'
import { useDatePicker, type UseDatePickerProps, type UseDatePickerReturn } from './use-date-picker'

export interface DatePickerProps
  extends Assign<
      Assign<
        HTMLArkProps<'div'>,
        { children?: JSX.Element | ((state: UseDatePickerReturn) => JSX.Element) }
      >,
      UseDatePickerProps
    >,
    UsePresenceProps {}

export const DatePicker = (props: DatePickerProps) => {
  const [presenceProps, datePickerProps] = splitPresenceProps(props)
  const [useDatePickerProps, localProps] = createSplitProps<UseDatePickerProps>()(datePickerProps, [
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
  const api = useDatePicker(useDatePickerProps)
  const apiPresence = usePresence(mergeProps(presenceProps, () => ({ present: api().isOpen })))
  const mergedProps = mergeProps(() => api().rootProps, localProps)
  const getChildren = () => runIfFn(localProps.children, api)

  return (
    <DatePickerProvider value={api}>
      <PresenceProvider value={apiPresence}>
        <ark.div {...mergedProps}>{getChildren()}</ark.div>
      </PresenceProvider>
    </DatePickerProvider>
  )
}
