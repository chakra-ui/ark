import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import {
  PresenceProvider,
  splitPresenceProps,
  usePresence,
  type UsePresenceProps,
} from '../presence'
import type { Assign } from '../types'
import { useDatePicker, type UseDatePickerProps } from './use-date-picker'
import { DatePickerProvider } from './use-date-picker-context'

export interface DatePickerRootProps
  extends Assign<HTMLArkProps<'div'>, UseDatePickerProps>,
    UsePresenceProps {}

export const DatePickerRoot = (props: DatePickerRootProps) => {
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
    'min',
    'modal',
    'name',
    'numOfMonths',
    'onFocusChange',
    'onOpenChange',
    'onValueChange',
    'onViewChange',
    'open',
    'positioning',
    'readOnly',
    'selectionMode',
    'startOfWeek',
    'timeZone',
    'translations',
    'value',
    'view',
  ])
  const api = useDatePicker(useDatePickerProps)
  const apiPresence = usePresence(mergeProps(presenceProps, () => ({ present: api().isOpen })))
  const mergedProps = mergeProps(() => api().rootProps, localProps)

  return (
    <DatePickerProvider value={api}>
      <PresenceProvider value={apiPresence}>
        <ark.div {...mergedProps()} />
      </PresenceProvider>
    </DatePickerProvider>
  )
}
