import { datePickerAnatomy } from '@ark-ui/anatomy'
import type { ViewProps } from '@zag-js/date-picker'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useDatePickerContext } from './use-date-picker-context'
import { DatePickerViewPropsProvider } from './use-date-picker-view-props-context'

export interface DatePickerViewProps extends Assign<HTMLArkProps<'div'>, Required<ViewProps>> {}

export const DatePickerView = forwardRef<HTMLDivElement, DatePickerViewProps>((props, ref) => {
  const [viewProps, localProps] = createSplitProps<Required<ViewProps>>()(props, ['view'])
  const datePicker = useDatePickerContext()

  return (
    <DatePickerViewPropsProvider value={viewProps}>
      <ark.div
        hidden={datePicker.view !== viewProps.view}
        {...datePickerAnatomy.build().view.attrs}
        {...localProps}
        ref={ref}
      />
    </DatePickerViewPropsProvider>
  )
})

DatePickerView.displayName = 'DatePickerView'
