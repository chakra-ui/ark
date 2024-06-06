import { mergeProps } from '@zag-js/solid'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLArkProps, ark } from '../factory'
import {
  PresenceProvider,
  type UsePresenceProps,
  splitPresenceProps,
  usePresence,
} from '../presence'
import { type UseDatePickerProps, useDatePicker } from './use-date-picker'
import { DatePickerProvider } from './use-date-picker-context'

export interface DatePickerRootProps
  extends Assign<HTMLArkProps<'div'>, UseDatePickerProps>,
    UsePresenceProps {}

export const DatePickerRoot = (props: DatePickerRootProps) => {
  const [presenceProps, datePickerProps] = splitPresenceProps(props)
  const [useDatePickerProps, localProps] = createSplitProps<UseDatePickerProps>()(datePickerProps, [
    'closeOnSelect',
    'defaultOpen',
    'defaultValue',
    'disabled',
    'fixedWeeks',
    'focusedValue',
    'format',
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
  const apiPresence = usePresence(mergeProps(presenceProps, () => ({ present: api().open })))
  const mergedProps = mergeProps(() => api().getRootProps(), localProps)

  return (
    <DatePickerProvider value={api}>
      <PresenceProvider value={apiPresence}>
        <ark.div {...mergedProps} />
      </PresenceProvider>
    </DatePickerProvider>
  )
}
