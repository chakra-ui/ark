import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../../factory'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
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

export const DatePickerRoot = forwardRef<HTMLDivElement, DatePickerRootProps>((props, ref) => {
  const [presenceProps, datePickerProps] = splitPresenceProps(props)
  const [useDatePickerProps, localProps] = createSplitProps<UseDatePickerProps>()(datePickerProps, [
    'closeOnSelect',
    'defaultValue',
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
  const datePicker = useDatePicker(useDatePickerProps)
  const presence = usePresence(mergeProps({ present: datePicker.isOpen }, presenceProps))
  const mergedProps = mergeProps(datePicker.rootProps, localProps)

  return (
    <DatePickerProvider value={datePicker}>
      <PresenceProvider value={presence}>
        <ark.div {...mergedProps} ref={ref} />
      </PresenceProvider>
    </DatePickerProvider>
  )
})

DatePickerRoot.displayName = 'DatePickerRoot'
