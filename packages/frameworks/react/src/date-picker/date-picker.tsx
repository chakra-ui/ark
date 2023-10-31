import { mergeProps } from '@zag-js/react'
import { forwardRef, type ReactNode } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark } from '../factory'
import { runIfFn } from '../run-if-fn'
import { type Assign } from '../types'
import { DatePickerProvider, type DatePickerContext } from './date-picker-context'
import { useDatePicker, type UseDatePickerProps } from './use-date-picker'

export interface DatePickerProps
  extends Assign<
    UseDatePickerProps,
    { children?: ReactNode | ((props: DatePickerContext) => ReactNode) }
  > {}

export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>((props, ref) => {
  const [datePickerProps, { children, ...localProps }] = createSplitProps<UseDatePickerProps>()(
    props,
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
    ],
  )
  const api = useDatePicker(datePickerProps)
  const view = runIfFn(children, api)
  const mergedProps = mergeProps(api.rootProps, localProps)

  return (
    <DatePickerProvider value={api}>
      <ark.div {...mergedProps} ref={ref}>
        {view}
      </ark.div>
    </DatePickerProvider>
  )
})

DatePicker.displayName = 'DatePicker'
