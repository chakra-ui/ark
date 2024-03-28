import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import {
  PresenceProvider,
  splitPresenceProps,
  usePresence,
  type UsePresenceProps,
} from '../presence'
import { type Assign } from '../types'
import { useDatePicker, type UseDatePickerProps } from './use-date-picker'
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
  const context = useDatePicker(useDatePickerProps)
  const presenceApi = usePresence(mergeProps({ present: context.isOpen }, presenceProps))
  const mergedProps = mergeProps(context.rootProps, localProps)

  return (
    <DatePickerProvider value={context}>
      <PresenceProvider value={presenceApi}>
        <ark.div {...mergedProps} ref={ref} />
      </PresenceProvider>
    </DatePickerProvider>
  )
})

DatePickerRoot.displayName = 'DatePickerRoot'
