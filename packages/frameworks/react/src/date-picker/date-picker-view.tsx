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
  extends Required<ViewProps>,
    Assign<
      HTMLArkProps<'div'>,
      { children?: ReactNode | ((props: UseDatePickerReturn) => ReactNode) }
    > {}

export const DatePickerView = forwardRef<HTMLDivElement, DatePickerViewProps>((props, ref) => {
  const [viewProps, { children, ...localProps }] = createSplitProps<Required<ViewProps>>()(props, [
    'view',
  ])
  const api = useDatePickerContext()
  const view = runIfFn(children, api)

  return (
    <DatePickerViewProvider value={viewProps}>
      <ark.div {...localProps} ref={ref} hidden={api.view !== viewProps.view}>
        {view}
      </ark.div>
    </DatePickerViewProvider>
  )
})

DatePickerView.displayName = 'DatePickerView'
