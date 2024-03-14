import { mergeProps } from '@zag-js/react'
import { forwardRef, type ReactNode } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import {
  PresenceProvider,
  splitPresenceProps,
  usePresence,
  type UsePresenceProps,
} from '../presence'
import { runIfFn } from '../run-if-fn'
import { type Assign } from '../types'
import { DatePickerProvider } from './date-picker-context'
import { useDatePicker, type UseDatePickerProps, type UseDatePickerReturn } from './use-date-picker'

export interface DatePickerRootProps
  extends Assign<
      Assign<
        HTMLArkProps<'div'>,
        { children?: ReactNode | ((api: UseDatePickerReturn) => ReactNode) }
      >,
      UseDatePickerProps
    >,
    UsePresenceProps {}

export const DatePickerRoot = forwardRef<HTMLDivElement, DatePickerRootProps>((props, ref) => {
  const [presenceProps, datePickerProps] = splitPresenceProps(props)
  const [useDatePickerProps, { children, ...localProps }] = createSplitProps<UseDatePickerProps>()(
    datePickerProps,
    [
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
    ],
  )
  const api = useDatePicker(useDatePickerProps)
  const presenceApi = usePresence(mergeProps({ present: api.isOpen }, presenceProps))
  const view = runIfFn(children, api)
  const mergedProps = mergeProps(api.rootProps, localProps)

  return (
    <DatePickerProvider value={api}>
      <PresenceProvider value={presenceApi}>
        <ark.div {...mergedProps} ref={ref}>
          {view}
        </ark.div>
      </PresenceProvider>
    </DatePickerProvider>
  )
})

DatePickerRoot.displayName = 'DatePickerRoot'
