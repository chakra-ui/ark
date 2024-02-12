import { datePickerAnatomy } from '@ark-ui/anatomy'
import type { ViewProps } from '@zag-js/date-picker'
import { forwardRef, type ReactNode } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { useDatePickerContext } from './date-picker-context'
import { DatePickerViewProvider } from './date-picker-view-context'
import type { UseDatePickerReturn } from './use-date-picker'

export interface DatePickerViewProps
  extends Assign<
      HTMLArkProps<'div'>,
      { children?: ReactNode | ((api: UseDatePickerReturn) => ReactNode) }
    >,
    Required<ViewProps> {}

export const DatePickerView = forwardRef<HTMLDivElement, DatePickerViewProps>((props, ref) => {
  const [viewProps, { children, ...localProps }] = createSplitProps<Required<ViewProps>>()(props, [
    'view',
  ])
  const api = useDatePickerContext()
  const view = runIfFn(children, api)

  return (
    <DatePickerViewProvider value={viewProps}>
      <ark.div
        hidden={api.view !== viewProps.view}
        {...datePickerAnatomy.build().view.attrs}
        {...localProps}
        ref={ref}
      >
        {view}
      </ark.div>
    </DatePickerViewProvider>
  )
})

DatePickerView.displayName = 'DatePickerView'
