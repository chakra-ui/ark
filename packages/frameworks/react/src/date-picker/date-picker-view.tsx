import { datePickerAnatomy } from '@ark-ui/anatomy'
import type { ViewProps } from '@zag-js/date-picker'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useDatePickerContext } from './use-date-picker-context'
import { DatePickerViewProvider } from './use-date-picker-view-context'

export interface DatePickerViewProps extends Assign<HTMLArkProps<'div'>, Required<ViewProps>> {}

export const DatePickerView = forwardRef<HTMLDivElement, DatePickerViewProps>((props, ref) => {
  const [viewProps, localProps] = createSplitProps<Required<ViewProps>>()(props, ['view'])
  const context = useDatePickerContext()

  return (
    <DatePickerViewProvider value={viewProps}>
      <ark.div
        hidden={context.view !== viewProps.view}
        {...datePickerAnatomy.build().view.attrs}
        {...localProps}
        ref={ref}
      />
    </DatePickerViewProvider>
  )
})

DatePickerView.displayName = 'DatePickerView'
